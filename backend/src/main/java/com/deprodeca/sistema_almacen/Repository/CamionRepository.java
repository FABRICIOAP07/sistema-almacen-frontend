package com.deprodeca.sistema_almacen.Repository;

import com.deprodeca.sistema_almacen.entity.Camion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CamionRepository extends JpaRepository<Camion, Integer> {
    List<Camion> findByEstado(Camion.Estado estado);
    boolean existsByPlaca(String placa);
}