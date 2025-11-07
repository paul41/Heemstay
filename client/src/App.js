import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
          <main style={{ minHeight: "80vh" }}>
            <AppRoutes />
          </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
export default App;
