package com.deprodeca.sistema_almacen.controller;

import com.deprodeca.sistema_almacen.entity.Abasto;
import com.deprodeca.sistema_almacen.service.AbastoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/abastos")
@CrossOrigin(origins = "*")
public class AbastoController {

    @Autowired
    private AbastoService abastoService;

    @GetMapping
    public List<Abasto> listar() {
        return abastoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Abasto> buscarPorId(@PathVariable Integer id) {
        return abastoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Abasto> crear(@RequestBody Abasto abasto) {
        return ResponseEntity.ok(abastoService.guardar(abasto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Abasto> actualizar(@PathVariable Integer id, @RequestBody Abasto abasto) {
        return abastoService.buscarPorId(id).map(a -> {
            abasto.setIdAbasto(id);
            return ResponseEntity.ok(abastoService.guardar(abasto));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (abastoService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        abastoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}