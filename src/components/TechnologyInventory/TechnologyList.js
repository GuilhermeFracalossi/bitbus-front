import React from 'react';
import '../../styles/TechnologyList.css' // Estilos específicos para este formulário


const TechnologyList = ({ technologies, onUpdate, onRemove }) => {
  return (
    <div className="technology-list">
      {technologies.map((technology) => (
        <div key={technology.id} className="technology-item">
          <img src={technology.image} alt={technology.name} className="technology-image" />
          <div className="technology-info">
            <span>{technology.name}</span>
            <div className="technology-actions">
              <button onClick={() => onUpdate(technology.id)}>Update</button>
              <button onClick={() => onRemove(technology.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechnologyList;
