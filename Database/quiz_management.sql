-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: quizmanagement.ccd3ylv1pufy.ap-northeast-2.rds.amazonaws.com:3306
-- Generation Time: Nov 10, 2020 at 05:19 AM
-- Server version: 8.0.20
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz_management`
--
CREATE DATABASE IF NOT EXISTS `quiz_management` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `quiz_management`;

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
CREATE TABLE IF NOT EXISTS `answer` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Question` int NOT NULL,
  `Content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `IsCorrect` tinyint NOT NULL,
  `CorrectAnswer` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Using for fill type question',
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `Question` (`Question`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`ID`, `Question`, `Content`, `IsCorrect`, `CorrectAnswer`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(4, 12, 'Delhi', 0, '', 2, '2020-10-23 11:54:16', NULL, NULL, 0),
(5, 12, 'Bengaluru Capt', 0, '', 2, '2020-10-23 11:57:59', 2, '2020-10-30 07:47:52', 0),
(6, 12, 'Chennai', 0, '', 2, '2020-10-23 11:58:09', NULL, NULL, 0),
(7, 12, 'Mumbai', 1, '', 2, '2020-10-23 11:58:19', 2, '2020-10-23 12:24:04', 0),
(8, 12, 'aaaaa', 0, 'áđâsdá', 3, '2020-10-28 14:55:44', NULL, NULL, 0),
(9, 12, '11111 aa', 127, '11111', 3, '2020-10-28 14:56:02', 3, '2020-10-31 04:01:33', 1);

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
CREATE TABLE IF NOT EXISTS `config` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NumberQuestionLevel1` int DEFAULT NULL,
  `NumberQuestionLevel2` int DEFAULT NULL,
  `NumberQuestionLevel3` int DEFAULT NULL,
  `NumberQuestionLevel4` int DEFAULT NULL,
  `NumberQuestionLevel5` int DEFAULT NULL,
  `NumberQuestionLevel6` int DEFAULT NULL,
  `NumberQuestionLevel7` int DEFAULT NULL,
  `NumberQuestionLevel8` int DEFAULT NULL,
  `NumberQuestionLevel9` int DEFAULT NULL,
  `NumberQuestionLevel10` int DEFAULT NULL,
  `TotalQuestion` int DEFAULT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`ID`, `NumberQuestionLevel1`, `NumberQuestionLevel2`, `NumberQuestionLevel3`, `NumberQuestionLevel4`, `NumberQuestionLevel5`, `NumberQuestionLevel6`, `NumberQuestionLevel7`, `NumberQuestionLevel8`, `NumberQuestionLevel9`, `NumberQuestionLevel10`, `TotalQuestion`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(6, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 15, 2, '2020-10-30 03:42:48', 3, '2020-11-01 15:18:39', 1),
(7, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3, '2020-11-01 14:55:03', 3, '2020-11-02 07:43:59', 0),
(8, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 5, 3, '2020-11-01 15:02:10', 3, '2020-11-02 05:52:29', 0),
(9, 10, 15, 20, 0, 0, 0, 0, 0, 0, 0, 101520, 3, '2020-11-01 16:31:54', 3, '2020-11-02 06:05:47', 0),
(10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1111111111, 3, '2020-11-02 04:59:24', NULL, NULL, 0),
(11, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 3, '2020-11-02 05:01:10', 3, '2020-11-02 06:07:42', 0),
(12, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 20, 3, '2020-11-02 06:08:04', NULL, NULL, 0),
(13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, '2020-11-02 06:52:03', 3, '2020-11-02 07:43:42', 0),
(14, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, '2020-11-02 06:56:03', 3, '2020-11-02 07:43:24', 0),
(15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, '2020-11-02 07:40:43', 3, '2020-11-02 07:43:09', 0),
(16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, '2020-11-02 07:42:57', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `examination`
--

DROP TABLE IF EXISTS `examination`;
CREATE TABLE IF NOT EXISTS `examination` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Duration` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Semester` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Notes` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Department` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Course` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Coursecode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `AcademicYear` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Lecturer` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `examination`
--

INSERT INTO `examination` (`ID`, `Duration`, `Semester`, `Notes`, `Department`, `Course`, `Coursecode`, `AcademicYear`, `Lecturer`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(1, '120 mins', '1', 'Phone is not allowed', 'HTTT-CTTT', 'Computer Science', 'CS.1109', '2019', 'Le Van Toan', 1, '2020-09-22 13:03:33', 2, '2020-10-28 11:14:47', 0),
(4, '150 mins', '2', 'Phone nor laptop is not allowed', 'HTTT-CTTT', 'Computer Science 2', 'CS.2109', '2019', 'Do Tien', 2, '2020-10-28 11:15:48', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Level` int NOT NULL,
  `Type` enum('Single Choice','Multiple Choice','Fill the blank','Match') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  KEY `FK_Type` (`Type`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`ID`, `Content`, `Level`, `Type`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(12, 'Which among the following cities produces highest e-waste in India?', 2, 'Single Choice', 2, '2020-10-23 11:48:41', NULL, '2020-10-26 12:59:54', 0),
(13, 'A group of ………………... is commonly called as one byte.', 1, 'Single Choice', 2, '2020-10-30 03:26:28', NULL, NULL, 0),
(14, 'Which among the following projects is launched to provide e-governance facilities and information services to the rural community?', 3, 'Single Choice', 2, '2020-10-30 03:26:46', NULL, NULL, 0),
(15, 'Consider the following statements:\n\n1. Point to Point Protocol is a dial account, which puts personal computer directly on the internet.\n\n2. WWW is explained as Wide Area Hypermedia Information initiative that provides universal access.\n\nChoose the correc', 4, 'Single Choice', 2, '2020-10-30 03:27:07', NULL, NULL, 0),
(16, 'Consider the following statements:\n\n1. WAIS maintains separate index for the contents of some designated documents.\n\n2. By putting the name, WAIS entails a list of documents available in that index with similar keywords.\n\nChoose the correct answer from th', 5, 'Single Choice', 2, '2020-10-30 03:27:19', NULL, NULL, 0),
(17, 'Which among the following period is known as the era of second generation computer?', 1, 'Single Choice', 2, '2020-10-30 03:27:32', NULL, NULL, 0),
(18, 'A web address is usually known as …', 1, 'Single Choice', 2, '2020-10-30 03:27:42', NULL, NULL, 0),
(19, 'Which among the following is the shortcut key for Help in your computer system?\n\n', 1, 'Single Choice', 2, '2020-10-30 03:27:46', NULL, NULL, 0),
(20, 'Who among the following has invented worldwide web?', 1, 'Single Choice', 2, '2020-10-30 03:27:54', NULL, NULL, 0),
(21, 'Who among the following had invented the computer microprocessor?', 1, 'Single Choice', 2, '2020-10-30 03:28:01', NULL, NULL, 0),
(22, 'Which among the following correctly defines the working of a computer?', 1, 'Single Choice', 2, '2020-10-30 03:28:08', NULL, NULL, 0),
(23, 'Consider the following statements:\n\n1. PARAM was the first supercomputer of India.\n\n2. PARAM was developed by C-DAC in 1991.\n\nChoose the correct answer from the codes given below:', 1, 'Single Choice', 2, '2020-10-30 03:28:20', NULL, NULL, 0),
(24, 'USB is a ………………………… storage device', 1, 'Single Choice', 2, '2020-10-30 03:28:29', NULL, NULL, 0),
(25, 'Consider the following statements:\n\n1. Algorithm is a set of instructions and basic techniques used to solve a problem/query.\n\n2. An algorithm is a list of well-defined instructions for completing a defined task.\n\nChoose the correct answer from the codes ', 7, 'Single Choice', 2, '2020-10-30 03:28:39', NULL, NULL, 0),
(26, 'Which among the following correctly defines the term ‘backup?’', 2, 'Single Choice', 2, '2020-10-30 03:28:47', NULL, NULL, 0),
(27, 'What is the term used for copying computer program without taking permission of its writer?', 2, 'Single Choice', 2, '2020-10-30 03:37:04', NULL, NULL, 0),
(28, 'In a network system, which among the following is the most powerful computer?\n\n', 2, 'Single Choice', 2, '2020-10-30 03:37:11', NULL, NULL, 0),
(29, 'The first internet service was set up in India in …', 2, 'Single Choice', 2, '2020-10-30 03:37:18', NULL, NULL, 0),
(30, 'Which among the following describes that how a message should be transmitted and what action web servers and browsers should take in response to the command given by the users?', 3, 'Single Choice', 2, '2020-10-30 03:37:27', NULL, NULL, 0),
(31, 'Which among the following correctly defines the term ‘Home Page’ of a website?\n\n', 3, 'Single Choice', 2, '2020-10-30 03:37:36', NULL, NULL, 0),
(32, 'Which of the following is needed in K-means clustering?', 3, 'Single Choice', 2, '2020-10-30 03:40:22', NULL, NULL, 0),
(33, 'which of the following is not an assumption of linear regression?', 3, 'Single Choice', 2, '2020-10-30 03:40:32', NULL, NULL, 0),
(34, 'Which is not an activation function in neural networks?', 2, 'Single Choice', 2, '2020-10-30 03:40:42', NULL, NULL, 0),
(35, 'Which is not a hyperparameter in decision trees?', 2, 'Single Choice', 2, '2020-10-30 03:41:22', NULL, NULL, 0),
(36, 'Which of the following are some of the regularization methods?', 2, 'Single Choice', 2, '2020-10-30 03:41:29', NULL, NULL, 0),
(37, 'Which of the following packages provides machine learning functionality?', 3, 'Single Choice', 2, '2020-10-30 03:41:37', NULL, NULL, 0),
(38, 'R is technically much closer to the Scheme language than it is to the original _____ language.', 3, 'Single Choice', 2, '2020-10-30 03:41:44', NULL, NULL, 0),
(39, 'Normal random numbers can be generated with rnorm() by setting seed value to:', 3, 'Single Choice', 2, '2020-10-30 03:41:52', NULL, NULL, 0),
(40, '__________ prints out the function call stack after an error occurs.', 3, 'Single Choice', 2, '2020-10-30 03:42:00', NULL, NULL, 0),
(41, '_______applies a function over the margins of an array.', 3, 'Single Choice', 2, '2020-10-30 03:42:07', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `questiontopic`
--

DROP TABLE IF EXISTS `questiontopic`;
CREATE TABLE IF NOT EXISTS `questiontopic` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Question` int NOT NULL,
  `Topic` int NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `Question` (`Question`),
  KEY `Topic` (`Topic`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
CREATE TABLE IF NOT EXISTS `quiz` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Examination` int NOT NULL,
  `Config` int NOT NULL,
  `Template` int NOT NULL,
  `Code` int DEFAULT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `Examination` (`Examination`),
  KEY `Config` (`Config`),
  KEY `Template` (`Template`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`ID`, `Examination`, `Config`, `Template`, `Code`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(5, 4, 6, 1, 1, 2, '2020-10-30 03:46:15', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `quizcontent`
--

DROP TABLE IF EXISTS `quizcontent`;
CREATE TABLE IF NOT EXISTS `quizcontent` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Quiz` int NOT NULL,
  `QuestionID` int NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `Quiz` (`Quiz`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  KEY `QuestionID` (`QuestionID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `template`
--

DROP TABLE IF EXISTS `template`;
CREATE TABLE IF NOT EXISTS `template` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TemplateName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `HeaderContent` longtext COLLATE utf8_unicode_ci NOT NULL,
  `Quiz` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `QuestionContent` longtext COLLATE utf8_unicode_ci NOT NULL,
  `AnswerContent` longtext COLLATE utf8_unicode_ci NOT NULL,
  `FooterContent` longtext COLLATE utf8_unicode_ci NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `template`
--

INSERT INTO `template` (`ID`, `TemplateName`, `Description`, `HeaderContent`, `Quiz`, `QuestionContent`, `AnswerContent`, `FooterContent`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(1, 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 1, '2020-09-22 13:07:10', 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
CREATE TABLE IF NOT EXISTS `topic` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`ID`, `Content`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(1, 'dung ml test', 1, '2020-09-10 09:46:21', 3, '2020-11-01 15:06:31', 0),
(2, 'test edit', 1, '2020-09-10 09:49:34', 3, '2020-10-28 15:07:55', 1),
(3, 'testgfhgf', 1, '2020-09-11 10:01:29', 1, '2020-09-11 10:01:29', 0),
(4, 'Dung', 1, '2020-09-12 10:18:15', 1, NULL, 0),
(5, 'test', 1, '2020-09-21 10:50:59', 3, '2020-10-28 15:24:05', 0),
(7, 'dung ml', 1, '2020-10-07 04:57:33', NULL, NULL, 0),
(8, 'test topic', 3, '2020-10-28 14:54:05', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'must be a string and a lowercase ',
  `Password` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `Fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Role` enum('super admin','admin','user','') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '1 is super admin, 2  is admin, 3 is user',
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Username` (`Username`) USING BTREE,
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Username`, `Password`, `Email`, `Fullname`, `Role`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(1, 'admin', '$2a$10$rW0L5yiLahhf04Qauykhs.aG/CIigO9bjJHOn4wKUCnehyfL7EPJq', 'admin@gmail.com', 'admin', 'super admin', 0, '2020-09-09 18:35:35', 2, '2020-11-06 15:39:22', 0),
(2, 'dung', '$2a$10$Ie6/6SdKEZxkfcbnKsRYX.M6lJ.GHoqlj6G9K/Z.4TR.dvYyNM7jy', 'thdung002@gmail.com', 'THD', 'admin', 0, '2020-09-09 18:38:12', 1, '2020-11-06 15:41:27', 0),
(3, 'trung', '$2a$10$6AiC5tsYYPICTaV/uMxtVODjgBwHRW6zRt/M7/79Q6ecdrxMPsd0u', 'admin@quizmanagement.com', 'trung', 'user', 0, '2020-09-09 18:38:12', 2, '2020-11-06 13:18:06', 0),
(26, 'teacher', '$2a$10$phFn4OpAPfHRHIqha/7MseeGzzWLGiFEmiAXErSHD4QDDEvAW7EgC', 'teacher@gmail.com', 'teacher 1', 'user', 2, '2020-11-10 04:15:03', NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer` ADD FULLTEXT KEY `Content` (`Content`);

--
-- Indexes for table `question`
--
ALTER TABLE `question` ADD FULLTEXT KEY `Content` (`Content`);
ALTER TABLE `question` ADD FULLTEXT KEY `Content_2` (`Content`);

--
-- Indexes for table `user`
--
ALTER TABLE `user` ADD FULLTEXT KEY `Username_2` (`Username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`Question`) REFERENCES `question` (`ID`),
  ADD CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `answer_ibfk_3` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`);

--
-- Constraints for table `config`
--
ALTER TABLE `config`
  ADD CONSTRAINT `config_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `config_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`);

--
-- Constraints for table `examination`
--
ALTER TABLE `examination`
  ADD CONSTRAINT `examination_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `examination_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`);

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `question_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`);

--
-- Constraints for table `questiontopic`
--
ALTER TABLE `questiontopic`
  ADD CONSTRAINT `questiontopic_ibfk_1` FOREIGN KEY (`Question`) REFERENCES `question` (`ID`),
  ADD CONSTRAINT `questiontopic_ibfk_2` FOREIGN KEY (`Topic`) REFERENCES `topic` (`ID`),
  ADD CONSTRAINT `questiontopic_ibfk_3` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `questiontopic_ibfk_4` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`);

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`Examination`) REFERENCES `examination` (`ID`),
  ADD CONSTRAINT `quiz_ibfk_2` FOREIGN KEY (`Config`) REFERENCES `config` (`ID`),
  ADD CONSTRAINT `quiz_ibfk_3` FOREIGN KEY (`Template`) REFERENCES `template` (`ID`),
  ADD CONSTRAINT `quiz_ibfk_4` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `quiz_ibfk_5` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`);

--
-- Constraints for table `quizcontent`
--
ALTER TABLE `quizcontent`
  ADD CONSTRAINT `quizcontent_ibfk_1` FOREIGN KEY (`Quiz`) REFERENCES `quiz` (`ID`),
  ADD CONSTRAINT `quizcontent_ibfk_2` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `quizcontent_ibfk_3` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `quizcontent_ibfk_4` FOREIGN KEY (`QuestionID`) REFERENCES `question` (`ID`);

--
-- Constraints for table `template`
--
ALTER TABLE `template`
  ADD CONSTRAINT `template_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `template_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`);

--
-- Constraints for table `topic`
--
ALTER TABLE `topic`
  ADD CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `topic_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
