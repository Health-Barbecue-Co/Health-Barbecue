using NUnit.Framework;
using MetadataDatabase.Controllers;
using Moq;
using MetadataDatabase.Services;
using System.Collections.Generic;
using MetadataDatabase.Data;
using Microsoft.Extensions.Logging;
using System.ComponentModel;

namespace MetadataDatabase
{
    [TestFixture]
    public class PacsMirrorServiceUnitTests
    {
        private Mock<ILogger<PacsMirrorService>> mockLogger;
        private Mock<ISeriesServices> mockSeriesServices;
        private Mock<IPacsService> mockPacsService;
        private PacsMirrorService pacsMirrorService;

        [SetUp]
        public void Init()
        {
            this.mockLogger = new Mock<ILogger<PacsMirrorService>>();
            this.mockSeriesServices = new Mock<ISeriesServices>();
            this.mockPacsService = new Mock<IPacsService>();

            this.pacsMirrorService = new PacsMirrorService(
                mockLogger.Object,
                mockSeriesServices.Object,
                mockPacsService.Object);
        }

        [Test]
        public void TestMirrorPacsMethodWithNoChanges()
        {
            // Arrange
            mockSeriesServices.Setup(mock => mock.GetAll())
                .Returns(GetTestSeries(4));

            mockPacsService.Setup(repo => repo.GetSeriesList())
                .Returns(GetTestSeries(4));

            // Act
            pacsMirrorService.MirrorPacs();
            // Assert
            mockSeriesServices.Verify(mock => mock.Delete(It.IsAny<string>()), Times.Never());
            mockSeriesServices.Verify(mock => mock.Create(It.IsAny<SeriesDto>()), Times.Never());
        }

        [Test]
        public void TestMirrorPacsMethodWith2SeriesToDelete()
        {
            // Arrange
            mockSeriesServices.Setup(mock => mock.GetAll())
                .Returns(GetTestSeries(6));

            mockPacsService.Setup(repo => repo.GetSeriesList())
                .Returns(GetTestSeries(4));

            // Act
            pacsMirrorService.MirrorPacs();
            // Assert
            mockSeriesServices.Verify(mock => mock.Delete("id4"), Times.Once());
            mockSeriesServices.Verify(mock => mock.Delete("id5"), Times.Once());
            mockSeriesServices.Verify(mock => mock.Create(It.IsAny<SeriesDto>()), Times.Never());
        }

        [Test]
        public void TestMirrorPacsMethodWith3SeriesToCreate()
        {
            // Arrange
            mockSeriesServices.Setup(mock => mock.GetAll())
                .Returns(GetTestSeries(3));

            mockPacsService.Setup(repo => repo.GetSeriesList())
                .Returns(GetTestSeries(6));

            mockPacsService.Setup(repo => repo.GetMetadataSeries(It.IsAny<SeriesDto>()))
               .Returns(new SeriesDto());
            // Act
            pacsMirrorService.MirrorPacs();
            // Assert
            mockSeriesServices.Verify(mock => mock.Delete(It.IsAny<string>()), Times.Never());
            mockSeriesServices.Verify(mock => mock.Create(It.IsAny<SeriesDto>()), Times.Exactly(3));
        }

        [Test]
        public void TestMirrorPacsMethodWithCreateAndDelete()
        {
            // Arrange
            List<SeriesDto> testDatabaseSeries = (List<SeriesDto>)GetTestSeries(3);
            testDatabaseSeries.Add(new SeriesDto()
            {
                Id = $"id99",
                SeriesInstanceUID = $"uid99",
            });
            mockSeriesServices.Setup(mock => mock.GetAll())
                .Returns(testDatabaseSeries);

            mockPacsService.Setup(repo => repo.GetSeriesList())
                .Returns(GetTestSeries(4));

            mockPacsService.Setup(repo => repo.GetMetadataSeries(It.IsAny<SeriesDto>()))
               .Returns(new SeriesDto());

            // Act
            pacsMirrorService.MirrorPacs();
            // Assert
            mockSeriesServices.Verify(mock => mock.Delete("id99"), Times.Once());
            mockSeriesServices.Verify(mock => mock.Create(It.IsAny<SeriesDto>()), Times.Once());
        }

        private IEnumerable<SeriesDto> GetTestSeries(int numberOfSeries)
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