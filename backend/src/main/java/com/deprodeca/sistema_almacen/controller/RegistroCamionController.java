package com.deprodeca.sistema_almacen.controller;

import com.deprodeca.sistema_almacen.entity.RegistroCamion;
import com.deprodeca.sistema_almacen.service.RegistroCamionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/registro-camiones")
@CrossOrigin(origins = "*")
public class RegistroCamionController {

    @Autowired
    private RegistroCamionService registroCamionService;

    @GetMapping
    public List<RegistroCamion> listar() {
        return registroCamionService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroCamion> buscarPorId(@PathVariable Integer id) {
        return registroCamionService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/camion/{idCamion}")
    public List<RegistroCamion> buscarPorCamion(@PathVariable Integer idCamion) {
        return registroCamionService.buscarPorCamion(idCamion);
    }

    @GetMapping("/fecha/{fecha}")
    public List<RegistroCamion> buscarPorFecha(@PathVariable LocalDate fecha) {
        return registroCamionService.buscarPorFecha(fecha);
    }

    @PostMapping
    public ResponseEntity<RegistroCamion> crear(@RequestBody RegistroCamion registro) {
        return ResponseEntity.ok(registroCamionService.guardar(registro));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegistroCamion> actualizar(@PathVariable Integer id, @RequestBody RegistroCamion registro) {
        return registroCamionService.buscarPorId(id).map(r -> {
            registro.setIdRegistro(id);
            return ResponseEntity.ok(registroCamionService.guardar(registro));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (registroCamionService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        registroCamionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}