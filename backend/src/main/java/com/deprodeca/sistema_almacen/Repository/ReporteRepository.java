package com.deprodeca.sistema_almacen.Repository;

import com.deprodeca.sistema_almacen.entity.Reporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, Integer> {
    List<Reporte> findByTipoReporte(Reporte.TipoReporte tipoReporte);
    List<Reporte> findByUsuarioIdUsuario(Integer idUsuario);
}