package com.deprodeca.sistema_almacen.Repository;

import com.deprodeca.sistema_almacen.entity.RegistroCamion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface RegistroCamionRepository extends JpaRepository<RegistroCamion, Integer> {
    List<RegistroCamion> findByCamionIdCamion(Integer idCamion);
    List<RegistroCamion> findByFecha(LocalDate fecha);
}