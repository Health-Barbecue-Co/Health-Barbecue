using MetadataDatabase.Controllers;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
using System.Collections.Generic;
using System.Linq;

namespace MetadataDatabase.Convertor
{
    public static class QidoDicomSeriesConvertor
    {
        public static SeriesDto ToDto(this QidoDicomSeries series)
        {
            return new SeriesDto
            {
                Id = null,
                SeriesInstanceUID = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.SeriesInstanceUID),
                StudyDate = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.StudyDate),
                StudyTime = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.StudyTime),
                AccessionNumber = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.AccessionNumber),
                Modality = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.Modality),
                ReferringPhysiciansName = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.ReferringPhysiciansName),
                SeriesDescription = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.SeriesDescription),
                RetrieveURLAttribute = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.RetrieveURLAttribute),
                PatientsName = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.PatientsName),
                PatientID = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.PatientID),
                PatientsBirthDate = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.PatientsBirthDate),
                PatientsSex = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.PatientsSex),
                StudyInstanceUID = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.StudyInstanceUID),
                StudyID = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.StudyID),
                SeriesNumber = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.SeriesNumber),
                NumberOfSeriesRelatedInstances = series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.NumberOfSeriesRelatedInstances)
            };
        }

        public static IEnumerable<SeriesDto> ToDto(this IEnumerable<QidoDicomSeries> series)
        {
            return series.Select(ToDto).ToList();
        }
    }
}