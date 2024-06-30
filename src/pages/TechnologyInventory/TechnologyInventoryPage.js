import React from 'react';
import '../../styles/TechnologyInventoryPage.css'; // Importe o arquivo de estilos
import { Button, Modal, Title } from '@mantine/core';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import { PaginationProvider } from '../../utils/context/paginationContext';
import { ListagemArtefatos } from './ListagemArtefatos';
import { ArtefatoModal } from './ModalContent';
import { OrigemArtefatoEnum } from '../../enum/OrigemArtefatoEnum';
const queryClient = new QueryClient();

export const defaultArtefato = {
  id: 0,
  nome: "",
  categoria: "",
  ano: new Date(),
  quantidade: 0,
  informacoes: "",
  origem: OrigemArtefatoEnum.DOACAO,
  codigo: "",
  fotoMiniatura: "",
  link: "",
  localArmazenamento: "",
  fotoAuxiliar: null,
};

const TechnologyInventoryPage = () => {
  const form = useForm({
    defaultValues: {
      technologies: [],
      auxiliar: {
        artefato: defaultArtefato,
      }
    }
  });

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
  const { setValue } = useFormContext();
  const handleClose = () => {
    close();
    queryClient.refetchQueries(["artefatos"]);
  }

  const handleOpenModalAddItem = () => {
    setValue("auxiliar.artefato", { ...defaultArtefato });
    open();
  }

  return <>
    <header className="inventory-header">
      <Title order={3}>Itens de tecnologia</Title>
      <Button rightSection={<IconPlus size={14} />} onClick={handleOpenModalAddItem} >Add item</Button>
    </header>
    <Modal opened={opened} onClose={close} title="Artefato">
      <ArtefatoModal closeModal={handleClose} />
    </Modal>
    <PaginationProvider>
      <ListagemArtefatos openModal={open} />
    </PaginationProvider>
  </>;
}

export default TechnologyInventoryPage;
