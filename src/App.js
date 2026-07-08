import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Footer from './components/Footer';

// Tus páginas (Descomenta las que uses para quitar los warnings)
import SeleccionRol from './pages/SeleccionRol';
import Login from './pages/Login';
import RegistroEmpleado from './pages/RegistroEmpleado';
import Dashboard from './pages/Dashboard';
import Incidentes from './pages/Incidentes';
import Productos from './pages/Productos';
import Movimientos from './pages/Movimientos';
import Camiones from './pages/Camiones';
import Usuarios from './pages/Usuarios';
import Abastos from './pages/Abastos';
import Reportes from './pages/Reportes';
import RegistroCamiones from './pages/RegistroCamiones';

// Componente para proteger rutas privadas
function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                {/* Contenedor Flexbox global para asegurar el orden */}
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    
                    {/* El contenido de las páginas ocupará todo el espacio disponible */}
                    <div style={{ flex: 1 }}>
                        <Routes>
                            {/* 1. Portal de bienvenida y filtro visual previo */}
                            <Route path="/" element={<SeleccionRol />} />

                            {/* 2. El formulario de inicio de sesión */}
                            <Route path="/login" element={<Login />} />

                            {/* 3. El formulario de registro para nuevos empleados */}
                            <Route path="/registro-empleado" element={<RegistroEmpleado />} />

                            {/* Rutas Privadas Protegidas */}
                            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                            <Route path="/incidentes" element={<PrivateRoute><Incidentes /></PrivateRoute>} />
                            <Route path="/productos" element={<PrivateRoute><Productos /></PrivateRoute>} />
                            <Route path="/movimientos" element={<PrivateRoute><Movimientos /></PrivateRoute>} />
                            <Route path="/camiones" element={<PrivateRoute><Camiones /></PrivateRoute>} />
                            <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
                            <Route path="/abastos" element={<PrivateRoute><Abastos /></PrivateRoute>} />
                            <Route path="/reportes" element={<PrivateRoute><Reportes /></PrivateRoute>} />
                            <Route path="/registro-camiones" element={<PrivateRoute><RegistroCamiones /></PrivateRoute>} />
                        </Routes>
                    </div>

                    {/* El Footer se renderiza al final de todo, dentro del BrowserRouter */}
                    <Footer />

                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;