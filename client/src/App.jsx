import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewCars from "./pages/ViewCars";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<ViewCars />} />
    </Routes>
  );
}

export default App;
