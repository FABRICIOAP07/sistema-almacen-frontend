package com.deprodeca.sistema_almacen.service;

import com.deprodeca.sistema_almacen.entity.Camion;
import com.deprodeca.sistema_almacen.entity.Producto;
import com.deprodeca.sistema_almacen.entity.Incidente;
import com.deprodeca.sistema_almacen.Repository.CamionRepository;
import com.deprodeca.sistema_almacen.Repository.ProductoRepository;
import com.deprodeca.sistema_almacen.Repository.IncidenteRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelService {

    private static final Logger logger = LoggerFactory.getLogger(ExcelService.class);

    @Autowired
    private CamionRepository camionRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private IncidenteRepository incidenteRepository;

    public ByteArrayInputStream exportarCamiones() throws IOException {
        logger.info("Generando reporte Excel de camiones");
        List<Camion> camiones = camionRepository.findAll();

        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Camiones");

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFillForegroundColor(IndexedColors.RED.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            Font font = workbook.createFont();
            font.setColor(IndexedColors.WHITE.getIndex());
            font.setBold(true);
            headerStyle.setFont(font);

            Row header = sheet.createRow(0);
            String[] columnas = {"ID", "Placa", "Tipo", "Conductor", "Estado"};
            for (int i = 0; i < columnas.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columnas[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowNum = 1;
            for (Camion c : camiones) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(c.getIdCamion());
                row.createCell(1).setCellValue(c.getPlaca());
                row.createCell(2).setCellValue(c.getTipo().name());
                row.createCell(3).setCellValue(c.getConductor());
                row.createCell(4).setCellValue(c.getEstado().name());
            }

            for (int i = 0; i < columnas.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            logger.info("Reporte Excel de camiones generado exitosamente");
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    public ByteArrayInputStream exportarProductos() throws IOException {
        logger.info("Generando reporte Excel de productos");
        List<Producto> productos = productoRepository.findAll();

        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Productos");

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFillForegroundColor(IndexedColors.RED.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            Font font = workbook.createFont();
            font.setColor(IndexedColors.WHITE.getIndex());
            font.setBold(true);
            headerStyle.setFont(font);

            Row header = sheet.createRow(0);
            String[] columnas = {"ID", "Código", "Nombre", "Categoría", "Stock Actual", "Stock Mínimo"};
            for (int i = 0; i < columnas.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columnas[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowNum = 1;
            for (Producto p : productos) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(p.getIdProducto());
                row.createCell(1).setCellValue(p.getCodigo());
                row.createCell(2).setCellValue(p.getNombre());
                row.createCell(3).setCellValue(p.getCategoria().name());
                row.createCell(4).setCellValue(p.getStockActual());
                row.createCell(5).setCellValue(p.getStockMinimo());
            }

            for (int i = 0; i < columnas.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            logger.info("Reporte Excel de productos generado exitosamente");
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    public ByteArrayInputStream exportarIncidentes() throws IOException {
        logger.info("Generando reporte Excel de incidentes");
        List<Incidente> incidentes = incidenteRepository.findAll();

        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Incidentes");

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFillForegroundColor(IndexedColors.RED.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            Font font = workbook.createFont();
            font.setColor(IndexedColors.WHITE.getIndex());
            font.setBold(true);
            headerStyle.setFont(font);

            Row header = sheet.createRow(0);
            String[] columnas = {"ID", "Camión", "Tipo", "Descripción", "Fecha", "Estado"};
            for (int i = 0; i < columnas.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columnas[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowNum = 1;
            for (Incidente i : incidentes) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(i.getIdIncidente());
                row.createCell(1).setCellValue(i.getCamion().getPlaca());
                row.createCell(2).setCellValue(i.getTipo().name());
                row.createCell(3).setCellValue(i.getDescripcion());
                row.createCell(4).setCellValue(i.getFecha().toString());
                row.createCell(5).setCellValue(i.getEstado().name());
            }

            for (int i = 0; i < columnas.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            logger.info("Reporte Excel de incidentes generado exitosamente");
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}