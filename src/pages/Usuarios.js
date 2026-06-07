import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        nombre: '', apellido: '', correo: '',
        contrasena: '', rol: 'almacen', estado: true
    });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { cargarUsuarios(); }, []);

    const cargarUsuarios = async () => {
        const res = await api.get('/usuarios');
        setUsuarios(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await api.put(`/usuarios/${editId}`, form);
        } else {
            await api.post('/usuarios', form);
        }
        setForm({ nombre: '', apellido: '', correo: '', contrasena: '', rol: 'almacen', estado: true });
        setEditId(null);
        setShowForm(false);
        cargarUsuarios();
    };

    const handleEdit = (u) => {
        setForm({ nombre: u.nombre, apellido: u.apellido, correo: u.correo, contrasena: '', rol: u.rol, estado: u.estado });
        setEditId(u.idUsuario);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este usuario?')) {
            await api.delete(`/usuarios/${id}`);
            cargarUsuarios();
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Volver</button>
                <h2 style={styles.title}>👥 Usuarios</h2>
                <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>+ Nuevo</button>
            </header>

            {showForm && (
                <div style={styles.form}>
                    <h3>{editId ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Nombre" value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                            style={styles.input} required />
                        <input placeholder="Apellido" value={form.apellido}
                            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                            style={styles.input} required />
                        <input type="email" placeholder="Correo" value={form.correo}
                            onChange={(e) => setForm({ ...form, correo: e.target.value })}
                            style={styles.input} required />
                        <input type="password" placeholder="Contraseña" value={form.contrasena}
                            onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
                            style={styles.input} required />
                        <select value={form.rol}
                            onChange={(e) => setForm({ ...form, rol: e.target.value })}
                            style={styles.input}>
                            <option value="admin">Admin</option>
                            <option value="transporte">Transporte</option>
                            <option value="almacen">Almacén</option>
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
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.idUsuario} style={styles.tr}>
                            <td>{u.idUsuario}</td>
                            <td>{u.nombre}</td>
                            <td>{u.apellido}</td>
                            <td>{u.correo}</td>
                            <td>
                                <span style={{
                                    ...styles.badge,
                                    backgroundColor: u.rol === 'admin' ? '#c8102e' : u.rol === 'transporte' ? '#007bff' : '#28a745'
                                }}>
                                    {u.rol}
                                </span>
                            </td>
                            <td>{u.estado ? '✅' : '❌'}</td>
                            <td>
                                <button onClick={() => handleEdit(u)} style={styles.editBtn}>✏️</button>
                                <button onClick={() => handleDelete(u.idUsuario)} style={styles.deleteBtn}>🗑️</button>
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

export default Usuarios;