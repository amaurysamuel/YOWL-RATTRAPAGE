// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register'; // Importer Register avec un chemin relatif
import Login from './Login'; // Importer Login avec un chemin relatif
import Home from './Home'; // Importer Home avec un chemin relatif
import Header from './Header'; // Importer Header avec un chemin relatif

const App = () => {
    return (
        <Router>
            <Header /> {/* Inclure le composant Header */}
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/counter" element={<counter />} />
                {/* Ajoutez d'autres routes si nécessaire */}
            </Routes>
        </Router>
    );
};

export default App;
