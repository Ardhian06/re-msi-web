-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2020 at 03:49 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `company_profile`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(19, 'admin', 'admin'),
(23, 'arif', 'arif'),
(27, 'dd', 'dd'),
(29, 'a', 'a');

-- --------------------------------------------------------

--
-- Table structure for table `email`
--

CREATE TABLE `email` (
  `id_email` int(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `email`
--

INSERT INTO `email` (`id_email`, `email`) VALUES
(1, 'amuttama4@gmail.com'),
(6, 'amuttamssa4@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id_review` int(11) NOT NULL,
  `reviewer` varchar(30) NOT NULL,
  `job_reviewer` varchar(30) NOT NULL,
  `testimonial` varchar(200) NOT NULL,
  `img_reviewer` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id_review`, `reviewer`, `job_reviewer`, `testimonial`, `img_reviewer`) VALUES
(2, 'Jarrod\'s Tech', 'Tech Reviewer', 'Comfortable keyboard and fast performance, MSI Bravo 15 is a beast!', 'jarrod-tech.jpg'),
(3, 'Linus Tech Tips', 'Tech Reviewer', 'With less price, MSI RX 5700 XT Mech OC just slighly above RTX 2070 Super performance with more than 1000 bucks price different.', '1200px-2018_Linus_Tech_Tips_logo.svg.png'),
(4, 'Hardware Unboxed', 'Tech Reviewer', 'MSI have the best performance and temperature for the RX 5600 XT GPU\'s.', 'hw-unboxed.jpg'),
(5, 'Nerd Review', 'Tech Reviewer', 'Dengan desain yang tipis dan elegan, MSI Prestige 14 merupakan laptop yang cocok untuk para professional.', 'nerd review.jpg'),
(6, 'Jagat Review', 'Tech Reviewer', 'MSI Alpha 15 adalah laptop gaming budget dengan cpu dan gpu dari AMD terbaik pada tahun 2019.', 'jagat-review-logo.png'),
(7, 'GAPTECH ID', 'Tech Reviewer', 'MSI B450 Pro Steel Legend adalah motherboard AM4 terbaik untuk dan terpopuler.', 'gaptech id.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id_team` int(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `job` varchar(50) NOT NULL,
  `img_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id_team`, `nama`, `job`, `img_name`) VALUES
(5, 'Arif Muttama', 'Backend', 'arif-profile.jpeg'),
(6, 'Gilang Nur F', 'Mockup Design', 'gilang-profile.jpeg'),
(7, 'Hanif Ardhiansyah Y', 'Mockup Design & Front-End', 'hanif-profile.jpg'),
(8, 'Riko Adi S', 'Front-End', 'riko-profile.jpeg'),
(9, 'Wahyu Krisda', 'Presentation', 'krisda-profile.jpeg'),
(10, 'Hendrawan Y', 'Back-End', 'hendra-profile.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email`
--
ALTER TABLE `email`
  ADD PRIMARY KEY (`id_email`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id_review`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id_team`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `email`
--
ALTER TABLE `email`
  MODIFY `id_email` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id_review` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id_team` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
