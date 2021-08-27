-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-08-2021 a las 02:24:10
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
-- Base de datos: `proy_ecommerce`
--

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
(3, '210b587c-f59c-4897-ba0d-f13f671bb82f', 450, '2021-08-25 23:11:49');

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
(2, 3, 2, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(512) NOT NULL,
  `descripcion` varchar(512) DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `tiene_imagen` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`, `tiene_imagen`) VALUES
(1, 'Clavo', 'Clavo tamaño 1', 15, 0),
(2, 'Tornillo', 'Tornillo tamaño 1', 15, 0),
(3, 'Martillo', 'Martillo mediano', 350, 0);

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
-- AUTO_INCREMENT de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ordenesproductos`
--
ALTER TABLE `ordenesproductos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
