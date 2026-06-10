import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegistroEmpleado = () => {
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: '',
        rol: 'ROLE_ALMACEN', // Rol inicial por defecto para nuevos empleados
        estado: true
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviamos los datos al endpoint de usuarios de tu Backend
            await api.post('/usuarios', form);
            alert('¡Registro exitoso! Ya puedes iniciar sesión con tu nueva cuenta.');
            navigate('/login'); // Lo mandamos al login para que pruebe su cuenta
        } catch (err) {
            setError('Error al registrarse. El correo ya podría estar en uso.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>📝 Registro de Personal</h2>
                <h3 style={styles.subtitle}>Distribuidora Gloria S.A.C</h3>
                
                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label>Nombre</label>
                        <input type="text" style={styles.input} placeholder="Juan" required
                            value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} />
                    </div>

                    <div style={styles.field}>
                        <label>Apellido</label>
                        <input type="text" style={styles.input} placeholder="Pérez" required
                            value={form.apellido} onChange={(e) => setForm({...form, apellido: e.target.value})} />
                    </div>

                    <div style={styles.field}>
                        <label>Correo Electrónico</label>
                        <input type="email" style={styles.input} placeholder="juan.perez@gmail.com" required
                            value={form.correo} onChange={(e) => setForm({...form, correo: e.target.value})} />
                    </div>

                    <div style={styles.field}>
                        <label>Contraseña</label>
                        <input type="password" style={styles.input} placeholder="Crea una contraseña" required
                            value={form.contrasena} onChange={(e) => setForm({...form, contrasena: e.target.value})} />
                    </div>

                    <div style={styles.field}>
                        <label>Área de Trabajo / Rol</label>
                        <select style={styles.input} value={form.rol} 
                            onChange={(e) => setForm({...form, rol: e.target.value})}>
                            <option value="ROLE_ALMACEN">📦 Personal de Almacén</option>
                            <option value="ROLE_TRANSPORTE">Grid 🚛 Personal de Transporte</option>
                        </select>
                    </div>

                    <button type="submit" style={styles.button}>Registrarme e Iniciar Sesión</button>
                </form>

                <button onClick={() => navigate('/login')} style={styles.backButton}>
                    Volver al Login
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' },
    card: { backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: '400px' },
    title: { textAlign: 'center', color: '#c8102e', marginBottom: '5px', margin: 0 },
    subtitle: { textAlign: 'center', color: '#666', marginBottom: '20px', fontWeight: 'normal', fontSize: '14px', margin: 0 },
    field: { marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '5px' },
    input: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px' },
    button: { width: '100%', padding: '12px', backgroundColor: '#c8102e', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' },
    backButton: { width: '100%', padding: '10px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '5px', fontSize: '14px', cursor: 'pointer', marginTop: '10px' },
    error: { color: 'red', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }
};

export default RegistroEmpleado;