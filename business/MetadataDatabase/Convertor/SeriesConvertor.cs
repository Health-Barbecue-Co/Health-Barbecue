using MetadataDatabase.Data;
using MetadataDatabase.Models;
using System.Collections.Generic;
using System.Linq;

namespace MetadataDatabase.Convertor
{
    public static class SeriesConvertor
    {
        public static Series ToModel(this SeriesDto seriesDto)
        {
            return new Series
            {
                Id = seriesDto.Id,
                SeriesInstanceUID = seriesDto.SeriesInstanceUID,
                StudyDate = seriesDto.StudyDate,
                StudyTime = seriesDto.StudyTime,
                AccessionNumber = seriesDto.AccessionNumber,
                Modality = seriesDto.Modality,
                ReferringPhysiciansName = seriesDto.ReferringPhysiciansName,
                SeriesDescription = seriesDto.SeriesDescription,
                RetrieveURLAttribute = seriesDto.RetrieveURLAttribute,
                PatientsName = seriesDto.PatientsName,
                PatientID = seriesDto.PatientID,
                PatientsBirthDate = seriesDto.PatientsBirthDate,
                PatientsSex = seriesDto.PatientsSex,
                StudyInstanceUID = seriesDto.StudyInstanceUID,
                StudyID = seriesDto.StudyID,
                SeriesNumber = seriesDto.SeriesNumber,
                NumberOfSeriesRelatedInstances = seriesDto.NumberOfSeriesRelatedInstances,
            };
        }
        public static SeriesDto ToDto(this Series series)
        {
            return new SeriesDto
            {
                Id = series.Id,
                SeriesInstanceUID = series.SeriesInstanceUID,
                SpecificCharacterSet = series.SpecificCharacterSet,
                StudyDate = series.StudyDate,
                StudyTime = series.StudyTime,
                AccessionNumber = series.AccessionNumber,
                Modality = series.Modality,
                ReferringPhysiciansName = series.ReferringPhysiciansName,
                SeriesDescription = series.SeriesDescription,
                RetrieveURLAttribute = series.RetrieveURLAttribute,
                PatientsName = series.PatientsName,
                PatientID = series.PatientID,
                PatientsBirthDate = series.PatientsBirthDate,
                PatientsSex = series.PatientsSex,
                StudyInstanceUID = series.StudyInstanceUID,
                StudyID = series.StudyID,
                SeriesNumber = series.SeriesNumber,
                NumberOfSeriesRelatedInstances = series.NumberOfSeriesRelatedInstances,
            };
        }

        public static IEnumerable<SeriesDto> ToDto(this IEnumerable<Series> series)
        {
            return series.Select(ToDto).ToList();
        }
    }
}