import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/index';
import Cards from './pages/Cards/index';
import ContactPage from './pages/ContactPage/index';
import Messages from './pages/Messages/index';
import Navbar from './components/Navbar/index';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/cards" element={<Cards />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
