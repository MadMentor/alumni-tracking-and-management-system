import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './pages/Register/Register';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Analytics} from "@vercel/analytics/react"
import {SpeedInsights} from "@vercel/speed-insights/react"

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
                <Footer/>
            </Router>
            <Analytics/>
            <SpeedInsights/>
        </>
    );
};

export default App;
