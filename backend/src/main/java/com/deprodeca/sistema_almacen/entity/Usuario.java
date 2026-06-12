package com.deprodeca.sistema_almacen.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "apellido", length = 100)
    private String apellido;

    @Column(name = "correo", length = 100, unique = true)
    private String correo;

    @Column(name = "contrasena", length = 255)
    private String contrasena;

    @Enumerated(EnumType.STRING)
    @Column(name = "rol")
    private Rol rol;

    @Column(name = "estado")
    private Boolean estado = true;

    // Modificamos el ENUM para que maneje el formato estándar de Spring Security
    public enum Rol {
        ROLE_ADMIN, 
        ROLE_TRANSPORTE, 
        ROLE_ALMACEN
    }
}