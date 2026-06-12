package com.deprodeca.sistema_almacen.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "registro_abasto")
public class RegistroAbasto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_registro_abasto")
    private Integer idRegistroAbasto;

    @ManyToOne
    @JoinColumn(name = "id_abasto")
    private Abasto abasto;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "hora_llegada")
    private LocalTime horaLlegada;

    @Column(name = "hora_salida")
    private LocalTime horaSalida;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;
}