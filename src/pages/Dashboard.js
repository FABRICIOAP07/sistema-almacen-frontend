import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Lista completa de módulos de la aplicación
    const todosLosModulos = [
        { nombre: 'Camiones', icono: '🚛', ruta: '/camiones' },
        { nombre: 'Productos', icono: '📦', ruta: '/productos' },
        { nombre: 'Abastos', icono: '🏪', ruta: '/abastos' },
        { nombre: 'Incidentes', icono: '🚨', ruta: '/incidentes' },
        { nombre: 'Registro Camiones', icono: '📋', ruta: '/registro-camiones' },
        { nombre: 'Movimientos', icono: '🔄', ruta: '/movimientos' },
        { nombre: 'Reportes', icono: '📊', ruta: '/reportes' },
        { nombre: 'Usuarios', icono: '👥', ruta: '/usuarios' },
    ];

    // Filtramos los módulos que puede ver el usuario según su rol de la Base de Datos
    const modulosPermitidos = todosLosModulos.filter((modulo) => {
        const rol = user?.rol;

        // 1. El Administrador tiene acceso absoluto a todas las herramientas
        if (rol === 'ROLE_ADMIN') {
            return true;
        }

        // 2. El personal de transporte solo opera Camiones y sus Registros
        if (rol === 'ROLE_TRANSPORTE') {
            return modulo.nombre === 'Camiones' || modulo.nombre === 'Registro Camiones';
        }

        // 3. El personal de almacén maneja el stock físico, movimientos e incidentes
        if (rol === 'ROLE_ALMACEN') {
            return (
                modulo.nombre === 'Productos' ||
                modulo.nombre === 'Abastos' ||
                modulo.nombre === 'Incidentes' ||
                modulo.nombre === 'Movimientos'
            );
        }

        return false; // Por seguridad, si no tiene rol válido no ve nada
    });

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>🏭 Sistema de Almacén</h1>
                    <p style={styles.subtitle}>Distribuidora Gloria S.A.C</p>
                </div>
                <div style={styles.userInfo}>
                    {/* Mostramos el Rol limpio sin el prefijo "ROLE_" en la interfaz */}
                    <span>👤 {user?.nombre} ({user?.rol?.replace('ROLE_', '')})</span>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <main style={styles.main}>
                <h2 style={styles.welcomeText}>Bienvenido, {user?.nombre} 👋</h2>
                <div style={styles.grid}>
                    {modulosPermitidos.map((modulo) => (
                        <div
                            key={modulo.ruta}
                            style={styles.card}
                            onClick={() => navigate(modulo.ruta)}
                        >
                            <span style={styles.icono}>{modulo.icono}</span>
                            <span style={styles.cardNombre}>{modulo.nombre}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
    },
    header: {
        backgroundColor: '#c8102e',
        color: 'white',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '22px',
    },
    subtitle: {
        margin: 0,
        fontSize: '12px',
        opacity: 0.8,
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    logoutBtn: {
        backgroundColor: 'white',
        color: '#c8102e',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    main: {
        padding: '30px',
    },
    welcomeText: {
        color: '#333',
        marginBottom: '25px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
    },
    icono: {
        fontSize: '40px',
    },
    cardNombre: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
};

export default Dashboard;