package com.deprodeca.sistema_almacen.Repository;

import com.deprodeca.sistema_almacen.entity.RegistroAbasto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface RegistroAbastoRepository extends JpaRepository<RegistroAbasto, Integer> {
    List<RegistroAbasto> findByAbastoIdAbasto(Integer idAbasto);
    List<RegistroAbasto> findByFecha(LocalDate fecha);
}