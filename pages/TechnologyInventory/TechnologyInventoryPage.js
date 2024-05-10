import React, { useEffect } from 'react';
import useTechnologyInventory from '../../hooks/useTechnologyInventory';
import TechnologyForm from '../../components/TechnologyInventory/TechnologyForm';
import TechnologyList from '../../components/TechnologyInventory/TechnologyList';

const TechnologyInventoryPage = () => {
  const { technologies, loadTechnologies, addTechnology, updateTechnology, deleteTechnology } = useTechnologyInventory();

  useEffect(() => {
	loadTechnologies();
  }, [loadTechnologies]);

  return (
	<div>
	  <TechnologyForm onSubmit={addTechnology} />
	  <TechnologyList
		technologies={technologies}
		onUpdate={updateTechnology}
		onRemove={deleteTechnology}
	  />
	</div>
  );
};

export default TechnologyInventoryPage;
