package com.deprodeca.sistema_almacen.service;

import com.deprodeca.sistema_almacen.entity.Incidente;
import com.deprodeca.sistema_almacen.Repository.IncidenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class IncidenteService {

    @Autowired
    private IncidenteRepository incidenteRepository;

    public List<Incidente> listarTodos() {
        return incidenteRepository.findAll();
    }

    public Optional<Incidente> buscarPorId(Integer id) {
        return incidenteRepository.findById(id);
    }

    public List<Incidente> buscarPorCamion(Integer idCamion) {
        return incidenteRepository.findByCamionIdCamion(idCamion);
    }

    public List<Incidente> buscarPorEstado(Incidente.Estado estado) {
        return incidenteRepository.findByEstado(estado);
    }

    public Incidente guardar(Incidente incidente) {
        return incidenteRepository.save(incidente);
    }

    public void eliminar(Integer id) {
        incidenteRepository.deleteById(id);
    }
}