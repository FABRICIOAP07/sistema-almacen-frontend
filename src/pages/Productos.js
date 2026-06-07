import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        codigo: '', nombre: '', descripcion: '',
        categoria: 'lacteos', unidadMedida: '',
        stockActual: 0, stockMinimo: 0, estado: true
    });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { cargarProductos(); }, []);

    const cargarProductos = async () => {
        const res = await api.get('/productos');
        setProductos(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await api.put(`/productos/${editId}`, form);
        } else {
            await api.post('/productos', form);
        }
        setForm({ codigo: '', nombre: '', descripcion: '', categoria: 'lacteos', unidadMedida: '', stockActual: 0, stockMinimo: 0, estado: true });
        setEditId(null);
        setShowForm(false);
        cargarProductos();
    };

    const handleEdit = (p) => {
        setForm({ codigo: p.codigo, nombre: p.nombre, descripcion: p.descripcion, categoria: p.categoria, unidadMedida: p.unidadMedida, stockActual: p.stockActual, stockMinimo: p.stockMinimo, estado: p.estado });
        setEditId(p.idProducto);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este producto?')) {
            await api.delete(`/productos/${id}`);
            cargarProductos();
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Volver</button>
                <h2 style={styles.title}>📦 Productos</h2>
                <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>+ Nuevo</button>
            </header>

            {showForm && (
                <div style={styles.form}>
                    <h3>{editId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Código" value={form.codigo}
                            onChange={(e) => setForm({ ...form, codigo: e.target.value })}
                            style={styles.input} required />
                        <input placeholder="Nombre" value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                            style={styles.input} required />
                        <input placeholder="Descripción" value={form.descripcion}
                            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                            style={styles.input} />
                        <select value={form.categoria}
                            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                            style={styles.input}>
                            <option value="lacteos">Lácteos</option>
                            <option value="jugos">Jugos</option>
                            <option value="conservas">Conservas</option>
                            <option value="otros">Otros</option>
                        </select>
                        <input placeholder="Unidad de medida" value={form.unidadMedida}
                            onChange={(e) => setForm({ ...form, unidadMedida: e.target.value })}
                            style={styles.input} required />
                        <input type="number" placeholder="Stock actual" value={form.stockActual}
                            onChange={(e) => setForm({ ...form, stockActual: parseInt(e.target.value) })}
                            style={styles.input} />
                        <input type="number" placeholder="Stock mínimo" value={form.stockMinimo}
                            onChange={(e) => setForm({ ...form, stockMinimo: parseInt(e.target.value) })}
                            style={styles.input} />
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
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Stock Mín.</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((p) => (
                        <tr key={p.idProducto} style={styles.tr}>
                            <td>{p.idProducto}</td>
                            <td>{p.codigo}</td>
                            <td>{p.nombre}</td>
                            <td>{p.categoria}</td>
                            <td>
                                <span style={{
                                    ...styles.badge,
                                    backgroundColor: p.stockActual <= p.stockMinimo ? '#dc3545' : '#28a745'
                                }}>
                                    {p.stockActual}
                                </span>
                            </td>
                            <td>{p.stockMinimo}</td>
                            <td>
                                <button onClick={() => handleEdit(p)} style={styles.editBtn}>✏️</button>
                                <button onClick={() => handleDelete(p.idProducto)} style={styles.deleteBtn}>🗑️</button>
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

export default Productos;