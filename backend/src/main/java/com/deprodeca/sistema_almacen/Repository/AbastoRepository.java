package com.deprodeca.sistema_almacen.Repository;

import com.deprodeca.sistema_almacen.entity.Abasto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AbastoRepository extends JpaRepository<Abasto, Integer> {
    List<Abasto> findByTipo(Abasto.Tipo tipo);
    boolean existsByPlaca(String placa);
}