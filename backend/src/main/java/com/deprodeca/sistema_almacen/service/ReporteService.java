package com.deprodeca.sistema_almacen.service;

import com.deprodeca.sistema_almacen.entity.Reporte;
import com.deprodeca.sistema_almacen.Repository.ReporteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReporteService {

    @Autowired
    private ReporteRepository reporteRepository;

    public List<Reporte> listarTodos() {
        return reporteRepository.findAll();
    }

    public Optional<Reporte> buscarPorId(Integer id) {
        return reporteRepository.findById(id);
    }

    public List<Reporte> buscarPorTipo(Reporte.TipoReporte tipo) {
        return reporteRepository.findByTipoReporte(tipo);
    }

    public Reporte guardar(Reporte reporte) {
        return reporteRepository.save(reporte);
    }

    public void eliminar(Integer id) {
        reporteRepository.deleteById(id);
    }
}