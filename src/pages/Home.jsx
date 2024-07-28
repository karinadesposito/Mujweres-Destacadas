import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useAuth } from "../components/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [newCard, setNewCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, handleLogout } = useAuth();
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMujeres = async () => {
      try {
        const response = await fetch(
          "https://66a438eb44aa63704583965c.mockapi.io/api/mujeres/mujeres"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchMujeres();
  }, []);

  const handleSave = async (id, editedData) => {
    if (id === null) {
      // Nuevo registro
      try {
        const response = await fetch(
          "https://66a438eb44aa63704583965c.mockapi.io/api/mujeres/mujeres",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create new record");
        }

        const newCard = await response.json();
        setData([...data, newCard]);

        Swal.fire({
          title: "Información agregada con éxito",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error creating record:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al guardar el nuevo registro",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      // Editar registro existente
      const updatedData = data.map((mujer) =>
        mujer.id === id ? { ...mujer, ...editedData } : mujer
      );
      setData(updatedData);

      Swal.fire({
        title: "Información actualizada con éxito",
        icon: "success",
        confirmButtonText: "OK",
      });
    }

    setNewCard(null); // Restablecer el estado de la nueva card
  };

  const handleAddNew = () => {
    setNewCard({
      id: null,
      name: "",
      lastName: "",
      nationality: "",
      bio: "",
      photo: "",
    });
  };

  const handleCancel = () => {
    setNewCard(null);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      html: "<span class='custom-swal-title'>¿Está seguro de eliminar el registro?</span>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deseo eliminarlo",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://66a438eb44aa63704583965c.mockapi.io/api/mujeres/mujeres/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the record");
        }

        const updatedData = data.filter((mujer) => mujer.id !== id);
        setData(updatedData);

        Swal.fire({
          title: "Eliminado",
          text: "El registro ha sido eliminado con éxito",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error deleting record:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al eliminar el registro",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const filteredMujeres = data.filter((mujer) => {
    return mujer.name.toLowerCase().startsWith(searchName.toLowerCase());
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="barra-superior">
        <h1>Mujeres destacadas del mundo</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="search-input"
          />
          <button className="btn search-button"></button>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className="btn-container">
          {isLoggedIn ? (
            <>
              <button className="btn" onClick={handleAddNew}>
                Agregar información
              </button>
              <button className="btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <button className="btn" onClick={() => navigate("/login")}>
                Acceder
              </button>
            </>
          )}
        </div>
      </header>
      <div className="cards-container">
        {newCard && (
          <Card
            key={newCard.id}
            id={newCard.id}
            name={newCard.name}
            lastName={newCard.lastName}
            nationality={newCard.nationality}
            bio={newCard.bio}
            photo={newCard.photo}
            isEditing={true}
            onSave={handleSave}
            onCancel={handleCancel} // agrego cancelar si me arrepentí
          />
        )}
        {filteredMujeres.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            lastName={item.lastName}
            nationality={item.nationality}
            bio={item.bio}
            photo={item.photo}
            showButtons={isLoggedIn}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
