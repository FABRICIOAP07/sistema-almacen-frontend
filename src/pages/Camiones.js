import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Camiones = () => {
    const [camiones, setCamiones] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ placa: '', tipo: 'multi', conductor: '', estado: 'activo' });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        cargarCamiones();
    }, []);

    const cargarCamiones = async () => {
        const res = await api.get('/camiones');
        setCamiones(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await api.put(`/camiones/${editId}`, form);
        } else {
            await api.post('/camiones', form);
        }
        setForm({ placa: '', tipo: 'multi', conductor: '', estado: 'activo' });
        setEditId(null);
        setShowForm(false);
        cargarCamiones();
    };

    const handleEdit = (camion) => {
        setForm({ placa: camion.placa, tipo: camion.tipo, conductor: camion.conductor, estado: camion.estado });
        setEditId(camion.idCamion);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este camión?')) {
            await api.delete(`/camiones/${id}`);
            cargarCamiones();
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Volver</button>
                <h2 style={styles.title}>🚛 Camiones</h2>
                <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>+ Nuevo</button>
            </header>

            {showForm && (
                <div style={styles.form}>
                    <h3>{editId ? 'Editar Camión' : 'Nuevo Camión'}</h3>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Placa" value={form.placa}
                            onChange={(e) => setForm({ ...form, placa: e.target.value })}
                            style={styles.input} required />
                        <select value={form.tipo}
                            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                            style={styles.input}>
                            <option value="multi">Multi</option>
                            <option value="abarrote">Abarrote</option>
                            <option value="frio">Frío</option>
                        </select>
                        <input placeholder="Conductor" value={form.conductor}
                            onChange={(e) => setForm({ ...form, conductor: e.target.value })}
                            style={styles.input} required />
                        <select value={form.estado}
                            onChange={(e) => setForm({ ...form, estado: e.target.value })}
                            style={styles.input}>
                            <option value="activo">Activo</option>
                            <option value="mantenimiento">Mantenimiento</option>
                            <option value="inactivo">Inactivo</option>
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
                        <th>Placa</th>
                        <th>Tipo</th>
                        <th>Conductor</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {camiones.map((c) => (
                        <tr key={c.idCamion} style={styles.tr}>
                            <td>{c.idCamion}</td>
                            <td>{c.placa}</td>
                            <td>{c.tipo}</td>
                            <td>{c.conductor}</td>
                            <td>
                                <span style={{
                                    ...styles.badge,
                                    backgroundColor: c.estado === 'activo' ? '#28a745' : c.estado === 'mantenimiento' ? '#ffc107' : '#dc3545'
                                }}>
                                    {c.estado}
                                </span>
                            </td>
                            <td>
                                <button onClick={() => handleEdit(c)} style={styles.editBtn}>✏️</button>
                                <button onClick={() => handleDelete(c.idCamion)} style={styles.deleteBtn}>🗑️</button>
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

export default Camiones;