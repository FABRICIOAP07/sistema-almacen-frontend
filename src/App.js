import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Camiones from './pages/Camiones';
import Productos from './pages/Productos';
import Incidentes from './pages/Incidentes';
import Usuarios from './pages/Usuarios';
import Abastos from './pages/Abastos';
import Reportes from './pages/Reportes';
import RegistroCamiones from './pages/RegistroCamiones';
import Movimientos from './pages/Movimientos';
import SeleccionRol from './pages/SeleccionRol'; // Importamos tu nueva vista
import RegistroEmpleado from './pages/RegistroEmpleado';

// Si no hay usuario, lo redirigimos a la pantalla de /login
function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* 1. Portal de bienvenida y filtro visual previo */}
                    <Route path="/" element={<SeleccionRol />} />

                    {/* 2. El formulario de inicio de sesión */}
                    <Route path="/login" element={<Login />} />
                    {/* 3. El formulario de registro para nuevos empleados */}
                    <Route path="/registro-empleado" element={<RegistroEmpleado />} />

                    {/* Rutas Privadas Protegidas */}
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/movimientos" element={
                        <PrivateRoute>
                            <Movimientos />
                        </PrivateRoute>
                    } />
                    <Route path="/registro-camiones" element={
                        <PrivateRoute>
                            <RegistroCamiones />
                        </PrivateRoute>
                    } />
                    <Route path="/reportes" element={
                        <PrivateRoute>
                            <Reportes />
                        </PrivateRoute>
                    } />
                    <Route path="/abastos" element={
                        <PrivateRoute>
                            <Abastos />
                        </PrivateRoute>
                    } />
                    <Route path="/usuarios" element={
                        <PrivateRoute>
                            <Usuarios />
                        </PrivateRoute>
                    } />
                    <Route path="/productos" element={
                        <PrivateRoute>
                            <Productos />
                        </PrivateRoute>
                    } />
                    <Route path="/incidentes" element={
                        <PrivateRoute>
                            <Incidentes />
                        </PrivateRoute>
                    } />
                    <Route path="/camiones" element={
                        <PrivateRoute>
                            <Camiones />
                        </PrivateRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;