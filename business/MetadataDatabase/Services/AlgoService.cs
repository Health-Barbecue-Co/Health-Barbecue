using MetadataDatabase.Convertor;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MetadataDatabase.Repository;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Net.Http;
using System.Text;
using System.Text.Json;


namespace MetadataDatabase.Services
{
    public class AlgoService: IAlgoService
    {
        AlgoConfiguration settings;
        readonly IAlgosRepository algoRepository;
        IPacsService pacsService;
        string workspaceName = "workspace/data/";
        private readonly HttpClient client;

        public AlgoService(IOptions<AlgoConfiguration> settings, IAlgosRepository algoRepository, IPacsService pacsService)
        {
            this.settings = settings.Value;
            this.algoRepository = algoRepository;
            this.pacsService = pacsService;
            this.client = new HttpClient();
        }

        public string Execute(AlgoExeInfoDto algoExeInfo)
        {
            Directory.CreateDirectory("workspace/data/");
            var zipFileName = this.pacsService.DownloadSeries(algoExeInfo.SeriesInstanceUID);

            // Clean workspace data
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
            ZipFile.ExtractToDirectory(zipFileName, workspaceName);
            // Get path to dicom files
            ZipArchive archive = ZipFile.OpenRead(zipFileName);
            var fullworkspacePath = Path.GetFullPath(workspaceName);
            Console.WriteLine(fullworkspacePath);
            var relativeFilePath = Path.Join(workspaceName + archive.Entries[0].FullName);
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
            File.Delete(zipFileName);

            // Execute algo
            algoExeInfo.Folder = relatifPathOfSeriesDirectory;
            Console.WriteLine(algoExeInfo.Folder);
            var jsonString = JsonSerializer.Serialize(algoExeInfo);
            var content = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var task = this.client.PostAsync($"{this.settings.Protocol}://{this.settings.Host}:{this.settings.Port}/executeAlgo", content);
            var res = task.Result.Content.ReadAsStringAsync();
            return res.Result;
        }

        public IEnumerable<AlgoDto> GetAll()
        {
            return this.algoRepository.GetAll()?.ToDto();
        }

        public AlgoDto Get(string id)
        {
            return this.algoRepository.Get(id.ToObjectId()).ToDto();
        }

        public AlgoDto Create(AlgoDto objectToCreate)
        {
            return this.algoRepository.Create(objectToCreate.ToModel()).ToDto();
        }

        public void Update(string id, AlgoDto objectToUpdate)
        {
            this.algoRepository.Update(objectToUpdate.ToModel());
        }

        public void Delete(string id)
        {
            this.algoRepository.Delete(id.ToObjectId());
        }
    }
}
