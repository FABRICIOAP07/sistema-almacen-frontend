
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3308
-- Tiempo de generación: 26-05-2026 a las 02:47:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_de_almacen`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `abastos`
--

CREATE TABLE `abastos` (
  `id_abasto` int(11) NOT NULL,
  `id_empresa` varchar(100) NOT NULL,
  `placa` varchar(20) NOT NULL,
  `tipo` enum('abarrote','frio','agua') NOT NULL,
  `modelo` enum('contenedor','plancha') NOT NULL,
  `pallets_cargados` int(11) DEFAULT 0,
  `fecha` date NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `abastos`
--

INSERT INTO `abastos` (`id_abasto`, `id_empresa`, `placa`, `tipo`, `modelo`, `pallets_cargados`, `fecha`, `id_usuario`, `estado`) VALUES
(1, 'Gloria S.A.C', 'XYZ-456', 'abarrote', 'contenedor', 10, '2026-05-13', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camiones`
--

CREATE TABLE `camiones` (
  `id_camion` int(11) NOT NULL,
  `placa` varchar(20) NOT NULL,
  `tipo` enum('multi','abarrote','frio') NOT NULL,
  `conductor` varchar(100) NOT NULL,
  `estado` enum('activo','mantenimiento','inactivo') NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `camiones`
--

INSERT INTO `camiones` (`id_camion`, `placa`, `tipo`, `conductor`, `estado`) VALUES
(1, 'ABC-123', 'multi', 'Carlos Rios', 'activo'),
(2, 'ABC-123', 'multi', 'Carlos Rios', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidentes`
--

CREATE TABLE `incidentes` (
  `id_incidente` int(11) NOT NULL,
  `id_camion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tipo` enum('accidente','averia','retraso','perdida_producto','otro') NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` enum('pendiente','en_proceso','resuelto') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidentes`
--

INSERT INTO `incidentes` (`id_incidente`, `id_camion`, `id_usuario`, `tipo`, `descripcion`, `fecha`, `hora`, `estado`) VALUES
(1, 1, 1, 'averia', 'Falla en el motor del camión', '2026-05-13', '10:30:00', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento_productos`
--

CREATE TABLE `movimiento_productos` (
  `id_movimiento` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_camion` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `observaciones` text DEFAULT NULL,
  `tipo_movimiento` enum('entrada','salida') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movimiento_productos`
--

INSERT INTO `movimiento_productos` (`id_movimiento`, `id_producto`, `id_usuario`, `id_camion`, `cantidad`, `fecha`, `hora`, `observaciones`, `tipo_movimiento`) VALUES
(1, 1, 1, 1, 50, '2026-05-13', '09:00:00', 'Ingreso de mercadería', 'entrada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `categoria` enum('lacteos','conservas','otros') NOT NULL,
  `unidad_medida` varchar(30) NOT NULL,
  `stock_actual` int(11) DEFAULT 0,
  `stock_minimo` int(11) DEFAULT 0,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `codigo`, `nombre`, `descripcion`, `categoria`, `unidad_medida`, `stock_actual`, `stock_minimo`, `estado`) VALUES
(1, 'GLO-001', 'Leche Gloria Entera 1L', 'Leche entera UHT', 'lacteos', 'litros', 100, 20, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_abasto`
--

CREATE TABLE `registro_abasto` (
  `id_registro_abasto` int(11) NOT NULL,
  `id_abasto` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora_llegada` time NOT NULL,
  `hora_salida` time DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_abasto`
--

INSERT INTO `registro_abasto` (`id_registro_abasto`, `id_abasto`, `id_usuario`, `fecha`, `hora_llegada`, `hora_salida`, `observaciones`) VALUES
(2, 1, 1, '2026-05-13', '07:00:00', '09:00:00', 'Llegada puntual sin inconvenientes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_camiones`
--

CREATE TABLE `registro_camiones` (
  `id_registro` int(11) NOT NULL,
  `id_camion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tipo_movimiento` enum('salida','entrada','','') NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `observaciones` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_camiones`
--

INSERT INTO `registro_camiones` (`id_registro`, `id_camion`, `id_usuario`, `tipo_movimiento`, `fecha`, `hora`, `observaciones`) VALUES
(1, 1, 1, 'salida', '2026-05-13', '08:00:00', 'Salida para reparto zona norte'),
(2, 1, 1, 'salida', '2026-05-13', '08:00:00', 'Salida para reparto zona norte');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id_reporte` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tipo_reporte` enum('camiones','incidentes','materiales','general') NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `fecha_generado` datetime NOT NULL,
  `contenido` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reportes`
--

INSERT INTO `reportes` (`id_reporte`, `id_usuario`, `tipo_reporte`, `fecha_inicio`, `fecha_fin`, `fecha_generado`, `contenido`) VALUES
(1, 1, 'general', '2026-05-01', '2026-05-13', '2026-05-13 00:00:00', 'Reporte general del mes de mayo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` enum('ROLE_ADMIN','ROLE_TRANSPORTE','ROLE_ALMACEN') NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `correo`, `contrasena`, `rol`, `estado`) VALUES
(1, 'Gian', 'Ampuero', 'gianampuero@gmail.com', '$2a$10$.RNegK9WD3Ye9jWHk.0RfOGfK1FJPiqa463tJO5q4iE.0G10KZXKO', 'ROLE_ADMIN', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `abastos`
--
ALTER TABLE `abastos`
  ADD PRIMARY KEY (`id_abasto`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `camiones`
--
ALTER TABLE `camiones`
  ADD PRIMARY KEY (`id_camion`);

--
-- Indices de la tabla `incidentes`
--
ALTER TABLE `incidentes`
  ADD PRIMARY KEY (`id_incidente`),
  ADD KEY `id_camion` (`id_camion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `movimiento_productos`
--
ALTER TABLE `movimiento_productos`
  ADD PRIMARY KEY (`id_movimiento`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_camion` (`id_camion`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `registro_abasto`
--
ALTER TABLE `registro_abasto`
  ADD PRIMARY KEY (`id_registro_abasto`),
  ADD KEY `id_abasto` (`id_abasto`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `registro_camiones`
--
ALTER TABLE `registro_camiones`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `fk_registro_camion` (`id_camion`),
  ADD KEY `fk_registro_usuario` (`id_usuario`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id_reporte`),
  ADD KEY `fk_reporte_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `abastos`
--
ALTER TABLE `abastos`
  MODIFY `id_abasto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `camiones`
--
ALTER TABLE `camiones`
  MODIFY `id_camion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `incidentes`
--
ALTER TABLE `incidentes`
  MODIFY `id_incidente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `movimiento_productos`
--
ALTER TABLE `movimiento_productos`
  MODIFY `id_movimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `registro_abasto`
--
ALTER TABLE `registro_abasto`
  MODIFY `id_registro_abasto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `registro_camiones`
--
ALTER TABLE `registro_camiones`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id_reporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `abastos`
--
ALTER TABLE `abastos`
  ADD CONSTRAINT `abastos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `incidentes`
--
ALTER TABLE `incidentes`
  ADD CONSTRAINT `incidentes_ibfk_1` FOREIGN KEY (`id_camion`) REFERENCES `camiones` (`id_camion`),
  ADD CONSTRAINT `incidentes_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `movimiento_productos`
--
ALTER TABLE `movimiento_productos`
  ADD CONSTRAINT `movimiento_productos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `movimiento_productos_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `movimiento_productos_ibfk_3` FOREIGN KEY (`id_camion`) REFERENCES `camiones` (`id_camion`);

--
-- Filtros para la tabla `registro_abasto`
--
ALTER TABLE `registro_abasto`
  ADD CONSTRAINT `registro_abasto_ibfk_1` FOREIGN KEY (`id_abasto`) REFERENCES `abastos` (`id_abasto`),
  ADD CONSTRAINT `registro_abasto_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `registro_camiones`
--
ALTER TABLE `registro_camiones`
  ADD CONSTRAINT `fk_registro_camion` FOREIGN KEY (`id_camion`) REFERENCES `camiones` (`id_camion`),
  ADD CONSTRAINT `fk_registro_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD CONSTRAINT `fk_reporte_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
