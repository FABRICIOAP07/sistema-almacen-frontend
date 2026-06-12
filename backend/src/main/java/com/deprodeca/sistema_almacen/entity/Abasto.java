package com.deprodeca.sistema_almacen.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "abastos")
public class Abasto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_abasto")
    private Integer idAbasto;

    @Column(name = "id_empresa", length = 100, nullable = false)
    private String idEmpresa;

    @Column(name = "placa", length = 20, nullable = false)
    private String placa;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private Tipo tipo;

    @Enumerated(EnumType.STRING)
    @Column(name = "modelo")
    private Modelo modelo;

    @Column(name = "pallets_cargados")
    private Integer palletsCargados;

    @Column(name = "fecha")
    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(name = "estado")
    private Boolean estado = true;

    public enum Tipo {
        abarrote, frio, agua
    }

    public enum Modelo {
        contenedor, plancha
    }
}