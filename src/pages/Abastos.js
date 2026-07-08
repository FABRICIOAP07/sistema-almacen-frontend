import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Abastos = () => {
    const [abastos, setAbastos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        idEmpresa: '', placa: '', tipo: 'abarrote',
        modelo: 'contenedor', palletsCargados: 0,
        fecha: '', 
        usuario: { idUsuario: parseInt(localStorage.getItem('idUsuario') || 1) }, 
        estado: true
    });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { cargarAbastos(); }, []);

    const cargarAbastos = async () => {
        const res = await api.get('/abastos');
        setAbastos(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await api.put(`/abastos/${editId}`, form);
        } else {
            await api.post('/abastos', form);
        }
        setForm({ idEmpresa: '', placa: '', tipo: 'abarrote', modelo: 'contenedor', palletsCargados: 0, fecha: '', usuario: { idUsuario: 1 }, estado: true });
        setEditId(null);
        setShowForm(false);
        cargarAbastos();
    };

    const handleEdit = (a) => {
        setForm({ idEmpresa: a.idEmpresa, placa: a.placa, tipo: a.tipo, modelo: a.modelo, palletsCargados: a.palletsCargados, fecha: a.fecha, usuario: { idUsuario: a.usuario.idUsuario }, estado: a.estado });
        setEditId(a.idAbasto);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este abasto?')) {
            await api.delete(`/abastos/${id}`);
            cargarAbastos();
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Volver</button>
                <h2 style={styles.title}>🏪 Abastos</h2>
                <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>+ Nuevo</button>
            </header>

            {showForm && (
                <div style={styles.form}>
                    <h3>{editId ? 'Editar Abasto' : 'Nuevo Abasto'}</h3>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Empresa" value={form.idEmpresa}
                            onChange={(e) => setForm({ ...form, idEmpresa: e.target.value })}
                            style={styles.input} required />
                        <input placeholder="Placa" value={form.placa}
                            onChange={(e) => setForm({ ...form, placa: e.target.value })}
                            style={styles.input} required />
                        <select value={form.tipo}
                            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                            style={styles.input}>
                            <option value="abarrote">Abarrote</option>
                            <option value="frio">Frío</option>
                            <option value="agua">Agua</option>
                        </select>
                        <select value={form.modelo}
                            onChange={(e) => setForm({ ...form, modelo: e.target.value })}
                            style={styles.input}>
                            <option value="contenedor">Contenedor</option>
                            <option value="plancha">Plancha</option>
                        </select>
                        <input type="number" placeholder="Pallets cargados" value={form.palletsCargados}
                            onChange={(e) => setForm({ ...form, palletsCargados: parseInt(e.target.value) })}
                            style={styles.input} />
                        <input type="date" value={form.fecha}
                            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                            style={styles.input} required />
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
                        <th>Empresa</th>
                        <th>Placa</th>
                        <th>Tipo</th>
                        <th>Modelo</th>
                        <th>Pallets</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {abastos.map((a) => (
                        <tr key={a.idAbasto} style={styles.tr}>
                            <td>{a.idAbasto}</td>
                            <td>{a.idEmpresa}</td>
                            <td>{a.placa}</td>
                            <td>{a.tipo}</td>
                            <td>{a.modelo}</td>
                            <td>{a.palletsCargados}</td>
                            <td>{a.fecha}</td>
                            <td>
                                <button onClick={() => handleEdit(a)} style={styles.editBtn}>✏️</button>
                                <button onClick={() => handleDelete(a.idAbasto)} style={styles.deleteBtn}>🗑️</button>
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
    editBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', marginRight: '5px' },
    deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' },
};

export default Abastos;