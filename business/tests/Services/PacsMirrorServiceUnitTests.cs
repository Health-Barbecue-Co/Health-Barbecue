using NUnit.Framework;
using MetadataDatabase.Controllers;
using Moq;
using MetadataDatabase.Services;
using System.Collections.Generic;
using MetadataDatabase.Data;

namespace MetadataDatabase
{
    [TestFixture]
    public class PacsMirrorServiceUnitTests
    {
        [Test]
        public void TestMirrorPacsMethodWithNoChanges()
        {
            // Arrange
            var mockSeriesServices = new Mock<ISeriesServices>();
            mockSeriesServices.Setup(mock => mock.GetAll())
                .Returns(GetTestDatabaseSeries(4));

            var mockPacsService = new Mock<IPacsService>();
            mockPacsService.Setup(repo => repo.GetSeriesAsync())
                .ReturnsAsync(GetTestPacsSeries(4));

            IPacsMirrorService pacsMirrorService = new PacsMirrorService(
                mockSeriesServices.Object, 
                mockPacsService.Object);
            // Act
            pacsMirrorService.MirrorPacs();
            // Assert
            Assert.AreEqual(true, true);
            mockSeriesServices.Verify(mock => mock.Delete(It.IsAny<string>()), Times.Never());
            mockSeriesServices.Verify(mock => mock.Create(It.IsAny<SeriesDto>()), Times.Never());
        }

        [Test]
        public void TestMirrorPacsMethodWith2SeriesToDelete()
        {
            // Arrange
            var mockSeriesServices = new Mock<ISeriesServices>();
            mockSeriesServices.Setup(mock => mock.GetAll())
                .Returns(GetTestDatabaseSeries(6));

            var mockPacsService = new Mock<IPacsService>();
            mockPacsService.Setup(repo => repo.GetSeriesAsync())
                .ReturnsAsync(GetTestPacsSeries(4));

            IPacsMirrorService pacsMirrorService = new PacsMirrorService(
                mockSeriesServices.Object,
                mockPacsService.Object);
            // Act
            pacsMirrorService.MirrorPacs();
            // Assert
            Assert.AreEqual(true, true);
            mockSeriesServices.Verify(mock => mock.Delete("id4"), Times.Once());
            mockSeriesServices.Verify(mock => mock.Delete("id5"), Times.Once());
            mockSeriesServices.Verify(mock => mock.Create(It.IsAny<SeriesDto>()), Times.Never());
        }

        [Test]
        public void TestMirrorPacsMethodWith3SeriesToCreate()
        {
            // Arrange
            var mockSeriesServices = new Mock<ISeriesServices>();
            mockSeriesServices.Setup(mock => mock.GetAll())
                .Returns(GetTestDatabaseSeries(3));

            var mockPacsService = new Mock<IPacsService>();
            mockPacsService.Setup(repo => repo.GetSeriesAsync())
                .ReturnsAsync(GetTestPacsSeries(6));

            IPacsMirrorService pacsMirrorService = new PacsMirrorService(
                mockSeriesServices.Object,
                mockPacsService.Object);
            // Act
            pacsMirrorService.MirrorPacs();
            // Assert
            Assert.AreEqual(true, true);
            mockSeriesServices.Verify(mock => mock.Delete(It.IsAny<string>()), Times.Never());
            mockSeriesServices.Verify(mock => mock.Create(It.IsAny<SeriesDto>()), Times.Exactly(3));
        }

        [Test]
        public void TestMirrorPacsMethodWithCreateAndDelete()
        {
            // Arrange
            var mockSeriesServices = new Mock<ISeriesServices>();
            List<SeriesDto> testDatabaseSeries = (List<SeriesDto>)GetTestDatabaseSeries(3);
            testDatabaseSeries.Add(new SeriesDto()
            {
                Id = $"id99",
                SeriesInstanceUID = $"uid99",
            });
            mockSeriesServices.Setup(mock => mock.GetAll())
                .Returns(testDatabaseSeries);

            var mockPacsService = new Mock<IPacsService>();
            mockPacsService.Setup(repo => repo.GetSeriesAsync())
                .ReturnsAsync(GetTestPacsSeries(4));

            IPacsMirrorService pacsMirrorService = new PacsMirrorService(
                mockSeriesServices.Object,
                mockPacsService.Object);
            // Act
            pacsMirrorService.MirrorPacs();
            // Assert
            Assert.AreEqual(true, true);
            mockSeriesServices.Verify(mock => mock.Delete("id99"), Times.Once());
            mockSeriesServices.Verify(mock => mock.Create(It.IsAny<SeriesDto>()), Times.Once());
        }

        private IEnumerable<QidoSeries> GetTestPacsSeries(int numberOfSeries)
        {
            var QidoSeriesList = new List<QidoSeries>();
            for (int i = 0; i < numberOfSeries; i++)
            {
                QidoSeriesList.Add(new QidoSeries()
                {
                    SpecificCharacterSet = new DicomStringObject(),
                    StudyDate = new DicomStringObject(),
                    StudyTime = new DicomStringObject(),
                    AccessionNumber = new DicomStringObject(),
                    Modality = new DicomStringObject(),
                    ReferringPhysiciansName = new DicomStringObject(),
                    SeriesDescription = new DicomStringObject(),
                    RetrieveURLAttribute = new DicomStringObject(),
                    PatientsName = new DicomNameObject(),
                    PatientID = new DicomStringObject(),
                    PatientsBirthDate = new DicomStringObject(),
                    PatientsSex = new DicomStringObject(),
                    StudyInstanceUID = new DicomStringObject(),
                    SeriesInstanceUID = new DicomStringObject()
                    {
                        Value = new string[] { $"uid{i}" },
                        vr = ""
                    },
                    StudyID = new DicomStringObject(),
                    SeriesNumber = new DicomIntObject(),
                    NumberOfSeriesRelatedInstances = new DicomIntObject()
                });
            }
            return QidoSeriesList;
        }

        private IEnumerable<SeriesDto> GetTestDatabaseSeries(int numberOfSeries)
        {
            var DatabaseSeriesList = new List<SeriesDto>();
            for (int i = 0; i < numberOfSeries; i++)
            {
                DatabaseSeriesList.Add(new SeriesDto()
                {
                    Id = $"id{i}",
                    SeriesInstanceUID = $"uid{i}",
                });
            }
            return DatabaseSeriesList;
        }
    }
}