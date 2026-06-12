package com.deprodeca.sistema_almacen.Repository;

import com.deprodeca.sistema_almacen.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    Optional<Producto> findByCodigo(String codigo);
    List<Producto> findByStockActualLessThanEqual(Integer stockMinimo);
    List<Producto> findByCategoria(Producto.Categoria categoria);
}