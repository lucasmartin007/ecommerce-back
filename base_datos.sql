-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2021 a las 02:36:47
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proy-ecommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `checkouts`
--

CREATE TABLE `checkouts` (
  `id` int(11) NOT NULL,
  `ordenId` int(11) NOT NULL,
  `metodoPago` varchar(512) NOT NULL,
  `numeroTarjeta` int(11) DEFAULT NULL,
  `codigoTarjeta` int(11) DEFAULT NULL,
  `precioTotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `checkouts`
--

INSERT INTO `checkouts` (`id`, `ordenId`, `metodoPago`, `numeroTarjeta`, `codigoTarjeta`, `precioTotal`) VALUES
(1, 14, 'Efectivo', NULL, NULL, 450),
(2, 16, 'Debito', 22222, 11111, 450),
(3, 17, 'Debito', 22222, 11111, 450),
(4, 18, 'Efectivo', NULL, NULL, 105),
(5, 19, 'Efectivo', NULL, NULL, 225);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE `ordenes` (
  `id` int(11) NOT NULL,
  `usuarioId` varchar(512) NOT NULL,
  `precioTotal` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ordenes`
--

INSERT INTO `ordenes` (`id`, `usuarioId`, `precioTotal`, `created_at`) VALUES
(3, '210b587c-f59c-4897-ba0d-f13f671bb82f', 1150, '2021-08-25 23:11:49'),
(5, '210b587c-f59c-4897-ba0d-f13f671bb82f', 450, '2021-08-27 15:09:13'),
(7, '210b587c-f59c-4897-ba0d-f13f671bb82f', 450, '2021-08-27 20:03:21'),
(8, '210b587c-f59c-4897-ba0d-f13f671bb82f', 450, '2021-08-27 20:51:15'),
(14, '210b587c-f59c-4897-ba0d-f13f671bb82f', 450, '2021-08-30 18:27:42'),
(16, '210b587c-f59c-4897-ba0d-f13f671bb82f', 450, '2021-08-30 18:33:14'),
(17, '210b587c-f59c-4897-ba0d-f13f671bb82f', 450, '2021-08-30 19:03:53'),
(18, '210b587c-f59c-4897-ba0d-f13f671bb82f', 105, '2021-08-31 00:28:06'),
(19, '210b587c-f59c-4897-ba0d-f13f671bb82f', 225, '2021-08-31 01:35:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenesproductos`
--

CREATE TABLE `ordenesproductos` (
  `id` int(11) NOT NULL,
  `ordenId` int(11) NOT NULL,
  `productoId` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ordenesproductos`
--

INSERT INTO `ordenesproductos` (`id`, `ordenId`, `productoId`, `cantidad`) VALUES
(1, 3, 1, 10),
(2, 3, 2, 20),
(6, 5, 1, 5),
(7, 5, 3, 1),
(8, 5, 2, 10),
(11, 7, 1, 10),
(12, 7, 2, 20),
(13, 8, 1, 10),
(14, 8, 2, 20),
(21, 14, 1, 10),
(22, 14, 2, 20),
(25, 16, 1, 10),
(26, 16, 2, 20),
(27, 17, 1, 10),
(28, 17, 2, 20),
(29, 18, 1, 2),
(30, 18, 2, 5),
(31, 19, 1, 5),
(32, 19, 2, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(512) NOT NULL,
  `descripcion` varchar(512) DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `tiene_imagen` tinyint(1) NOT NULL,
  `url_imagen` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`, `tiene_imagen`, `url_imagen`) VALUES
(1, 'Clavo', 'Clavo tamaño 1', 15, 1, 'https://www.modregohogar.com/332371-home_default/punta-plana-a-millares-20x42.jpg'),
(2, 'Tornillo', 'Tornillo tamaño 1', 15, 1, 'https://www.modregohogar.com/329118-home_default/tornillo-hexagonal-hispanox-din-933-a2-5x20-acero-inoxidable.jpg'),
(3, 'Martillo', 'Martillo mediano', 350, 1, 'https://www.modregohogar.com/223989-home_default/martillo-bellota-8011-f.jpg'),
(4, 'Destornillador', 'Destornillador mediano', 300, 0, NULL),
(5, 'Tuerca', 'Tuerca tamaño 1', 10, 0, NULL),
(6, 'Arandela', 'Arandela tamaño 1', 5, 0, NULL),
(7, 'Perforadora', NULL, 8300, 0, NULL),
(8, 'Equipo de mechas', NULL, 500, 0, NULL),
(9, 'Llave inglesa', NULL, 230, 0, NULL),
(10, 'Llave hexagonal', NULL, 220, 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` varchar(255) DEFAULT NULL,
  `realm` varchar(510) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `emailVerified` tinyint(4) DEFAULT NULL,
  `verificationToken` varchar(510) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `realm`, `username`, `email`, `emailVerified`, `verificationToken`) VALUES
('210b587c-f59c-4897-ba0d-f13f671bb82f', NULL, 'agustin', 'agustin@gmail.com', NULL, NULL),
('2e1ec40c-f90a-4012-9c5d-e093204f51a7', NULL, 'brenda', 'brenda@hotmail.com', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usercredentials`
--

CREATE TABLE `usercredentials` (
  `id` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usercredentials`
--

INSERT INTO `usercredentials` (`id`, `password`, `userId`) VALUES
(6, '$2a$10$HqstBPFDMIdVGFAaIOJF1OgclPC0ueVv5xDsIk6ta8CrPxDGIu5bm', '210b587c-f59c-4897-ba0d-f13f671bb82f'),
(0, '$2a$10$CBOa0KDQVhby92bW4fiU4e3am5jj.5czn2UCNzQX5GN.tNs6PfFVK', '2e1ec40c-f90a-4012-9c5d-e093204f51a7');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `checkouts`
--
ALTER TABLE `checkouts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ordenesproductos`
--
ALTER TABLE `ordenesproductos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `checkouts`
--
ALTER TABLE `checkouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `ordenesproductos`
--
ALTER TABLE `ordenesproductos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
