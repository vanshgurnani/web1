-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2023 at 07:00 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `productinfo`
--

-- --------------------------------------------------------

--
-- Table structure for table `main`
--

CREATE TABLE `main` (
  `ProductID` int(5) NOT NULL,
  `ProductName` varchar(100) DEFAULT NULL,
  `MainImage` varchar(30) DEFAULT NULL,
  `ImageItem1` varchar(30) DEFAULT NULL,
  `ImageItem2` varchar(30) DEFAULT NULL,
  `ImageItem3` varchar(30) DEFAULT NULL,
  `ImageItem4` varchar(30) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `AboutThisItem` text DEFAULT NULL,
  `Ratings` float DEFAULT NULL,
  `NoOfReviews` int(11) DEFAULT NULL,
  `OldPrice` int(11) DEFAULT NULL,
  `NewPrice` int(11) DEFAULT NULL,
  `Color` varchar(25) DEFAULT NULL,
  `Available` varchar(25) DEFAULT NULL,
  `Category` varchar(25) DEFAULT NULL,
  `ShippingArea` varchar(25) DEFAULT NULL,
  `ShippingFee` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `main`
--

INSERT INTO `main` (`ProductID`, `ProductName`, `MainImage`, `ImageItem1`, `ImageItem2`, `ImageItem3`, `ImageItem4`, `Description`, `AboutThisItem`, `Ratings`, `NoOfReviews`, `OldPrice`, `NewPrice`, `Color`, `Available`, `Category`, `ShippingArea`, `ShippingFee`, `Quantity`) VALUES
(1, 'iPhone Pro MAX', '/images/headphone.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', 'Short description of the product', 'Full description/specifications of the product', 2.5, 58, 80000, 69999, 'Space Grey', 'Currently in Stock', 'Tech', 'Anywhere in India', 40, 100),
(2, 'Samsung Galaxy S21', '/images/headphone.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', 'Short description of the product', 'Full description/specifications of the product', 4.3, 42, 85000, 74999, 'Phantom Black', 'Currently in Stock', 'Tech', 'Anywhere in India', 40, 80),
(3, 'Sony Noise-Canceling Headphones', 'images/headphone.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', 'Short description of the product', 'Full description/specifications of the product', 4.7, 75, 5000, 3999, 'Black', 'Currently in Stock', 'Tech', 'Anywhere in India', 40, 120),
(4, 'Dell XPS 13 Laptop', '/images/headphone.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', 'Short description of the product', 'Full description/specifications of the product', 4.6, 63, 90000, 79999, 'Silver', 'Currently in Stock', 'Tech', 'Anywhere in India', 40, 90),
(5, 'Nike Air Zoom Pegasus 38', '/images/headphone.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', 'Short description of the product', 'Full description/specifications of the product', 4.4, 30, 6000, 4999, 'Black/White', 'Currently in Stock', 'Fashion', 'Anywhere in India', 40, 50),
(6, 'Ray-Ban Classic Aviator Sunglasses', '/images/headphone.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', 'Short description of the product', 'Full description/specifications of the product', 4.8, 95, 3500, 2999, 'Gold/Brown', 'Currently in Stock', 'Fashion', 'Anywhere in India', 40, 70),
(7, 'Seagate 2TB External Hard Drive', '/images/headphone.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', 'Short description of the product', 'Full description/specifications of the product', 4.5, 52, 6000, 4999, 'Black', 'Currently in Stock', 'Accessories', 'Anywhere in India', 40, 85),
(8, 'JBL Flip 5 Bluetooth Speaker', '/images/headphone.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', 'Short description of the product', 'Full description/specifications of the product', 4.2, 22, 5000, 3999, 'Teal', 'Currently in Stock', 'Accessories', 'Anywhere in India', 40, 40),
(9, 'Canon EOS Rebel T7i DSLR Camera', '/images/headphone.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', 'Short description of the product', 'Full description/specifications of the product', 4.6, 78, 75000, 64999, 'Black', 'Currently in Stock', 'Tech', 'Anywhere in India', 40, 60),
(10, 'Fitbit Charge 4 Fitness Tracker', '/images/headphone.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', 'Short description of the product', 'Full description/specifications of the product', 4.3, 40, 5000, 3999, 'Black', 'Currently in Stock', 'Accessories', 'Anywhere in India', 40, 55),
(11, 'HP OfficeJet Pro 9015 All-in-One Printer', '/images/headphone.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', '/images/deal1.jpg', 'Short description of the product', 'Full description/specifications of the product', 4.7, 65, 12000, 9999, 'White', 'Currently in Stock', 'Tech', 'Anywhere in India', 40, 30);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `main`
--
ALTER TABLE `main`
  ADD PRIMARY KEY (`ProductID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
