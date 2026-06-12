package com.deprodeca.sistema_almacen.controller;

import com.deprodeca.sistema_almacen.entity.MovimientoProducto;
import com.deprodeca.sistema_almacen.service.MovimientoProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
@CrossOrigin(origins = "*")
public class MovimientoProductoController {

    @Autowired
    private MovimientoProductoService movimientoProductoService;

    @GetMapping
    public List<MovimientoProducto> listar() {
        return movimientoProductoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovimientoProducto> buscarPorId(@PathVariable Integer id) {
        return movimientoProductoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/producto/{idProducto}")
    public List<MovimientoProducto> buscarPorProducto(@PathVariable Integer idProducto) {
        return movimientoProductoService.buscarPorProducto(idProducto);
    }

    @GetMapping("/fecha/{fecha}")
    public List<MovimientoProducto> buscarPorFecha(@PathVariable LocalDate fecha) {
        return movimientoProductoService.buscarPorFecha(fecha);
    }

    @PostMapping
    public ResponseEntity<MovimientoProducto> crear(@RequestBody MovimientoProducto movimiento) {
        return ResponseEntity.ok(movimientoProductoService.guardar(movimiento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovimientoProducto> actualizar(@PathVariable Integer id, @RequestBody MovimientoProducto movimiento) {
        return movimientoProductoService.buscarPorId(id).map(m -> {
            movimiento.setIdMovimiento(id);
            return ResponseEntity.ok(movimientoProductoService.guardar(movimiento));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (movimientoProductoService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        movimientoProductoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}