import React from 'react';
import { Alert, Button, Center, Loader, Table, Tooltip } from '@mantine/core';
import { useQuery } from 'react-query';
import apiInstance from '../../services/api_client';
import { usePaginationContext } from '../../utils/context/paginationContext';
import { IconInfoCircle, IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useFormContext } from 'react-hook-form';
import { OrigemArtefatoEnumLabel } from '../../enum/OrigemArtefatoEnum';

export const ListagemArtefatos = ({ openModal }) => {
  const { page, pageSize } = usePaginationContext();
  const { setValue } = useFormContext();
  const { data: artefatoResponse, isLoading, refetch, isError } = useQuery({
    queryKey: ["artefatos", page],
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

  const handleRemover = async (e, id) => {
    e.stopPropagation();
    try {
      await apiInstance.delete(`/artefato/${id}`);
      refetch();
    } catch (error) {
      console.error(error);
      return;
    }
    
    notifications.show({
      title: 'Artefato removido!',
      color: 'red',
    });
  }
  
  const handleEditar = (registro) => {
    const parsedAno = new Date();
    parsedAno.setFullYear(registro.ano);
    setValue("auxiliar.artefato", { ...registro, ano: parsedAno, categoria: registro.categoria.descricao });
    openModal();
  }

  if (isError) {
    const icon = <IconInfoCircle />;
    
    return (
      <Alert variant="light" color="yellow" title="Erro ao obter artefatos" icon={icon}>
        Houve um erro ao obter os artefatos. Por favor, tente novamente.
      </Alert>
    );
  }

  const registros = artefatoResponse.data?.data;

  return <div>
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Foto</Table.Th>
          <Table.Th>Código</Table.Th>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Ano</Table.Th>
          <Table.Th>Categoria</Table.Th>
          <Table.Th>Quantidade</Table.Th>
          <Table.Th>Origem</Table.Th>
          <Table.Th>Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {registros.map((registro) => {
          return <Table.Tr key={registro.id} onClick={() => handleEditar(registro)}  className='cursor-pointer'>
            <Table.Td><img src={process.env.REACT_APP_API_URL + registro.fotoMiniatura} alt={registro.nome} width="50" /></Table.Td>
            <Table.Td>{registro.codigo}</Table.Td>
            <Table.Td>{registro.nome}</Table.Td>
            <Table.Td>{registro.ano}</Table.Td>
            <Table.Td>{registro?.categoria?.descricao}</Table.Td>
            <Table.Td>{registro.quantidade}</Table.Td>
            <Table.Td>{OrigemArtefatoEnumLabel[Number(registro.origem)]}</Table.Td>
            <Table.Td>
              <Tooltip label="Excluir">
                <Button color="red" onClick={(e) => handleRemover(e, registro.id)}>
                  <IconTrash size={14} />
                </Button>
              </Tooltip>
            </Table.Td>
          </Table.Tr>;
        })}
      </Table.Tbody>
    </Table>
  </div>;
};
