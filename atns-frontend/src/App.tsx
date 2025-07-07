import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './pages/Register/Register';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/register" element={<Register/>}/>
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
