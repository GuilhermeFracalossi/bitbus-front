import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TechnologyForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = (data) => {
	onSubmit(data);
	reset();
  };

  return (
	<Form onSubmit={handleSubmit(handleFormSubmit)}>
	  <input {...register('name')} placeholder="Nome do item" required />
	  <textarea {...register('description')} placeholder="Descrição" />
	  <button type="submit">Adicionar</button>
	</Form>
  );
};

export default TechnologyForm;
