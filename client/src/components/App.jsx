import Login from './Login';
import Register from './Register';
import MapContainer from './Map/MapContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const email = "rishigupta280594@gmail.com"; 
  return (
    <div style={{ marginTop: '0rem' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<MapContainer email={email} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;