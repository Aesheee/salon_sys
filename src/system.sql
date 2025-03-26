-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2025 at 01:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `system`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_info`
--

CREATE TABLE `customer_info` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_info`
--

INSERT INTO `customer_info` (`user_id`, `firstname`, `lastname`, `username`, `email`, `password`) VALUES
(1, 'John', 'Doe', 'johndoe', 'john.doe@example.com', 'password123'),
(2, 'Jane', 'Smith', 'janesmith', 'jane.smith@example.com', 'password456'),
(3, 'margie', 'solis', 'marg', 'marg@gmail.com', NULL),
(4, 'marco', 'felipe', 'maro', 'margo@gmail.com', 'passworddd'),
(5, 'rico', 'felicit', 'rico', 'rico@gmail.com', 'passwordddo'),
(6, 'Margie', 'Solis', 'mar', 'msolis10@asscat.edu.ph', '123'),
(8, 'jane', 'cas', 'ela', 'ela@gmail.com', '5555'),
(10, 'Regine', 'Recta', 'Reg', 'regine@gmail.com', '1234'),
(11, 'charlene', 'otero', 'char', 'char@gmail.com', '55'),
(12, 'teews', 'lisas', 'teewssilas', 'teews@gmail.com', 'aji)Desu'),
(13, 'sweet', 'sasil', 'teewssilas', 'sweet@gmail.com', 'aji_Desu');

-- --------------------------------------------------------

--
-- Table structure for table `services_category`
--

CREATE TABLE `services_category` (
  `services_categoryID` int(11) NOT NULL,
  `service_categoryName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services_category`
--

INSERT INTO `services_category` (`services_categoryID`, `service_categoryName`) VALUES
(1, 'Hair'),
(2, 'Nail');

-- --------------------------------------------------------

--
-- Table structure for table `services_info`
--

CREATE TABLE `services_info` (
  `services_id` int(11) NOT NULL,
  `services_categoryID` int(11) DEFAULT NULL,
  `services_name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services_info`
--

INSERT INTO `services_info` (`services_id`, `services_categoryID`, `services_name`, `price`) VALUES
(1, 1, 'Hair Color', 200.00),
(2, 1, 'Hair Cut', 80.00),
(3, 1, 'Hair Rebond', 1500.00),
(4, 2, 'Nail Gel', 200.00),
(5, 2, 'Nail Polish', 150.00),
(6, 2, 'Manicure', 200.00);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `recordID` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `services_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`recordID`, `user_id`, `services_id`, `total`, `status`) VALUES
(1, 1, 1, 1000.00, 'Completed'),
(2, 1, 3, 300.00, 'Pending'),
(3, 2, 2, 1500.00, 'Completed'),
(4, 2, 4, 200.00, 'Failed'),
(5, 4, 2, 2000.00, 'Completed'),
(6, 6, 3, 1500.00, 'Confirmed'),
(7, 8, 6, 200.00, 'Confirmed'),
(9, 10, 5, 150.00, 'Confirmed'),
(10, 13, 6, 200.00, 'Confirmed');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_info`
--
ALTER TABLE `customer_info`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `services_category`
--
ALTER TABLE `services_category`
  ADD PRIMARY KEY (`services_categoryID`);

--
-- Indexes for table `services_info`
--
ALTER TABLE `services_info`
  ADD PRIMARY KEY (`services_id`),
  ADD KEY `services_categoryID` (`services_categoryID`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`recordID`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `services_id` (`services_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_info`
--
ALTER TABLE `customer_info`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `services_category`
--
ALTER TABLE `services_category`
  MODIFY `services_categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `services_info`
--
ALTER TABLE `services_info`
  MODIFY `services_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `recordID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `services_info`
--
ALTER TABLE `services_info`
  ADD CONSTRAINT `services_info_ibfk_1` FOREIGN KEY (`services_categoryID`) REFERENCES `services_category` (`services_categoryID`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `customer_info` (`user_id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`services_id`) REFERENCES `services_info` (`services_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
