import './App.css';
import Navbar from './Navbar.js';
import Register from './pages/Register.js';
import VoterHome from './pages/VoterHome.js';
import AdminHome from './pages/AdminHome.js';

function App() {
  return (
    <div className="App">
        <Navbar />
        <AdminHome />
    </div>
  );
}

export default App;
