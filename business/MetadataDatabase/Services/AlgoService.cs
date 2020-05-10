using MetadataDatabase.Convertor;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MetadataDatabase.Repository;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
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
        ILogger<AlgoService> logger;
        readonly IAlgosRepository algoRepository;
        IPacsService pacsService;
        string workspaceDataName = "workspace/data/";
        string workspaceAlgosName = "workspace/algos/";
        private readonly HttpClient client;

        public AlgoService(IOptions<AlgoConfiguration> settings, 
            ILogger<AlgoService> logger, 
            IAlgosRepository algoRepository, 
            IPacsService pacsService)
        {
            this.settings = settings.Value;
            this.logger = logger;
            this.algoRepository = algoRepository;
            this.pacsService = pacsService;
            this.client = new HttpClient();
        }

        public string Execute(AlgoExeInfoDto algoExeInfo)
        {
            this.logger.LogInformation($"Execute algo {algoExeInfo.AlgoId} on series {algoExeInfo.SeriesInstanceUID}");
            // Create directories if needed
            Directory.CreateDirectory(workspaceAlgosName);
            Directory.CreateDirectory(workspaceDataName);
            // Clean workspace data
            DirectoryInfo di = new DirectoryInfo(workspaceDataName);
            foreach (FileInfo file in di.GetFiles())
            {
                file.Delete();
            }
            foreach (DirectoryInfo dir in di.GetDirectories())
            {
                dir.Delete(true);
            }
            // Clean workspace algos
            di = new DirectoryInfo(workspaceAlgosName);
            foreach (FileInfo file in di.GetFiles())
            {
                file.Delete();
            }
            foreach (DirectoryInfo dir in di.GetDirectories())
            {
                dir.Delete(true);
            }
            // Get the specified algo to execute
            var algoToExecute = this.Get(algoExeInfo.AlgoId);
            // Create the python algo file to execute
            File.WriteAllText($"{workspaceAlgosName}{algoToExecute.MainFile}", algoToExecute.ContentFile);
            this.logger.LogInformation($"Main file {algoToExecute.MainFile}");
            // Download the series zip file on which the algo will be executed
            var zipFileName = this.pacsService.DownloadSeries(algoExeInfo.SeriesInstanceUID);
            // Extract zip file in workspace
            ZipFile.ExtractToDirectory(zipFileName, workspaceDataName);
            // Get path to dicom files
            ZipArchive archive = ZipFile.OpenRead(zipFileName);
            var fullworkspacePath = Path.GetFullPath(workspaceDataName);
            this.logger.LogDebug(fullworkspacePath);
            var relativeFilePath = Path.Join(workspaceDataName + archive.Entries[0].FullName);
            this.logger.LogDebug(relativeFilePath);
            var fullFilePath = Path.GetFullPath(relativeFilePath);
            this.logger.LogDebug(fullFilePath);
            var fullFilesDirectoryPath = Path.GetDirectoryName(fullFilePath);
            this.logger.LogDebug(fullFilesDirectoryPath);
            var directoryOfSeries = Path.GetDirectoryName(fullFilesDirectoryPath);
            this.logger.LogDebug(directoryOfSeries);
            var relatifPathOfSeriesDirectory = Path.GetRelativePath(fullworkspacePath, directoryOfSeries);
            this.logger.LogDebug(relatifPathOfSeriesDirectory);
            archive.Dispose();
            File.Delete(zipFileName);

            // Execute algo
            algoExeInfo.Folder = relatifPathOfSeriesDirectory;
            this.logger.LogInformation($"Execute algo on folder {algoExeInfo.Folder}");
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
