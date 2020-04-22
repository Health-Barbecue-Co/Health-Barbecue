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
                .Returns(GetTestSeries(4));

            var mockPacsService = new Mock<IPacsService>();
            mockPacsService.Setup(repo => repo.GetSeriesList())
                .Returns(GetTestSeries(4));

            IPacsMirrorService pacsMirrorService = new PacsMirrorService(
                mockSeriesServices.Object, 
                mockPacsService.Object);
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
            var mockSeriesServices = new Mock<ISeriesServices>();
            mockSeriesServices.Setup(mock => mock.GetAll())
                .Returns(GetTestSeries(6));

            var mockPacsService = new Mock<IPacsService>();
            mockPacsService.Setup(repo => repo.GetSeriesList())
                .Returns(GetTestSeries(4));

            IPacsMirrorService pacsMirrorService = new PacsMirrorService(
                mockSeriesServices.Object,
                mockPacsService.Object);
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
            var mockSeriesServices = new Mock<ISeriesServices>();
            mockSeriesServices.Setup(mock => mock.GetAll())
                .Returns(GetTestSeries(3));

            var mockPacsService = new Mock<IPacsService>();
            mockPacsService.Setup(repo => repo.GetSeriesList())
                .Returns(GetTestSeries(6));

            mockPacsService.Setup(repo => repo.GetMetadataSeries(It.IsAny<SeriesDto>()))
                .Returns(new SeriesDto());

            IPacsMirrorService pacsMirrorService = new PacsMirrorService(
                mockSeriesServices.Object,
                mockPacsService.Object);
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
            var mockSeriesServices = new Mock<ISeriesServices>();
            List<SeriesDto> testDatabaseSeries = (List<SeriesDto>)GetTestSeries(3);
            testDatabaseSeries.Add(new SeriesDto()
            {
                Id = $"id99",
                SeriesInstanceUID = $"uid99",
            });
            mockSeriesServices.Setup(mock => mock.GetAll())
                .Returns(testDatabaseSeries);

            var mockPacsService = new Mock<IPacsService>();
            mockPacsService.Setup(repo => repo.GetSeriesList())
                .Returns(GetTestSeries(4));
            mockPacsService.Setup(repo => repo.GetMetadataSeries(It.IsAny<SeriesDto>()))
                .Returns(new SeriesDto());

            IPacsMirrorService pacsMirrorService = new PacsMirrorService(
                mockSeriesServices.Object,
                mockPacsService.Object);
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