import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTechnologies, createTechnology, modifyTechnology, removeTechnology } from '../redux/technologySlice';

const useTechnologyInventory = () => {
  const dispatch = useDispatch();
  const technologies = useSelector(state => state.technology.items);

  // Carregar tecnologias
  const loadTechnologies = useCallback(() => {
    dispatch(getTechnologies());
  }, [dispatch]);

  // Adicionar tecnologia
  const addTechnology = useCallback((data) => {
    dispatch(createTechnology(data));
  }, [dispatch]);

  // Atualizar tecnologia
  const updateTechnology = useCallback((id, data) => {
    dispatch(modifyTechnology({ id, data }));
  }, [dispatch]);

  // Remover tecnologia
  const deleteTechnology = useCallback((id) => {
    dispatch(removeTechnology(id));
  }, [dispatch]);

  return {
    technologies,
    loadTechnologies,
    addTechnology,
    updateTechnology,
    deleteTechnology
  };
};

export default useTechnologyInventory;
