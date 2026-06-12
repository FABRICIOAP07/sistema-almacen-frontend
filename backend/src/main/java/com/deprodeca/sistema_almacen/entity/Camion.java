package com.deprodeca.sistema_almacen.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "camiones")
public class Camion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_camion")
    private Integer idCamion;

    @Column(name = "placa", length = 20, nullable = false)
    private String placa;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private Tipo tipo;

    @Column(name = "conductor", length = 100)
    private String conductor;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private Estado estado;

    public enum Tipo {
        multi, abarrote, frio
    }

    public enum Estado {
        activo, mantenimiento, inactivo
    }
}