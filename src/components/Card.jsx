import React, { useState } from 'react';
import '../styles/Card.css';

const Card = ({ id, name, lastName, nationality, bio, photo, isEditing, onSave, onCancel, showButtons, onDelete }) => {
  const [isEditingState, setIsEditingState] = useState(isEditing || false);
  const [editedData, setEditedData] = useState({
    name: name || '',
    lastName: lastName || '',
    nationality: nationality || '',
    bio: bio || '',
    photo: photo || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(id, editedData);
    setIsEditingState(false);
  };

  const handleCancelClick = () => {
    onCancel();
    setIsEditingState(false);
  };

  return (     
    <div className="card">
      {isEditingState ? (
        <>
          <input
            type="text"
            name="name"
            value={editedData.name}
            placeholder="Nombre"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            value={editedData.lastName}
            placeholder="Apellido"
            onChange={handleChange}
          />
          <input
            type="text"
            name="nationality"
            value={editedData.nationality}
            placeholder="Nacionalidad"
            onChange={handleChange}
          />
          <textarea
            name="bio"
            value={editedData.bio}
            placeholder="Biografía"
            onChange={handleChange}
          />
          <input
            type="text"
            name="photo"
            value={editedData.photo}
            placeholder="URL de la foto"
            onChange={handleChange}
          />
          <div className="btn-container">
            <button className="btn" onClick={handleSaveClick}>Guardar</button>
            <button className="btn" onClick={handleCancelClick}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <img src={photo} alt={`${name} ${lastName}`} className="card-photo" />
          <h2>{name} {lastName}</h2>
          <h4>{nationality}</h4>
          <p>{bio}</p>
          {showButtons && (
            <div className="btn-container">
              <button className="btn" onClick={() => setIsEditingState(true)}>Editar</button>
              <button className="btn" onClick={() => onDelete(id)}>Eliminar</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
