package com.deprodeca.sistema_almacen.controller;

import com.deprodeca.sistema_almacen.entity.Camion;
import com.deprodeca.sistema_almacen.service.CamionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/camiones")
@CrossOrigin(origins = "*")
public class CamionController {

    @Autowired
    private CamionService camionService;

    @GetMapping
    public List<Camion> listar() {
        return camionService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Camion> buscarPorId(@PathVariable Integer id) {
        return camionService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/estado/{estado}")
    public List<Camion> buscarPorEstado(@PathVariable Camion.Estado estado) {
        return camionService.buscarPorEstado(estado);
    }

    @PostMapping
    public ResponseEntity<Camion> crear(@RequestBody Camion camion) {
        return ResponseEntity.ok(camionService.guardar(camion));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Camion> actualizar(@PathVariable Integer id, @RequestBody Camion camion) {
        return camionService.buscarPorId(id).map(c -> {
            camion.setIdCamion(id);
            return ResponseEntity.ok(camionService.guardar(camion));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (camionService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        camionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}