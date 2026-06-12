package com.deprodeca.sistema_almacen.Repository;

import com.deprodeca.sistema_almacen.entity.Incidente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IncidenteRepository extends JpaRepository<Incidente, Integer> {
    List<Incidente> findByCamionIdCamion(Integer idCamion);
    List<Incidente> findByEstado(Incidente.Estado estado);
}