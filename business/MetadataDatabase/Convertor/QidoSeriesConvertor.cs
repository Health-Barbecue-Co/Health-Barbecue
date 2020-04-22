using MetadataDatabase.Controllers;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
using System.Collections.Generic;
using System.Linq;

namespace MetadataDatabase.Convertor
{
    public static class QidoSeriesConvertor
    {
        public static SeriesDto ToDto(this QidoSeries series)
        {
            return new SeriesDto
            {
                Id = null,
                SeriesInstanceUID = series.GetValueOfDicomTag(QidoSeries.DicomTag.SeriesInstanceUID),
                SpecificCharacterSet = series.GetValueOfDicomTag(QidoSeries.DicomTag.SpecificCharacterSet),
                StudyDate = series.GetValueOfDicomTag(QidoSeries.DicomTag.StudyDate),
                StudyTime = series.GetValueOfDicomTag(QidoSeries.DicomTag.StudyTime),
                AccessionNumber = series.GetValueOfDicomTag(QidoSeries.DicomTag.AccessionNumber),
                Modality = series.GetValueOfDicomTag(QidoSeries.DicomTag.Modality),
                ReferringPhysiciansName = series.GetValueOfDicomTag(QidoSeries.DicomTag.ReferringPhysiciansName),
                SeriesDescription = series.GetValueOfDicomTag(QidoSeries.DicomTag.SeriesDescription),
                RetrieveURLAttribute = series.GetValueOfDicomTag(QidoSeries.DicomTag.RetrieveURLAttribute),
                PatientsName = series.GetValueOfDicomTag(QidoSeries.DicomTag.PatientsName),
                PatientID = series.GetValueOfDicomTag(QidoSeries.DicomTag.PatientID),
                PatientsBirthDate = series.GetValueOfDicomTag(QidoSeries.DicomTag.PatientsBirthDate),
                PatientsSex = series.GetValueOfDicomTag(QidoSeries.DicomTag.PatientsSex),
                StudyInstanceUID = series.GetValueOfDicomTag(QidoSeries.DicomTag.StudyInstanceUID),
                StudyID = series.GetValueOfDicomTag(QidoSeries.DicomTag.StudyID),
                SeriesNumber = series.GetValueOfDicomTag(QidoSeries.DicomTag.SeriesNumber),
                NumberOfSeriesRelatedInstances = series.GetValueOfDicomTag(QidoSeries.DicomTag.NumberOfSeriesRelatedInstances)
            };
        }

        public static IEnumerable<SeriesDto> ToDto(this IEnumerable<QidoSeries> series)
        {
            return series.Select(ToDto).ToList();
        }
    }
}