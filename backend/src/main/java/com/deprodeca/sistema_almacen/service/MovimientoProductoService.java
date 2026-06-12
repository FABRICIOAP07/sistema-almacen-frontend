package com.deprodeca.sistema_almacen.service;

import com.deprodeca.sistema_almacen.entity.MovimientoProducto;
import com.deprodeca.sistema_almacen.Repository.MovimientoProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MovimientoProductoService {

    @Autowired
    private MovimientoProductoRepository movimientoProductoRepository;

    public List<MovimientoProducto> listarTodos() {
        return movimientoProductoRepository.findAll();
    }

    public Optional<MovimientoProducto> buscarPorId(Integer id) {
        return movimientoProductoRepository.findById(id);
    }

    public List<MovimientoProducto> buscarPorProducto(Integer idProducto) {
        return movimientoProductoRepository.findByProductoIdProducto(idProducto);
    }

    public List<MovimientoProducto> buscarPorFecha(LocalDate fecha) {
        return movimientoProductoRepository.findByFecha(fecha);
    }

    public MovimientoProducto guardar(MovimientoProducto movimiento) {
        return movimientoProductoRepository.save(movimiento);
    }

    public void eliminar(Integer id) {
        movimientoProductoRepository.deleteById(id);
    }
}