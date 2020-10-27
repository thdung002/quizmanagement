-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: quizmanagement.ccd3ylv1pufy.ap-northeast-2.rds.amazonaws.com:3306
-- Generation Time: Oct 27, 2020 at 07:03 AM
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

CREATE TABLE `answer` (
  `ID` int NOT NULL,
  `Question` int NOT NULL,
  `Content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `IsCorrect` tinyint NOT NULL,
  `CorrectAnswer` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Using for fill type question',
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`ID`, `Question`, `Content`, `IsCorrect`, `CorrectAnswer`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(4, 12, 'Delhi', 0, '', 2, '2020-10-23 11:54:16', NULL, NULL, 0),
(5, 12, 'Bengaluru', 0, '', 2, '2020-10-23 11:57:59', NULL, NULL, 0),
(6, 12, 'Chennai', 0, '', 2, '2020-10-23 11:58:09', NULL, NULL, 0),
(7, 12, 'Mumbai', 1, '', 2, '2020-10-23 11:58:19', 2, '2020-10-23 12:24:04', 0);

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `ID` int NOT NULL,
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
  `IsDeleted` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`ID`, `NumberQuestionLevel1`, `NumberQuestionLevel2`, `NumberQuestionLevel3`, `NumberQuestionLevel4`, `NumberQuestionLevel5`, `NumberQuestionLevel6`, `NumberQuestionLevel7`, `NumberQuestionLevel8`, `NumberQuestionLevel9`, `NumberQuestionLevel10`, `TotalQuestion`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 99, 1, '2020-09-22 13:04:57', 3, '2020-10-06 14:00:02', 0),
(3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2020-10-06 13:08:32', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `examination`
--

CREATE TABLE `examination` (
  `ID` int NOT NULL,
  `Duration` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Semester` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Notes` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Department` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Course` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Coursecode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `AcademicYear` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Lecturer` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `examination`
--

INSERT INTO `examination` (`ID`, `Duration`, `Semester`, `Notes`, `Department`, `Course`, `Coursecode`, `AcademicYear`, `Lecturer`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(1, '120', '1', 'test', 'test', 'test', 'test', 'test', 'test', 1, '2020-09-22 13:03:33', 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `ID` int NOT NULL,
  `Content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Level` int NOT NULL,
  `Type` enum('Single Choice','Multiple-Choice','Fill the blank','Match') COLLATE utf8_unicode_ci DEFAULT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`ID`, `Content`, `Level`, `Type`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(12, 'Which among the following cities produces highest e-waste in India?', 2, 'Single Choice', 2, '2020-10-23 11:48:41', NULL, '2020-10-26 12:59:54', 0);

-- --------------------------------------------------------

--
-- Table structure for table `questiontopic`
--

CREATE TABLE `questiontopic` (
  `ID` int NOT NULL,
  `Question` int NOT NULL,
  `Topic` int NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `ID` int NOT NULL,
  `Examination` int NOT NULL,
  `Config` int NOT NULL,
  `Template` int NOT NULL,
  `Code` int DEFAULT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`ID`, `Examination`, `Config`, `Template`, `Code`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(1, 1, 1, 1, NULL, 1, '2020-09-22 13:12:51', 1, '2020-10-06 09:17:40', 0),
(3, 1, 1, 1, NULL, 1, '2020-10-06 08:58:01', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `quizcontent`
--

CREATE TABLE `quizcontent` (
  `ID` int NOT NULL,
  `Quiz` int NOT NULL,
  `QuestionID` int NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `template`
--

CREATE TABLE `template` (
  `ID` int NOT NULL,
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
  `IsDeleted` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `template`
--

INSERT INTO `template` (`ID`, `TemplateName`, `Description`, `HeaderContent`, `Quiz`, `QuestionContent`, `AnswerContent`, `FooterContent`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(1, 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 1, '2020-09-22 13:07:10', 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `ID` int NOT NULL,
  `Content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`ID`, `Content`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(1, 'dung ml test', 1, '2020-09-10 09:46:21', 2, '2020-10-07 04:57:51', 0),
(2, 'testgfhgf', 1, '2020-09-10 09:49:34', 1, '2020-09-10 09:49:34', 0),
(3, 'testgfhgf', 1, '2020-09-11 10:01:29', 1, '2020-09-11 10:01:29', 0),
(4, 'Dung', 1, '2020-09-12 10:18:15', 1, NULL, 0),
(5, 'test', 1, '2020-09-21 10:50:59', 1, NULL, 0),
(7, 'dung ml', 1, '2020-10-07 04:57:33', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int NOT NULL,
  `Username` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'must be a string and a lowercase ',
  `Password` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `Fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Role` tinyint(1) NOT NULL COMMENT '1 is super admin, 2  is admin, 3 is user',
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Username`, `Password`, `Email`, `Fullname`, `Role`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `IsDeleted`) VALUES
(1, 'admin', '$2a$10$QO6L4xnLz4f3.oCvuTBX9.WdozMUe6JWStVtWPqvzU/GR6I6VJAU2', 'admin@quizmanagement', 'Admin', 1, 0, '2020-09-09 18:35:35', 2, '2020-10-21 13:05:46', 0),
(2, 'dung', '$2a$10$mzjOcLXufG2zwFbvbN9nsusRlsTAJjWv5zqgir.iHPBXuG4pPjpy6', 'thdung002@gmail.com', 'THD', 1, 0, '2020-09-09 18:38:12', 2, '2020-10-23 10:09:45', 0),
(3, 'trung', '$2a$10$6AiC5tsYYPICTaV/uMxtVODjgBwHRW6zRt/M7/79Q6ecdrxMPsd0u', 'admin@quizmanagement.com', 'trung', 2, 0, '2020-09-09 18:38:12', 2, '2020-10-21 18:33:07', 0),
(12, 'dung12', '$2a$10$ZGPsIbPp1qD4dpdZa/CSGeSBeI6T7idnKUsQIZKvFLthN0Oaw4n7C', 'thdung002@gmail.com', 'Dungtest', 2, 2, '2020-10-21 18:40:26', 2, '2020-10-21 18:40:53', 0),
(16, 'dung12345', '$2a$10$KCBz8JLiHB0Al/ePzzRzNOuNwQNyyHiObXJRMEQP9UQe6jObbxWCe', 'thdung002@gmail.com', 'Dungtest', 3, 2, '2020-10-21 18:44:52', 2, '2020-10-23 10:24:52', 0),
(17, 'anonymous', '$2a$10$us.aShe.In5wRk57cmT06.PCZRPPhW0IbQptS0xQ1SqcE9lUYRncG', 'test@gmail.com', 'tester', 3, 2, '2020-10-21 18:46:42', 2, '2020-10-23 10:25:39', 1),
(18, 'tester1', '$2a$10$8ryH64nqnY4aNfFNEKv9Pu3yuKgfEkHtmBh75aNozNOQrOnVIvv4O', '123@gmail.com', 'TDSASD', 3, 2, '2020-10-27 06:00:47', NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Question` (`Question`),
  ADD KEY `CreatedBy` (`CreatedBy`),
  ADD KEY `UpdatedBy` (`UpdatedBy`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CreatedBy` (`CreatedBy`),
  ADD KEY `UpdatedBy` (`UpdatedBy`);

--
-- Indexes for table `examination`
--
ALTER TABLE `examination`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CreatedBy` (`CreatedBy`),
  ADD KEY `UpdatedBy` (`UpdatedBy`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CreatedBy` (`CreatedBy`),
  ADD KEY `UpdatedBy` (`UpdatedBy`),
  ADD KEY `FK_Type` (`Type`);

--
-- Indexes for table `questiontopic`
--
ALTER TABLE `questiontopic`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Question` (`Question`),
  ADD KEY `Topic` (`Topic`),
  ADD KEY `CreatedBy` (`CreatedBy`),
  ADD KEY `UpdatedBy` (`UpdatedBy`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Examination` (`Examination`),
  ADD KEY `Config` (`Config`),
  ADD KEY `Template` (`Template`),
  ADD KEY `CreatedBy` (`CreatedBy`),
  ADD KEY `UpdatedBy` (`UpdatedBy`);

--
-- Indexes for table `quizcontent`
--
ALTER TABLE `quizcontent`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Quiz` (`Quiz`),
  ADD KEY `CreatedBy` (`CreatedBy`),
  ADD KEY `UpdatedBy` (`UpdatedBy`),
  ADD KEY `QuestionID` (`QuestionID`);

--
-- Indexes for table `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CreatedBy` (`CreatedBy`),
  ADD KEY `UpdatedBy` (`UpdatedBy`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CreatedBy` (`CreatedBy`),
  ADD KEY `UpdatedBy` (`UpdatedBy`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Username` (`Username`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `examination`
--
ALTER TABLE `examination`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `questiontopic`
--
ALTER TABLE `questiontopic`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `quizcontent`
--
ALTER TABLE `quizcontent`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `template`
--
ALTER TABLE `template`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
