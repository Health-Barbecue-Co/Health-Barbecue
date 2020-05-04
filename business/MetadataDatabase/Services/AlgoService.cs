using MetadataDatabase.Data;
using MetadataDatabase.Models;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.IO.Compression;
using System.Net.Http;
using System.Text;
using System.Text.Json;


namespace MetadataDatabase.Services
{
    public class AlgoService: IAlgoService
    {
        IaConfiguration settings;
        IPacsService pacsService;
        string workspaceName = "workspace";
        private readonly HttpClient client;

        public AlgoService(IOptions<IaConfiguration> settings, IPacsService pacsService)
        {
            this.settings = settings.Value;
            this.pacsService = pacsService;
            this.client = new HttpClient();
        }

        public string Execute(AlgoExeInfoDto algoExeInfo)
        {
            var zipFilzName = this.pacsService.DownloadSeries(algoExeInfo.SeriesUid);
            // Clean workspace
            DirectoryInfo di = new DirectoryInfo(workspaceName);
            foreach (FileInfo file in di.GetFiles())
            {
                file.Delete();
            }
            foreach (DirectoryInfo dir in di.GetDirectories())
            {
                dir.Delete(true);
            }

            // Extract zip file in workspace
            ZipFile.ExtractToDirectory(zipFilzName, workspaceName);
            // Get path to dicom files
            ZipArchive archive = ZipFile.OpenRead(zipFilzName);
            var fullworkspacePath = Path.GetFullPath(workspaceName);
            Console.WriteLine(fullworkspacePath);
            var relativeFilePath = Path.Join(@"workspace/" + archive.Entries[0].FullName);
            Console.WriteLine(relativeFilePath);
            var fullFilePath = Path.GetFullPath(relativeFilePath);
            Console.WriteLine(fullFilePath);
            var fullFilesDirectoryPath = Path.GetDirectoryName(fullFilePath);
            Console.WriteLine(fullFilesDirectoryPath);
            var directoryOfSeries = Path.GetDirectoryName(fullFilesDirectoryPath);
            Console.WriteLine(directoryOfSeries);
            var relatifPathOfSeriesDirectory = Path.GetRelativePath(fullworkspacePath, directoryOfSeries);
            Console.WriteLine(relatifPathOfSeriesDirectory);
            archive.Dispose();
            File.Delete(zipFilzName);

            // Execute algo
            algoExeInfo.Folder = relatifPathOfSeriesDirectory;
            Console.WriteLine(algoExeInfo.Folder);
            var jsonString = JsonSerializer.Serialize(algoExeInfo);
            var content = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var task = this.client.PostAsync($"{this.settings.Protocol}://{this.settings.Host}:{this.settings.Port}/executeAlgo", content);
            var res = task.Result.Content.ReadAsStringAsync();
            return res.Result;
        }
    }
}
