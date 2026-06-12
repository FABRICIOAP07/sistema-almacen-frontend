package com.deprodeca.sistema_almacen.Repository;

import com.deprodeca.sistema_almacen.entity.MovimientoProducto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface MovimientoProductoRepository extends JpaRepository<MovimientoProducto, Integer> {
    List<MovimientoProducto> findByProductoIdProducto(Integer idProducto);
    List<MovimientoProducto> findByFecha(LocalDate fecha);
    List<MovimientoProducto> findByTipoMovimiento(MovimientoProducto.TipoMovimiento tipo);
}