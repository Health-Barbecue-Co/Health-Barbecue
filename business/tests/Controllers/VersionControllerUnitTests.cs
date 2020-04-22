using NUnit.Framework;
using System;
using MetadataDatabase.Controllers;
using Microsoft.AspNetCore.Mvc;
using MetadataDatabase.Repository;
using Moq;
using System.Text.RegularExpressions;

namespace MetadataDatabase
{
    [TestFixture]
    public class VersionControllerUnitTests
    {
        [Test]
        public void TestGetMethod()
        {
            // Arrange
            string versionPattern = @"[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+";
            VersionController versionController = new VersionController();
            // Act
            var result = versionController.Get();
            // Assert
            Assert.AreEqual(typeof(ActionResult<Version>), result.GetType());
            var okObjectResult = (OkObjectResult)result.Result;
            System.Text.RegularExpressions.Match m = Regex.Match(okObjectResult.Value.ToString(), versionPattern);
            Assert.IsTrue(m.Success);
        }

        [Test]
        public void TestGetApiVersionMethod()
        {
            // Arrange
            string versionPattern = @"[0-9]+\.[0-9]+";
            VersionController versionController = new VersionController();
            // Act
            var result = versionController.GetApiVersion();
            // Assert
            Assert.AreEqual(typeof(ActionResult<String>), result.GetType());
            var okObjectResult = (OkObjectResult)result.Result;
            System.Text.RegularExpressions.Match m = Regex.Match(okObjectResult.Value.ToString(), versionPattern);
            Assert.IsTrue(m.Success);
        }
    }
}