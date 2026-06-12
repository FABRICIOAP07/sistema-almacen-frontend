package com.deprodeca.sistema_almacen.service;

import com.deprodeca.sistema_almacen.entity.Camion;
import com.deprodeca.sistema_almacen.Repository.CamionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CamionService {

    @Autowired
    private CamionRepository camionRepository;

    public List<Camion> listarTodos() {
        return camionRepository.findAll();
    }

    public Optional<Camion> buscarPorId(Integer id) {
        return camionRepository.findById(id);
    }

    public List<Camion> buscarPorEstado(Camion.Estado estado) {
        return camionRepository.findByEstado(estado);
    }

    public Camion guardar(Camion camion) {
        return camionRepository.save(camion);
    }

    public void eliminar(Integer id) {
        camionRepository.deleteById(id);
    }
}