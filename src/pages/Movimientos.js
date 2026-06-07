import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Movimientos = () => {
    const [movimientos, setMovimientos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [camiones, setCamiones] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        producto: { idProducto: '' },
        usuario: { idUsuario: 1 },
        camion: { idCamion: '' },
        tipoMovimiento: 'entrada',
        cantidad: 0,
        fecha: '',
        hora: '',
        observaciones: ''
    });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        cargarMovimientos();
        cargarProductos();
        cargarCamiones();
    }, []);

    const cargarMovimientos = async () => {
        const res = await api.get('/movimientos');
        setMovimientos(res.data);
    };

    const cargarProductos = async () => {
        const res = await api.get('/productos');
        setProductos(res.data);
    };

    const cargarCamiones = async () => {
        const res = await api.get('/camiones');
        setCamiones(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await api.put(`/movimientos/${editId}`, form);
        } else {
            await api.post('/movimientos', form);
        }
        setForm({ producto: { idProducto: '' }, usuario: { idUsuario: 1 }, camion: { idCamion: '' }, tipoMovimiento: 'entrada', cantidad: 0, fecha: '', hora: '', observaciones: '' });
        setEditId(null);
        setShowForm(false);
        cargarMovimientos();
    };

    const handleEdit = (m) => {
        setForm({ producto: { idProducto: m.producto.idProducto }, usuario: { idUsuario: m.usuario.idUsuario }, camion: { idCamion: m.camion?.idCamion }, tipoMovimiento: m.tipoMovimiento, cantidad: m.cantidad, fecha: m.fecha, hora: m.hora, observaciones: m.observaciones });
        setEditId(m.idMovimiento);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este movimiento?')) {
            await api.delete(`/movimientos/${id}`);
            cargarMovimientos();
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Volver</button>
                <h2 style={styles.title}>🔄 Movimientos de Productos</h2>
                <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>+ Nuevo</button>
            </header>

            {showForm && (
                <div style={styles.form}>
                    <h3>{editId ? 'Editar Movimiento' : 'Nuevo Movimiento'}</h3>
                    <form onSubmit={handleSubmit}>
                        <select value={form.producto.idProducto}
                            onChange={(e) => setForm({ ...form, producto: { idProducto: parseInt(e.target.value) } })}
                            style={styles.input} required>
                            <option value="">Seleccionar producto</option>
                            {productos.map((p) => (
                                <option key={p.idProducto} value={p.idProducto}>{p.codigo} - {p.nombre}</option>
                            ))}
                        </select>
                        <select value={form.camion.idCamion}
                            onChange={(e) => setForm({ ...form, camion: { idCamion: parseInt(e.target.value) } })}
                            style={styles.input}>
                            <option value="">Seleccionar camión (opcional)</option>
                            {camiones.map((c) => (
                                <option key={c.idCamion} value={c.idCamion}>{c.placa} - {c.conductor}</option>
                            ))}
                        </select>
                        <select value={form.tipoMovimiento}
                            onChange={(e) => setForm({ ...form, tipoMovimiento: e.target.value })}
                            style={styles.input}>
                            <option value="entrada">Entrada</option>
                            <option value="salida">Salida</option>
                        </select>
                        <input type="number" placeholder="Cantidad" value={form.cantidad}
                            onChange={(e) => setForm({ ...form, cantidad: parseInt(e.target.value) })}
                            style={styles.input} required />
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
                        <th>Producto</th>
                        <th>Camión</th>
                        <th>Movimiento</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {movimientos.map((m) => (
                        <tr key={m.idMovimiento} style={styles.tr}>
                            <td>{m.idMovimiento}</td>
                            <td>{m.producto?.nombre}</td>
                            <td>{m.camion?.placa || '-'}</td>
                            <td>
                                <span style={{
                                    ...styles.badge,
                                    backgroundColor: m.tipoMovimiento === 'entrada' ? '#28a745' : '#dc3545'
                                }}>
                                    {m.tipoMovimiento}
                                </span>
                            </td>
                            <td>{m.cantidad}</td>
                            <td>{m.fecha}</td>
                            <td>
                                <button onClick={() => handleEdit(m)} style={styles.editBtn}>✏️</button>
                                <button onClick={() => handleDelete(m.idMovimiento)} style={styles.deleteBtn}>🗑️</button>
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

export default Movimientos;