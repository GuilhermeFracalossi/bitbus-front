import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TechnologyInventoryPage from './pages/TechnologyInventory/TechnologyInventoryPage';
import TestPage from './pages/TestPage';  // Importe a nova página de teste
import '@mantine/core/styles.css';

const App = () => {
  return (
    <Router>
      <Routes>
	  	<Route path="/inventory" element={<TechnologyInventoryPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
};

export default App;