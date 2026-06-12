package com.deprodeca.sistema_almacen.controller;

import com.deprodeca.sistema_almacen.entity.Incidente;
import com.deprodeca.sistema_almacen.service.IncidenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/incidentes")
@CrossOrigin(origins = "*")
public class IncidenteController {

    @Autowired
    private IncidenteService incidenteService;

    @GetMapping
    public List<Incidente> listar() {
        return incidenteService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incidente> buscarPorId(@PathVariable Integer id) {
        return incidenteService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/camion/{idCamion}")
    public List<Incidente> buscarPorCamion(@PathVariable Integer idCamion) {
        return incidenteService.buscarPorCamion(idCamion);
    }

    @GetMapping("/estado/{estado}")
    public List<Incidente> buscarPorEstado(@PathVariable Incidente.Estado estado) {
        return incidenteService.buscarPorEstado(estado);
    }

    @PostMapping
    public ResponseEntity<Incidente> crear(@RequestBody Incidente incidente) {
        return ResponseEntity.ok(incidenteService.guardar(incidente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Incidente> actualizar(@PathVariable Integer id, @RequestBody Incidente incidente) {
        return incidenteService.buscarPorId(id).map(i -> {
            incidente.setIdIncidente(id);
            return ResponseEntity.ok(incidenteService.guardar(incidente));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (incidenteService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        incidenteService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}