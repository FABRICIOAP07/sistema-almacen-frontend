package com.deprodeca.sistema_almacen.service;

import com.deprodeca.sistema_almacen.entity.RegistroAbasto;
import com.deprodeca.sistema_almacen.Repository.RegistroAbastoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RegistroAbastoService {

    @Autowired
    private RegistroAbastoRepository registroAbastoRepository;

    public List<RegistroAbasto> listarTodos() {
        return registroAbastoRepository.findAll();
    }

    public Optional<RegistroAbasto> buscarPorId(Integer id) {
        return registroAbastoRepository.findById(id);
    }

    public List<RegistroAbasto> buscarPorAbasto(Integer idAbasto) {
        return registroAbastoRepository.findByAbastoIdAbasto(idAbasto);
    }

    public List<RegistroAbasto> buscarPorFecha(LocalDate fecha) {
        return registroAbastoRepository.findByFecha(fecha);
    }

    public RegistroAbasto guardar(RegistroAbasto registro) {
        return registroAbastoRepository.save(registro);
    }

    public void eliminar(Integer id) {
        registroAbastoRepository.deleteById(id);
    }
}