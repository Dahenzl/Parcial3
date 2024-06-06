import { useState, useEffect } from "react";
import "./table.css";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [personas, setPersonas] = useState([])

  const navigate = useNavigate()

  const get_all_personas = async () => {
    const peticion = await fetch("http://localhost:3000/students");
    const data = await peticion.json();
    console.log(data);

    setPersonas(data);
  };

  useEffect(() => {
    get_all_personas();
  }, []);

  const editar_person = (id) => {
    navigate(`/edit/${id}`)
  }


  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Índice</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{persona._id}</td>
              <td>{persona.name}</td>
              <td>{persona.age}</td>
              <td>
                <button onClick={ () => editar_person(id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
