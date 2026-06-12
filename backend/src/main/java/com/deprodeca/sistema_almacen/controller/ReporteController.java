package com.deprodeca.sistema_almacen.controller;

import com.deprodeca.sistema_almacen.entity.Reporte;
import com.deprodeca.sistema_almacen.service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @GetMapping
    public List<Reporte> listar() {
        return reporteService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reporte> buscarPorId(@PathVariable Integer id) {
        return reporteService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tipo/{tipo}")
    public List<Reporte> buscarPorTipo(@PathVariable Reporte.TipoReporte tipo) {
        return reporteService.buscarPorTipo(tipo);
    }

    @PostMapping
    public ResponseEntity<Reporte> crear(@RequestBody Reporte reporte) {
        return ResponseEntity.ok(reporteService.guardar(reporte));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reporte> actualizar(@PathVariable Integer id, @RequestBody Reporte reporte) {
        return reporteService.buscarPorId(id).map(r -> {
            reporte.setIdReporte(id);
            return ResponseEntity.ok(reporteService.guardar(reporte));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (reporteService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        reporteService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}