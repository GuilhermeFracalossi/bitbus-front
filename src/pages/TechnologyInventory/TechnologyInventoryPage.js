import React from 'react';
import useTechnologyInventory from '../../hooks/useTechnologyInventory';
import TechnologyForm from '../../components/TechnologyInventory/TechnologyForm';
import TechnologyList from '../../components/TechnologyInventory/TechnologyList';
import '../../styles/TechnologyInventoryPage.css'; // Importe o arquivo de estilos

const TechnologyInventoryPage = () => {
  const { technologies, addTechnology, updateTechnology, deleteTechnology } = useTechnologyInventory();
  const [isFormVisible, setFormVisible] = React.useState(false);

  const handleAddClick = () => {
    setFormVisible(true);
  };

  const handleFormClose = () => {
    setFormVisible(false);
  };

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <h1>Itens de tecnologia</h1>
        <button className="add-button" onClick={handleAddClick}>
          + Add Technology
        </button>
      </header>
      {isFormVisible && <TechnologyForm onSubmit={addTechnology} onClose={handleFormClose} />}
      <TechnologyList
        technologies={technologies}
        onUpdate={updateTechnology}
        onRemove={deleteTechnology}
      />
    </div>
  );
};

export default TechnologyInventoryPage;
