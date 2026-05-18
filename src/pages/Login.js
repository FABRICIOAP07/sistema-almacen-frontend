import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { correo, contrasena });
            login(response.data);
            navigate('/dashboard');
        } catch (err) {
            setError('Correo o contraseña incorrectos');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🏭 Sistema de Almacén</h2>
                <h3 style={styles.subtitle}>Distribuidora Gloria S.A.C</h3>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label>Correo</label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            style={styles.input}
                            placeholder="correo@gmail.com"
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            style={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: '380px',
    },
    title: {
        textAlign: 'center',
        color: '#c8102e',
        marginBottom: '5px',
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        marginBottom: '25px',
        fontWeight: 'normal',
        fontSize: '14px',
    },
    field: {
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '14px',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#c8102e',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '10px',
    },
};

export default Login;