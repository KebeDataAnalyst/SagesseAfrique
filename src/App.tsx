import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Quotes from './pages/Quotes';
import Heroes from './pages/Heroes';
import History from './pages/History';
import More from './pages/More';

export default function App() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/heroes" element={<Heroes />} />
          <Route path="/history" element={<History />} />
          <Route path="/more" element={<More />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
