import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Compare from './pages/Compare';
import Home from './pages/Home';
import { Box } from '@mui/material';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { registerGlobalLoadingSetter } from './context/LoadingHandler';
import Spinner from './components/Spinner';

function GlobalLoadingManager() {
  const { setLoading } = useLoading()

  useEffect(() => {
    registerGlobalLoadingSetter(setLoading)
  }, [])

  return null
}

function App() {
  return (
    <LoadingProvider>
      <GlobalLoadingManager />
      <Spinner />
      <MainApp />
    </LoadingProvider>
  );
}

function MainApp() {
  return (
    <Box style={{
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      boxSizing: 'border-box',
    }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
