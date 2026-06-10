import { useNavigate } from 'react-router-dom';

const SeleccionRol = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <div style={styles.cardWrapper}>
                <h1 style={styles.title}> Sistema de Almacén</h1>
                <h3 style={styles.subtitle}>Distribuidora Gloria S.A.C</h3>
                <p style={styles.instruction}>Por favor, seleccione su portal de acceso:</p>

                <div style={styles.grid}>
                    {/* Tarjeta para Administradores */}
                    <div style={styles.cardAdmin} onClick={() => navigate('/login')}>
                        <span style={styles.icon}></span>
                        <h2 style={styles.cardTitle}>Portal Administrativo</h2>
                        <p style={styles.cardDesc}>Gestión de usuarios, auditorías y reportes generales.</p>
                    </div>

                    {/* Tarjeta para Empleados (Almacén y Transporte) */}
                    <div style={styles.cardEmpleado} onClick={() => navigate('/login')}>
                        <span style={styles.icon}></span>
                        <h2 style={styles.cardTitle}>Operaciones de Almacén</h2>
                        <p style={styles.cardDesc}>Control de camiones, inventario, abastos e incidentes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        fontFamily: 'Arial, sans-serif'
    },
    cardWrapper: {
        textAlign: 'center',
        maxWidth: '800px',
        padding: '20px'
    },
    title: { color: '#c8102e', fontSize: '32px', margin: '0 0 5px 0' },
    subtitle: { color: '#555', fontSize: '18px', fontWeight: 'normal', margin: '0 0 30px 0' },
    instruction: { color: '#666', fontSize: '16px', marginBottom: '20px' },
    grid: {
        display: 'flex',
        gap: '25px',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    cardAdmin: {
        backgroundColor: 'white',
        borderTop: '5px solid #c8102e',
        borderRadius: '10px',
        padding: '40px 25px',
        width: '260px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, boxShadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    cardEmpleado: {
        backgroundColor: 'white',
        borderTop: '5px solid #0056b3',
        borderRadius: '10px',
        padding: '40px 25px',
        width: '260px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, boxShadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icon: { fontSize: '50px', marginBottom: '15px' },
    cardTitle: { fontSize: '20px', color: '#333', margin: '0 0 10px 0' },
    cardDesc: { fontSize: '14px', color: '#666', margin: 0, lineHeight: '1.4', textAlign: 'center' }
};

export default SeleccionRol;