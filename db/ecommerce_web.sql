-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql-db
-- Generation Time: Feb 09, 2022 at 11:06 AM
-- Server version: 8.0.28
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_web`
--
CREATE DATABASE IF NOT EXISTS `ecommerce_web` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `ecommerce_web`;

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `username` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Truncate table before insert `accounts`
--

TRUNCATE TABLE `accounts`;
-- --------------------------------------------------------

--
-- Table structure for table `featured_products`
--

DROP TABLE IF EXISTS `featured_products`;
CREATE TABLE IF NOT EXISTS `featured_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `product_image_id` int NOT NULL,
  `featured_desc` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`) INVISIBLE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Truncate table before insert `featured_products`
--

TRUNCATE TABLE `featured_products`;
--
-- Dumping data for table `featured_products`
--

INSERT DELAYED IGNORE INTO `featured_products` (`id`, `product_id`, `product_image_id`, `featured_desc`) VALUES
(1, 1, 1, 'New model Macbooks available now with different specifications'),
(2, 4, 5, 'New exclusive watches with different colors now available'),
(3, 6, 10, 'Different Shades of Sunglasses. Exclusive Deals');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `buyer_id` int DEFAULT NULL,
  `price` decimal(6,2) NOT NULL DEFAULT '0.00',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Truncate table before insert `orders`
--

TRUNCATE TABLE `orders`;
--
-- Dumping data for table `orders`
--

INSERT DELAYED IGNORE INTO `orders` (`id`, `buyer_id`, `price`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(3, 2, '91.30', '2022-02-09 10:25:33', '2022-02-09 10:25:33', NULL),
(4, 3, '383.12', '2022-02-09 10:51:06', '2022-02-09 10:51:06', NULL),
(5, 3, '91.30', '2022-02-09 10:54:19', '2022-02-09 10:54:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_addresses`
--

DROP TABLE IF EXISTS `order_addresses`;
CREATE TABLE IF NOT EXISTS `order_addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int DEFAULT NULL,
  `address_line_1` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `areaCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Truncate table before insert `order_addresses`
--

TRUNCATE TABLE `order_addresses`;
-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

DROP TABLE IF EXISTS `order_products`;
CREATE TABLE IF NOT EXISTS `order_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `oneUnitPrice` decimal(6,2) NOT NULL DEFAULT '0.00',
  `totalPrice` decimal(6,2) NOT NULL DEFAULT '0.00',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Truncate table before insert `order_products`
--

TRUNCATE TABLE `order_products`;
--
-- Dumping data for table `order_products`
--

INSERT DELAYED IGNORE INTO `order_products` (`id`, `orderId`, `productId`, `seller_id`, `quantity`, `oneUnitPrice`, `totalPrice`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(5, 3, 6, 2, 2, '45.65', '91.30', '2022-02-09 10:25:33', '2022-02-09 10:25:33', '2022-02-09 10:25:33'),
(6, 4, 5, 2, 4, '95.78', '383.12', '2022-02-09 10:51:06', '2022-02-09 10:51:06', '2022-02-09 10:51:06'),
(7, 5, 6, 2, 2, '45.65', '91.30', '2022-02-09 10:54:19', '2022-02-09 10:54:19', '2022-02-09 10:54:19');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seller_id` int DEFAULT NULL,
  `title` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` varchar(650) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `imageUrl` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `posted_on` datetime DEFAULT NULL,
  `category` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `postcode` int DEFAULT NULL,
  `city` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `street` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sellerName` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact` int UNSIGNED DEFAULT NULL,
  `approve_status` tinyint(1) DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Truncate table before insert `products`
--

TRUNCATE TABLE `products`;
--
-- Dumping data for table `products`
--

INSERT DELAYED IGNORE INTO `products` (`id`, `seller_id`, `title`, `description`, `imageUrl`, `price`, `posted_on`, `category`, `postcode`, `city`, `street`, `sellerName`, `contact`, `approve_status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 2, 'MacBook', 'The MacBook is carved out of solid aluminum, thus giving it a distinctive look and a grayish-white hue.', NULL, '542.50', NULL, 'Electronics', 10102, 'Fulda', 'Frankfurter Strasse 12a', 'Frank Mueller', 123456789, 1, '2022-02-09 08:43:55', '2022-02-09 08:43:55', NULL),
(4, 2, 'Cool Watch', '24 hours + multi-day extended mode varies depending on use and after installation of updates. The induction charger with USB cable connects to the rings at the back of the case and can be rotated 360 degrees.', NULL, '185.65', NULL, 'Watch', 95665, 'Fulda', 'Schule Strasse 56', 'George Fernandes', 789156324, 1, '2022-02-09 09:08:37', '2022-02-09 09:08:37', NULL),
(5, 2, 'Toy Cars', 'This model car is of good quality and can be decorated at home or in store. Metal housing, more open doors, car light and retraction engine function. It is a perfect collection for car lovers and a great gift for your kids.', NULL, '95.78', NULL, 'Toys', 15935, 'Fulda', 'Uniplatz 112', 'Herman Michael Friedl', 15935487, 1, '2022-02-09 09:16:05', '2022-02-09 09:16:05', NULL),
(6, 2, 'Stylish Sunglasses', 'Excellent thick lenses – 1.0 mm polarised lenses are comparable to the thickness you would find in much more expensive sports glasses. This lenses pass a double decentralisation test to ensure there are no optical distortion that can lead to eye strain and headaches.', NULL, '45.65', NULL, 'Fashion', 59631, 'Fulda', 'Undoder Strasse 12', 'Josephine Aust', 1989456451, 1, '2022-02-09 09:25:35', '2022-02-09 09:25:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `image` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Truncate table before insert `product_images`
--

TRUNCATE TABLE `product_images`;
--
-- Dumping data for table `product_images`
--

INSERT DELAYED IGNORE INTO `product_images` (`id`, `product_id`, `image`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Product-2-1644396234526-583195678.jpg', '2022-02-09 08:43:55', '2022-02-09 08:43:55', NULL),
(2, 1, 'Product-2-1655496532756-594510961.jpg', '2022-02-09 08:43:55', '2022-02-09 08:43:55', NULL),
(3, 1, 'Product-2-1644396234656-396108082.jpg', '2022-02-09 08:43:55', '2022-02-09 08:43:55', NULL),
(4, 4, 'Product-2-1644397716207-183020444.jpg', '2022-02-09 09:08:37', '2022-02-09 09:08:37', NULL),
(5, 4, 'Product-2-1644397716484-652369908.jpg', '2022-02-09 09:08:37', '2022-02-09 09:08:37', NULL),
(6, 4, 'Product-2-1644397716949-675785082.jpg', '2022-02-09 09:08:37', '2022-02-09 09:08:37', NULL),
(7, 5, 'Product-2-1644398164289-418375060.jpg', '2022-02-09 09:16:05', '2022-02-09 09:16:05', NULL),
(8, 5, 'Product-2-1644398165357-815463792.jpg', '2022-02-09 09:16:05', '2022-02-09 09:16:05', NULL),
(9, 5, 'Product-2-1644398165646-495047065.jpg', '2022-02-09 09:16:05', '2022-02-09 09:16:05', NULL),
(10, 6, 'Product-2-1644398735054-900253715.jpg', '2022-02-09 09:25:35', '2022-02-09 09:25:35', NULL),
(11, 6, 'Product-2-1644398735162-594983558.jpg', '2022-02-09 09:25:35', '2022-02-09 09:25:35', NULL),
(12, 6, 'Product-2-1644398735174-544080491.jpg', '2022-02-09 09:25:35', '2022-02-09 09:25:35', NULL),
(13, 6, 'Product-2-1644398735179-805184587.jpg', '2022-02-09 09:25:35', '2022-02-09 09:25:35', NULL),
(14, 6, 'Product-2-1644398735210-887625653.jpg', '2022-02-09 09:25:35', '2022-02-09 09:25:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `buyerId` int DEFAULT NULL,
  `sellerId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `rating` tinyint DEFAULT NULL,
  `ratingComments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `reportReview` tinyint DEFAULT NULL,
  `reportReviewComments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `reportReviewStatus` tinyint DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `studentId` (`buyerId`) USING BTREE,
  KEY `sellerId` (`sellerId`) USING BTREE,
  KEY `productId` (`productId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Truncate table before insert `reviews`
--

TRUNCATE TABLE `reviews`;
-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `isBuyer` tinyint(1) DEFAULT NULL,
  `isSeller` tinyint(1) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT NULL,
  `profile_image` varchar(191) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Truncate table before insert `users`
--

TRUNCATE TABLE `users`;
--
-- Dumping data for table `users`
--

INSERT DELAYED IGNORE INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `dateOfBirth`, `gender`, `isBuyer`, `isSeller`, `isAdmin`, `status`, `profile_image`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'John', 'Doe', 'johndoe@ai.hs-fulda.de', '$2a$10$719/w8AIt0JtJZVQK5L0B.6skH2DRkUGfy.o3RQIeHMtl0Hz64AQi', '1985-05-08', 0, 1, 1, 1, 0, NULL, '2021-12-26 12:21:11', '2021-12-26 12:21:11', NULL),
(2, 'Kyler', 'Stark', 'kylerstark@ai.hs-fulda.de', '$2a$10$odgaZlCBMLlRuBpkCk51R.HAdAyB0hXONZFtQJYLsSlI.2cp6YwTy', '1981-08-31', 1, 1, 1, 0, 0, 'User-2-1644399484660-385402955.jpg', '2021-12-26 12:21:11', '2022-02-09 09:38:04', NULL),
(3, 'Johnny', 'Doh', 'johnnyd@informatik.hs-fulda.de', '$2a$10$719/w8AIt0JtJZVQK5L0B.6skH2DRkUGfy.o3RQIeHMtl0Hz64AQi', '1995-08-05', 2, 1, 0, 0, 0, 'User-3-1644404628751-219979779.jpg', '2021-12-26 12:21:11', '2022-02-09 11:03:48', NULL),
(4, 'Sam', 'John', 'yes39@ai.hs-fulda.de', '$2a$10$.f2evzihzmBAJQ097iEMJeSHE4F9J6qNS0AhJ77v9k2nqB6tItCXu', '1995-08-05', 2, 1, 0, 0, 0, NULL, '2021-12-27 19:02:03', '2021-12-27 19:18:29', NULL),
(5, 'Hitesh', 'Shridhar', 'yes40@ai.hs-fulda.de', '$2a$10$BzhlczIcCFfO3dII/0yWT.WGD.7ngBzBytctfpCNz/g1a20jHMUN.', '1995-08-05', 2, 1, 0, 0, 0, NULL, '2021-12-30 19:18:14', '2021-12-30 19:20:51', NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `featured_products`
--
ALTER TABLE `featured_products`
  ADD CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_image_id` FOREIGN KEY (`id`) REFERENCES `product_images` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`buyerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`sellerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
