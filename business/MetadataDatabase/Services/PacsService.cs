using MetadataDatabase.Controllers;
using MetadataDatabase.Convertor;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.IO.Compression;
using System.Diagnostics;

namespace MetadataDatabase.Services
{
    public class PacsService: IPacsService
    {
        private readonly HttpClient client;
        private readonly PacsConfiguration settings;

        public PacsService(IOptions<PacsConfiguration> settings)
        {
            this.settings = settings.Value;
            this.client = new HttpClient();
        }

        public IEnumerable<SeriesDto> GetSeriesList()
        {
            Task<IEnumerable<QidoSeries>> task = this.GetSeriesListAsync();
            return task.Result?.ToDto();
        }

        public SeriesDto GetMetadataSeries(SeriesDto series)
        {
            Task<QidoSeries> fetchSeriesMetadataTask = this.GetSeriesMetadataAsync(
                series.StudyInstanceUID,
                series.SeriesInstanceUID);
            fetchSeriesMetadataTask.Wait();
            return fetchSeriesMetadataTask.Result?.ToDto();
        }

        public string DownloadSeries(string seriesUID)
        {
            string zipFilzName = $"{seriesUID}.zip";
            string workspaceName = "workspace";
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, $"{this.settings.Protocol}://{this.settings.Host}:{this.settings.Port}/tools/find");
            OrthancFindRequest orthancFindRequest = new OrthancFindRequest() {
                Level = "series",
                Limit = 2,
                Query = new Dictionary<string, string>()
            };
            orthancFindRequest.Query.Add("SeriesInstanceUID", $"{seriesUID}");
            var jsonString = JsonSerializer.Serialize(orthancFindRequest);
            //var data = "{ \"Level\": \"Series\", \"Limit\": 2, \"Query\": { \"SeriesInstanceUID\": \"1.3.12.2.1107.5.2.30.26626.30000011032311153339000012977\"} }";
            httpRequestMessage.Content = new StringContent(jsonString);
            var task = this.client.SendAsync(httpRequestMessage);
            var res = task.Result.Content.ReadAsStringAsync().Result;
            var listOfSeries = JsonSerializer.Deserialize<List<string>>(res);
            if(listOfSeries.Count == 0) { throw new Exception($"No SeriesInstanceUID {seriesUID} matching in Orthanc database."); }
            var orthancSeriesId = listOfSeries[0];
            var task2 = this.client.GetByteArrayAsync($"{this.settings.Protocol}://{this.settings.Host}:{this.settings.Port}/series/{orthancSeriesId}/archive");
            File.WriteAllBytes(zipFilzName, task2.Result);
            if(Directory.Exists(workspaceName)) Directory.Delete(workspaceName, true);
            ZipFile.ExtractToDirectory(zipFilzName, workspaceName);

            File.Delete(zipFilzName);
            // Get path to dicom files
            ZipArchive archive = ZipFile.OpenRead("zob.zip");
            var relativeFilePath = Path.Join(@"workspace\" + archive.Entries[0].FullName.Replace('/','\\'));
            Debug.WriteLine(relativeFilePath);
            var fullFilePath = Path.GetFullPath(relativeFilePath);
            Debug.WriteLine(fullFilePath);
            var fullFilesDirectoryPath = Path.GetDirectoryName(fullFilePath);
            Debug.WriteLine(fullFilesDirectoryPath);
            var directoryOfSeries = Path.GetDirectoryName(fullFilesDirectoryPath);
            Debug.WriteLine(directoryOfSeries);

            var mainFilePath = Path.GetFullPath("basic_python.py");
            Debug.WriteLine(mainFilePath);

            // Execute algo
            Process process = new Process();
            process.StartInfo.FileName= "python";
            //process.StartInfo.Arguments = $"{mainFilePath} {directoryOfSeries}", "";
            process.StartInfo.ArgumentList.Add($"{mainFilePath}");
            process.StartInfo.ArgumentList.Add($"{directoryOfSeries}");
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardOutput = true;
            process.Start();

            // Synchronously read the standard output of the spawned process. 
            StreamReader reader = process.StandardOutput;
            string output = reader.ReadToEnd();

            // Write the redirected output to this application's window.
            Debug.WriteLine(output);

            process.WaitForExit();
            return output;
        }

        private async Task<IEnumerable<QidoSeries>> GetSeriesListAsync()
        {
            var streamtask = client.GetStreamAsync($"{this.settings.Protocol}://{this.settings.Host}:{this.settings.Port}/{this.settings.Path}/series");
            var pacsSeriesList = await JsonSerializer.DeserializeAsync<IEnumerable<QidoSeries>>(await streamtask);
            return pacsSeriesList;
        }

        private async Task<QidoSeries> GetSeriesMetadataAsync(string studiesUid, string seriesUid)
        {
            var streamtask = client.GetStreamAsync(
                $"{this.settings.Protocol}://{this.settings.Host}:{this.settings.Port}/{this.settings.Path}/studies/{studiesUid}/series/{seriesUid}/metadata");
            var seriesMetadata = await JsonSerializer.DeserializeAsync<IEnumerable<QidoSeries>>(await streamtask);
            return seriesMetadata.FirstOrDefault();
        }
    }

    public class OrthancFindRequest
    {
        public string Level { get; set; }
        public int Limit { get; set; }
        public Dictionary<string, string> Query { get; set; }
    }
}
