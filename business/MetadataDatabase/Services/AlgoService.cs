using MetadataDatabase.Controllers;
using MetadataDatabase.Convertor;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MetadataDatabase.Services
{
    public class AlgoService: IAlgoService
    {
        IPacsService pacsService;
        string workspaceName = "workspace";

        public AlgoService(IPacsService pacsService)
        {
            this.pacsService = pacsService;
        }

        public string Execute(AlgoExeInfoDto algoExeInfo)
        {
            var zipFilzName = this.pacsService.DownloadSeries(algoExeInfo.SeriesUid);
            // Clean workspace
            if (Directory.Exists(workspaceName)) Directory.Delete(workspaceName, true);
            // Extract zip file in workspace
            ZipFile.ExtractToDirectory(zipFilzName, workspaceName);
            // Get path to dicom files
            ZipArchive archive = ZipFile.OpenRead(zipFilzName);
            var relativeFilePath = Path.Join(@"workspace\" + archive.Entries[0].FullName.Replace('/', '\\'));
            Debug.WriteLine(relativeFilePath);
            var fullFilePath = Path.GetFullPath(relativeFilePath);
            Debug.WriteLine(fullFilePath);
            var fullFilesDirectoryPath = Path.GetDirectoryName(fullFilePath);
            Debug.WriteLine(fullFilesDirectoryPath);
            var directoryOfSeries = Path.GetDirectoryName(fullFilesDirectoryPath);
            Debug.WriteLine(directoryOfSeries);
            var mainFilePath = Path.GetFullPath("basic_python.py");
            Debug.WriteLine(mainFilePath);
            archive.Dispose();
            File.Delete(zipFilzName);

            // Execute algo
            Process process = new Process();
            process.StartInfo.FileName = "python";
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
    }
}
