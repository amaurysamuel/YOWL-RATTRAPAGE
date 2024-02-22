import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register'; // Importer Register avec un chemin relatif
import Login from './Login'; // Importer Login avec un chemin relatif


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Home" element={<Register />} />
                {/* Ajoutez d'autres routes si nécessaire */}
            </Routes>
        </Router>
    );
};

export default App;
