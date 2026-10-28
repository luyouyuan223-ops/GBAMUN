import { LanguageProvider } from './i18n/LanguageContext';
import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './styles/index.css';

const ProjectDetail = lazy(() => import(/* webpackChunkName: "project-detail" */ './pages/ProjectDetail'));

function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:projectId" element={<Suspense fallback={<p role="status" style={{padding:40}}>加载中 / Loading…</p>}><ProjectDetail /></Suspense>} />
        </Routes>
      </HashRouter>
    </LanguageProvider>
  );
}

export default App;
