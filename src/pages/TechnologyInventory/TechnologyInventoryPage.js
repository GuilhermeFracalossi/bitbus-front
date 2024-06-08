import React from 'react';
import '../../styles/TechnologyInventoryPage.css'; // Importe o arquivo de estilos
import { Button, Modal } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import { PaginationProvider } from '../../utils/context/paginationContext';
import { ListagemArtefatos } from './ListagemArtefatos';
import { ModalContent } from './ModalContent';
const queryClient = new QueryClient();

export const defaultArtefato = {
  nome: "",
  categoria: "",
  ano: new Date(),
  quantidade: 0,
  informacoes: "",
  origem: "doacao",
  codigo: "",
  fotoMiniatura: "",
  link: "",
  localArmazenamento: "",
};

const TechnologyInventoryPage = () => {
  const form = useForm({
    defaultValues: {
      technologies: [],
      auxiliar: {
        artefato: defaultArtefato,
      }
    }
  })

  console.log(form.watch())

  return (
    <FormProvider {...form} >
      <div className="inventory-page">
        <QueryClientProvider client={queryClient}>
          <InventoryPageContent />
        </QueryClientProvider>
      </div>
    </FormProvider>
  );
};

const InventoryPageContent = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const handleClose = () => {
    close();
    queryClient.refetchQueries(["artefatos"]);
  }

  return <>
    <header className="inventory-header">
      <h1>Itens de tecnologia</h1>
      <Button rightSection={<IconPlus size={14} />} onClick={open} >Add item</Button>
    </header>
    <Modal opened={opened} onClose={close} title="Novo artefato">
      <ModalContent closeModal={handleClose} />
    </Modal>
    <PaginationProvider>
      <ListagemArtefatos />
    </PaginationProvider>
  </>;
}

export default TechnologyInventoryPage;
