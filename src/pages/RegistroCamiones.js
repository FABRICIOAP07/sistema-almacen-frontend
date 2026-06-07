import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegistroCamiones = () => {
    const [registros, setRegistros] = useState([]);
    const [camiones, setCamiones] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        camion: { idCamion: '' },
        usuario: { idUsuario: 1 },
        tipoMovimiento: 'salida',
        fecha: '',
        hora: '',
        observaciones: ''
    });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        cargarRegistros();
        cargarCamiones();
    }, []);

    const cargarRegistros = async () => {
        const res = await api.get('/registro-camiones');
        setRegistros(res.data);
    };

    const cargarCamiones = async () => {
        const res = await api.get('/camiones');
        setCamiones(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await api.put(`/registro-camiones/${editId}`, form);
        } else {
            await api.post('/registro-camiones', form);
        }
        setForm({ camion: { idCamion: '' }, usuario: { idUsuario: 1 }, tipoMovimiento: 'salida', fecha: '', hora: '', observaciones: '' });
        setEditId(null);
        setShowForm(false);
        cargarRegistros();
    };

    const handleEdit = (r) => {
        setForm({ camion: { idCamion: r.camion.idCamion }, usuario: { idUsuario: r.usuario.idUsuario }, tipoMovimiento: r.tipoMovimiento, fecha: r.fecha, hora: r.hora, observaciones: r.observaciones });
        setEditId(r.idRegistro);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este registro?')) {
            await api.delete(`/registro-camiones/${id}`);
            cargarRegistros();
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Volver</button>
                <h2 style={styles.title}>📋 Registro de Camiones</h2>
                <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>+ Nuevo</button>
            </header>

            {showForm && (
                <div style={styles.form}>
                    <h3>{editId ? 'Editar Registro' : 'Nuevo Registro'}</h3>
                    <form onSubmit={handleSubmit}>
                        <select value={form.camion.idCamion}
                            onChange={(e) => setForm({ ...form, camion: { idCamion: parseInt(e.target.value) } })}
                            style={styles.input} required>
                            <option value="">Seleccionar camión</option>
                            {camiones.map((c) => (
                                <option key={c.idCamion} value={c.idCamion}>{c.placa} - {c.conductor}</option>
                            ))}
                        </select>
                        <select value={form.tipoMovimiento}
                            onChange={(e) => setForm({ ...form, tipoMovimiento: e.target.value })}
                            style={styles.input}>
                            <option value="salida">Salida</option>
                            <option value="entrada">Entrada</option>
                        </select>
                        <input type="date" value={form.fecha}
                            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                            style={styles.input} required />
                        <input type="time" value={form.hora}
                            onChange={(e) => setForm({ ...form, hora: e.target.value })}
                            style={styles.input} required />
                        <textarea placeholder="Observaciones" value={form.observaciones}
                            onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
                            style={{ ...styles.input, height: '80px' }} />
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
                        <th>Movimiento</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Observaciones</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((r) => (
                        <tr key={r.idRegistro} style={styles.tr}>
                            <td>{r.idRegistro}</td>
                            <td>{r.camion?.placa}</td>
                            <td>
                                <span style={{
                                    ...styles.badge,
                                    backgroundColor: r.tipoMovimiento === 'salida' ? '#dc3545' : '#28a745'
                                }}>
                                    {r.tipoMovimiento}
                                </span>
                            </td>
                            <td>{r.fecha}</td>
                            <td>{r.hora}</td>
                            <td>{r.observaciones}</td>
                            <td>
                                <button onClick={() => handleEdit(r)} style={styles.editBtn}>✏️</button>
                                <button onClick={() => handleDelete(r.idRegistro)} style={styles.deleteBtn}>🗑️</button>
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

export default RegistroCamiones;