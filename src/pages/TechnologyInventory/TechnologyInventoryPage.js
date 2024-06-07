import React from 'react';
import '../../styles/TechnologyInventoryPage.css'; // Importe o arquivo de estilos
import { Button, Center, Loader, Modal, Table, TextInput } from '@mantine/core';
import { FormProvider, useController, useForm, useFormContext } from 'react-hook-form';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import apiInstance from '../../services/api_client';
import { PaginationProvider, usePaginationContext } from '../../utils/context/paginationContext';
const queryClient = new QueryClient();

const TechnologyInventoryPage = () => {
  const form = useForm({
    defaultValues: {
      technologies: [],
      auxiliar: {
        nomeArtefato: "",
        imagens: {}
      }
    }
  })
  const [opened, { open, close }] = useDisclosure(false);
  console.log(form.watch())
  return (
    <FormProvider {...form} >
      <div className="inventory-page">
        <header className="inventory-header">
          <h1>Itens de tecnologia</h1>
          <Button rightSection={<IconPlus size={14} />} onClick={open} >Add item</Button>
        </header>
        <Modal opened={opened} onClose={close} title="Novo artefato">
          <ModalContent />
        </Modal>
        <QueryClientProvider client={queryClient}>
          <PaginationProvider>
            <ListagemArtefatos />
          </PaginationProvider>
        </QueryClientProvider>
      </div>
    </FormProvider>
  );
};

const ListagemArtefatos = () => {
  const { page, pageSize } = usePaginationContext();
  const { data, isLoading } = useQuery({
    queryKey: ["artefatos"],
    queryFn: () => apiInstance.get('/artefato', {
      params: {
        page,
        pageSize
      }
    })
  });

  if (isLoading) {
    return <Center>
      <Loader color="teal" size="xl" />
    </Center>;
  }

  const registros = data.data.data;
  console.log(registros);

  return <div>
    <h2>Artefatos</h2>
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Foto</Table.Th>
          <Table.Th>Código</Table.Th>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Ano</Table.Th>
          <Table.Th>Categoria</Table.Th>
          <Table.Th>Quantidade</Table.Th>
          <Table.Th>Origem (criar enum)</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {registros.map((registro) => {
          return <Table.Tr key={registro.id}>
            <Table.Td><img src={registro.fotoMiniatura} alt={registro.nome} width="50" /></Table.Td>
            <Table.Td>{registro.codigo}</Table.Td>
            <Table.Td>{registro.nome}</Table.Td>
            <Table.Td>{registro.ano}</Table.Td>
            <Table.Td>{registro?.categoria?.descricao}</Table.Td>
            <Table.Td>{registro.quantidade}</Table.Td>
            <Table.Td>{registro.origem}</Table.Td>
          </Table.Tr>
        })}
      </Table.Tbody>
    </Table>
  </div>;
}

const ModalContent = () => {
  const { register } = useFormContext();
  const field = useController({
    name: "auxiliar.imagens"
  });
  return <div>
    <TextInput
      label="Nome"
      description="Nome do artefato"
      placeholder="Memória RAM"
      {...register("auxiliar.nomeArtefato")}
    />
    {/* <FileInput
      label="Imagem"
      description="Imagens do artefato"
      // onChange={register.cha}
      onChange={field.onChange}
    /> */}
  </div>;
}

export default TechnologyInventoryPage;
