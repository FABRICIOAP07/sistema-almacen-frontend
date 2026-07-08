import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Incidentes = () => {
    const [incidentes, setIncidentes] = useState([]);
    const [camiones, setCamiones] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const idUsuario = parseInt(localStorage.getItem('idUsuario') || 1);
    const [form, setForm] = useState({
        camion: { idCamion: '' },
        usuario: { idUsuario: idUsuario },
        tipo: 'accidente',
        descripcion: '',
        fecha: '',
        hora: '',
        estado: 'pendiente'
    });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        cargarIncidentes();
        cargarCamiones();
    }, []);

    const cargarIncidentes = async () => {
        const res = await api.get('/incidentes');
        setIncidentes(res.data);
    };

    const cargarCamiones = async () => {
        const res = await api.get('/camiones');
        setCamiones(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await api.put(`/incidentes/${editId}`, form);
        } else {
            await api.post('/incidentes', form);
        }
        setForm({ camion: { idCamion: '' }, usuario: { idUsuario: idUsuario }, tipo: 'accidente', descripcion: '', fecha: '', hora: '', estado: 'pendiente' });
        setEditId(null);
        setShowForm(false);
        cargarIncidentes();
    };

    const handleEdit = (i) => {
        setForm({ camion: { idCamion: i.camion.idCamion }, usuario: { idUsuario: i.usuario.idUsuario }, tipo: i.tipo, descripcion: i.descripcion, fecha: i.fecha, hora: i.hora, estado: i.estado });
        setEditId(i.idIncidente);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este incidente?')) {
            await api.delete(`/incidentes/${id}`);
            cargarIncidentes();
        }
    };

    const getEstadoColor = (estado) => {
        if (estado === 'pendiente') return '#ffc107';
        if (estado === 'en_proceso') return '#007bff';
        return '#28a745';
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Volver</button>
                <h2 style={styles.title}>🚨 Incidentes</h2>
                <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>+ Nuevo</button>
            </header>

            {showForm && (
                <div style={styles.form}>
                    <h3>{editId ? 'Editar Incidente' : 'Nuevo Incidente'}</h3>
                    <form onSubmit={handleSubmit}>
                        <select value={form.camion.idCamion}
                            onChange={(e) => setForm({ ...form, camion: { idCamion: parseInt(e.target.value) } })}
                            style={styles.input} required>
                            <option value="">Seleccionar camión</option>
                            {camiones.map((c) => (
                                <option key={c.idCamion} value={c.idCamion}>{c.placa} - {c.conductor}</option>
                            ))}
                        </select>
                        <select value={form.tipo}
                            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                            style={styles.input}>
                            <option value="accidente">Accidente</option>
                            <option value="averia">Avería</option>
                            <option value="retraso">Retraso</option>
                            <option value="perdida_producto">Pérdida de producto</option>
                            <option value="otro">Otro</option>
                        </select>
                        <textarea placeholder="Descripción" value={form.descripcion}
                            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                            style={{ ...styles.input, height: '80px' }} required />
                        <input type="date" value={form.fecha}
                            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                            style={styles.input} required />
                        <input type="time" value={form.hora}
                            onChange={(e) => setForm({ ...form, hora: e.target.value })}
                            style={styles.input} required />
                        <select value={form.estado}
                            onChange={(e) => setForm({ ...form, estado: e.target.value })}
                            style={styles.input}>
                            <option value="pendiente">Pendiente</option>
                            <option value="en_proceso">En proceso</option>
                            <option value="resuelto">Resuelto</option>
                        </select>
                        <div style={styles.formButtons}>
                            <button type="submit" style={styles.saveBtn}>Guardar</button>
                            <button type="button" onClick={() => setShowForm(false)} style={styles.cancelBtn}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            <table style={styles.table}>
                <thead>
                    <tr style={styles.thead}>
                        <th>ID</th>
                        <th>Camión</th>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {incidentes.map((i) => (
                        <tr key={i.idIncidente} style={styles.tr}>
                            <td>{i.idIncidente}</td>
                            <td>{i.camion?.placa}</td>
                            <td>{i.tipo}</td>
                            <td>{i.descripcion}</td>
                            <td>{i.fecha}</td>
                            <td>
                                <span style={{ ...styles.badge, backgroundColor: getEstadoColor(i.estado) }}>
                                    {i.estado}
                                </span>
                            </td>
                            <td>
                                <button onClick={() => handleEdit(i)} style={styles.editBtn}>✏️</button>
                                <button onClick={() => handleDelete(i.idIncidente)} style={styles.deleteBtn}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: { padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { color: '#c8102e', margin: 0 },
    backBtn: { backgroundColor: '#666', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' },
    addBtn: { backgroundColor: '#c8102e', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' },
    form: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    input: { display: 'block', width: '100%', padding: '10px', margin: '8px 0', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' },
    formButtons: { display: 'flex', gap: '10px', marginTop: '10px' },
    saveBtn: { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' },
    cancelBtn: { backgroundColor: '#666', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' },
    table: { width: '100%', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderCollapse: 'collapse' },
    thead: { backgroundColor: '#c8102e', color: 'white' },
    tr: { borderBottom: '1px solid #eee', textAlign: 'center' },
    badge: { color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' },
    editBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', marginRight: '5px' },
    deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' },
};

export default Incidentes;