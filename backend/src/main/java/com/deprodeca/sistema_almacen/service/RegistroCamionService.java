package com.deprodeca.sistema_almacen.service;

import com.deprodeca.sistema_almacen.entity.RegistroCamion;
import com.deprodeca.sistema_almacen.Repository.RegistroCamionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RegistroCamionService {

    @Autowired
    private RegistroCamionRepository registroCamionRepository;

    public List<RegistroCamion> listarTodos() {
        return registroCamionRepository.findAll();
    }

    public Optional<RegistroCamion> buscarPorId(Integer id) {
        return registroCamionRepository.findById(id);
    }

    public List<RegistroCamion> buscarPorCamion(Integer idCamion) {
        return registroCamionRepository.findByCamionIdCamion(idCamion);
    }

    public List<RegistroCamion> buscarPorFecha(LocalDate fecha) {
        return registroCamionRepository.findByFecha(fecha);
    }

    public RegistroCamion guardar(RegistroCamion registro) {
        return registroCamionRepository.save(registro);
    }

    public void eliminar(Integer id) {
        registroCamionRepository.deleteById(id);
    }
}