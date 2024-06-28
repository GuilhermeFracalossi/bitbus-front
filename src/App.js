import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import TechnologyInventoryPage from './pages/TechnologyInventory/TechnologyInventoryPage';
import TestPage from './pages/TestPage';  // Importe a nova página de teste
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { AppShell, Group, Image, NavLink } from '@mantine/core';
import { IconBuildingWarehouse, IconMapPins } from '@tabler/icons-react';
import { VisitsPage } from './pages/Visits';
import { HomePage } from './pages/Home';

const App = () => {

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      withBorder
    >
      <AppShell.Header>
        <Group>
          <Link to={"/"}>
            <Image
              src="/logo-bitbus_3.png"
              w="auto"
              fit="contain"
              h={50}
              className='px-10 py-2'
            />
          </Link>
          <Link to={"/inventory"}>
            <NavLink
              autoContrast 
              label="Inventário"
              leftSection={<IconBuildingWarehouse size="1rem" stroke={1.5} />} 
            />
          </Link>
          <Link to={"/visits"}>
            <NavLink 
              label="Visitas" 
              leftSection={<IconMapPins size="1rem" stroke={1.5} />} 
            />
          </Link>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
            <Routes>
                <Route path="/inventory" element={<TechnologyInventoryPage />} />
                <Route path="/visits" element={<VisitsPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
      </AppShell.Main>
    </AppShell>
  );
};

export default App;