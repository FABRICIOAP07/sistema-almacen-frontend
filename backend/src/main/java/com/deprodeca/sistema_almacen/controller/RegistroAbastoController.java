package com.deprodeca.sistema_almacen.controller;

import com.deprodeca.sistema_almacen.entity.RegistroAbasto;
import com.deprodeca.sistema_almacen.service.RegistroAbastoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registro-abastos")
@CrossOrigin(origins = "*")
public class RegistroAbastoController {

    @Autowired
    private RegistroAbastoService registroAbastoService;

    @GetMapping
    public List<RegistroAbasto> listar() {
        return registroAbastoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroAbasto> buscarPorId(@PathVariable Integer id) {
        return registroAbastoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/abasto/{idAbasto}")
    public List<RegistroAbasto> buscarPorAbasto(@PathVariable Integer idAbasto) {
        return registroAbastoService.buscarPorAbasto(idAbasto);
    }

    @PostMapping
    public ResponseEntity<RegistroAbasto> crear(@RequestBody RegistroAbasto registro) {
        return ResponseEntity.ok(registroAbastoService.guardar(registro));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegistroAbasto> actualizar(@PathVariable Integer id, @RequestBody RegistroAbasto registro) {
        return registroAbastoService.buscarPorId(id).map(r -> {
            registro.setIdRegistroAbasto(id);
            return ResponseEntity.ok(registroAbastoService.guardar(registro));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (registroAbastoService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        registroAbastoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}