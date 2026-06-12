package com.deprodeca.sistema_almacen.service;

import com.deprodeca.sistema_almacen.entity.Abasto;
import com.deprodeca.sistema_almacen.Repository.AbastoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AbastoService {

    @Autowired
    private AbastoRepository abastoRepository;

    public List<Abasto> listarTodos() {
        return abastoRepository.findAll();
    }

    public Optional<Abasto> buscarPorId(Integer id) {
        return abastoRepository.findById(id);
    }

    public List<Abasto> buscarPorTipo(Abasto.Tipo tipo) {
        return abastoRepository.findByTipo(tipo);
    }

    public Abasto guardar(Abasto abasto) {
        return abastoRepository.save(abasto);
    }

    public void eliminar(Integer id) {
        abastoRepository.deleteById(id);
    }
}