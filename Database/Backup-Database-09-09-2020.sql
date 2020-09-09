CREATE DATABASE  IF NOT EXISTS `quiz_management` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `quiz_management`;
-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: 14.186.50.153    Database: quiz_management
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Question` int(11) DEFAULT NULL,
  `Content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IsCorrect` tinyint(1) DEFAULT NULL,
  `CorrectAnswer` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `Question` (`Question`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`Question`) REFERENCES `question` (`ID`),
  CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  CONSTRAINT `answer_ibfk_3` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NumberQuestionLevel1` int(50) DEFAULT NULL,
  `NumberQuestionLevel2` int(50) DEFAULT NULL,
  `NumberQuestionLevel3` int(50) DEFAULT NULL,
  `NumberQuestionLevel4` int(50) DEFAULT NULL,
  `NumberQuestionLevel5` int(50) DEFAULT NULL,
  `NumberQuestionLevel6` int(50) DEFAULT NULL,
  `NumberQuestionLevel7` int(50) DEFAULT NULL,
  `NumberQuestionLevel8` int(50) DEFAULT NULL,
  `NumberQuestionLevel9` int(50) DEFAULT NULL,
  `NumberQuestionLevel10` int(50) DEFAULT NULL,
  `TotalQuestion` int(50) DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  CONSTRAINT `config_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  CONSTRAINT `config_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examination`
--

DROP TABLE IF EXISTS `examination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `examination` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Duration` int(11) DEFAULT NULL,
  `Semester` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Department` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Course` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CourseCode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Term` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Lecturer` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  CONSTRAINT `examination_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  CONSTRAINT `examination_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examination`
--

LOCK TABLES `examination` WRITE;
/*!40000 ALTER TABLE `examination` DISABLE KEYS */;
/*!40000 ALTER TABLE `examination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Level` int(11) DEFAULT NULL,
  `Type` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  CONSTRAINT `question_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questiontopic`
--

DROP TABLE IF EXISTS `questiontopic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questiontopic` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Question` int(11) DEFAULT NULL,
  `Topic` int(11) DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `Question` (`Question`),
  KEY `Topic` (`Topic`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  CONSTRAINT `questiontopic_ibfk_1` FOREIGN KEY (`Question`) REFERENCES `question` (`ID`),
  CONSTRAINT `questiontopic_ibfk_2` FOREIGN KEY (`Topic`) REFERENCES `topic` (`ID`),
  CONSTRAINT `questiontopic_ibfk_3` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  CONSTRAINT `questiontopic_ibfk_4` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questiontopic`
--

LOCK TABLES `questiontopic` WRITE;
/*!40000 ALTER TABLE `questiontopic` DISABLE KEYS */;
/*!40000 ALTER TABLE `questiontopic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Examination` int(11) DEFAULT NULL,
  `Config` int(11) DEFAULT NULL,
  `Template` int(11) DEFAULT NULL,
  `Code` int(11) DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `Examination` (`Examination`),
  KEY `Config` (`Config`),
  KEY `Template` (`Template`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`Examination`) REFERENCES `examination` (`ID`),
  CONSTRAINT `quiz_ibfk_2` FOREIGN KEY (`Config`) REFERENCES `config` (`ID`),
  CONSTRAINT `quiz_ibfk_3` FOREIGN KEY (`Template`) REFERENCES `template` (`ID`),
  CONSTRAINT `quiz_ibfk_4` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  CONSTRAINT `quiz_ibfk_5` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizcontent`
--

DROP TABLE IF EXISTS `quizcontent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quizcontent` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Quiz` int(11) DEFAULT NULL,
  `QuestionID` int(11) DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `Quiz` (`Quiz`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  CONSTRAINT `quizcontent_ibfk_1` FOREIGN KEY (`Quiz`) REFERENCES `quiz` (`ID`),
  CONSTRAINT `quizcontent_ibfk_2` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  CONSTRAINT `quizcontent_ibfk_3` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizcontent`
--

LOCK TABLES `quizcontent` WRITE;
/*!40000 ALTER TABLE `quizcontent` DISABLE KEYS */;
/*!40000 ALTER TABLE `quizcontent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template`
--

DROP TABLE IF EXISTS `template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TemplateName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HeaderContent` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `Quiz` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `QuestionContent` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `AnswerContent` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `FooterContent` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  CONSTRAINT `template_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  CONSTRAINT `template_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template`
--

LOCK TABLES `template` WRITE;
/*!40000 ALTER TABLE `template` DISABLE KEYS */;
/*!40000 ALTER TABLE `template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  CONSTRAINT `topic_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `Fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Role` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','123456','Dung','1',0,'2020-09-09 18:35:35',NULL,NULL),(2,'dung','123456','Dung','1',0,'2020-09-09 18:38:12',NULL,NULL),(3,'trung','123456','Trung','2',0,'2020-09-09 18:38:12',NULL,NULL),(4,'thay1','123456','Thay1','3',0,'2020-09-09 18:38:12',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'quiz_management'
--

--
-- Dumping routines for database 'quiz_management'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-09 18:39:58
