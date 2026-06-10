import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Reportes = () => {
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const descargarExcel = async (tipo) => {
    setCargando(true);
    try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        console.log('URL:', `http://localhost:8080/api/excel/${tipo}`);
        
        const response = await fetch(`http://localhost:8080/api/excel/${tipo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        
        console.log('Status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${tipo}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error completo:', error);
        alert(`Error: ${error.message}`);
    }
    setCargando(false);
};

    const reportes = [
        { titulo: 'Reporte de Camiones', icono: '🚛', tipo: 'camiones', descripcion: 'Lista completa de camiones registrados' },
        { titulo: 'Reporte de Productos', icono: '📦', tipo: 'productos', descripcion: 'Inventario actual de productos' },
        { titulo: 'Reporte de Incidentes', icono: '🚨', tipo: 'incidentes', descripcion: 'Historial de incidentes reportados' },
    ];

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Volver</button>
                <h2 style={styles.title}>📊 Reportes</h2>
                <div></div>
            </header>

            <div style={styles.grid}>
                {reportes.map((r) => (
                    <div key={r.tipo} style={styles.card}>
                        <span style={styles.icono}>{r.icono}</span>
                        <h3 style={styles.cardTitle}>{r.titulo}</h3>
                        <p style={styles.cardDesc}>{r.descripcion}</p>
                        <button
                            onClick={() => descargarExcel(r.tipo)}
                            style={styles.downloadBtn}
                            disabled={cargando}>
                            {cargando ? 'Descargando...' : '⬇️ Descargar Excel'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    title: { color: '#c8102e', margin: 0 },
    backBtn: { backgroundColor: '#666', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
    card: { backgroundColor: 'white', borderRadius: '10px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' },
    icono: { fontSize: '50px' },
    cardTitle: { color: '#333', margin: '15px 0 5px' },
    cardDesc: { color: '#666', fontSize: '14px', marginBottom: '20px' },
    downloadBtn: { backgroundColor: '#c8102e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', width: '100%' },
};

export default Reportes;