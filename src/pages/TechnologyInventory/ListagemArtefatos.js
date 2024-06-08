import React from 'react';
import { Center, Loader, Table } from '@mantine/core';
import { useQuery } from 'react-query';
import apiInstance from '../../services/api_client';
import { usePaginationContext } from '../../utils/context/paginationContext';

export const ListagemArtefatos = () => {
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
          </Table.Tr>;
        })}
      </Table.Tbody>
    </Table>
  </div>;
};
