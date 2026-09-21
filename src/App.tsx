import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { LandingPage } from './pages/LandingPage';
import { PostfixPage } from './pages/PostfixPage';
import { InfixPage } from './pages/InfixPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/postfix" element={<PostfixPage />} />
          <Route path="/infix" element={<InfixPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
