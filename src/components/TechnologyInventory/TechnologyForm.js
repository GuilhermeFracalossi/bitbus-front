import React from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/TechnologyForm.css' // Estilos específicos para este formulário

const TechnologyForm = ({ onSubmit, onClose }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="form-overlay">
      <form className="technology-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <h2>Add Technology</h2>
        <input {...register('name')} placeholder="Technology Name" required />
        <input {...register('image')} placeholder="Image URL" required />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TechnologyForm;
