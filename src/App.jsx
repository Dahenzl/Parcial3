import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/table/";
import Formulario from "./components/formulario/";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/create" element={<Formulario />} />
        <Route path="/person/:id" element={<Formulario />} />
        <Route path="/edit/:id" element={<Formulario />} />
      </Routes>
    </BrowserRouter>
  );
};
