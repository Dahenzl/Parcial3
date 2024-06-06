import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./formulario.css";
import { useEffect, useState } from "react";

const Formulario = () => {
  const navigate = useNavigate();

  const params = useParams();
  const location = useLocation();

  const [op, setOp] = useState(undefined);
  const [title, setTitle] = useState("Crear Persona");
  const [person, setPerson] = useState({
    name: "",
    cel: "",
    email: "",
  });

  const ejecutar = async (event) => {
    event.preventDefault();

    if (op === undefined) {
      create(event);
    } else {
      edit(event);
    }
  };

  const edit = async (event) => {
    const id = params.id;

    const { name, cel, email } = event.target;

    const person = {
      name: name.value,
      cel: cel.value,
      email: email.value,
    };

    const peticion = await fetch(`http://localhost:3000/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { ok } = await peticion.json();

    if (ok) return navigate("/");

    alert("Error en el servidor");
  };

  const create = async (event) => {
    const { name, cel, email } = event.target;

    const person = {
      name: name.value,
      cel: cel.value,
      email: email.value,
    };

    const peticion = await fetch("http://localhost:3000/create", {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { ok } = await peticion.json();

    if (ok) return navigate("/");

    alert("Error en el servidor");
  };

  const buscar_person = async (id) => {
    const peticion = await fetch(`http://localhost:3000/getbyid/${id}`);
    const { ok, personas } = await peticion.json();

    if (ok) {
      const person = personas[0];

      return setPerson(person);
    }

    alert("Error buscando buscando a la persona");
  };

  useEffect(() => {
    const id = params.id;

    if (id) {
      if (location.pathname.includes("person")) {
        setOp(true);
        setTitle("Ver Persona");
        buscar_person(id);
      } else {
        setOp(false);
        setTitle("Editar Persona");
        buscar_person(id);
      }
    }
  }, [params, location]);

  return (
    <section className="form-container">
      <h2>{title}</h2>
      <form onSubmit={ejecutar}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          {op ? (
            <input
              type="text"
              id="name"
              name="nombre"
              defaultValue={person.name}
              required
              readOnly
            />
          ) : (
            <input
              type="text"
              id="name"
              name="nombre"
              defaultValue={person.name}
              required
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="celular">Celular:</label>
          {op ? (
            <input
              type="tel"
              id="cel"
              name="celular"
              defaultValue={person.cel}
              required
              readOnly
            />
          ) : (
            <input
              type="tel"
              id="cel"
              name="celular"
              defaultValue={person.cel}
              required
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          {op ? (
            <input
              type="email"
              id="email"
              name="correo"
              defaultValue={person.email}
              required
              readOnly
            />
          ) : (
            <input
              type="email"
              id="email"
              name="correo"
              defaultValue={person.email}
              required
            />
          )}
        </div>
        <div className="button-group">
          {!op && (
            <button type="submit" className="save-button">
              Guardar
            </button>
          )}
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/")}
          >
            Regresar
          </button>
        </div>
      </form>
    </section>
  );
};

export default Formulario;
