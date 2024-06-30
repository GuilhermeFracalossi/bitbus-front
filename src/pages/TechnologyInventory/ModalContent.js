import React from 'react';
import { Button, TextInput, Autocomplete, Skeleton, NumberInput, Textarea, Space, FileInput } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { useController, useFormContext } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import apiInstance from '../../services/api_client';
import { notifications } from '@mantine/notifications';
import { defaultArtefato } from './TechnologyInventoryPage';

export const ArtefatoModal = ({ closeModal }) => {
  const { trigger, getValues, setValue, setError } = useFormContext();

  const { isLoadingCreate, mutateAsync: createArtefatoMutation } = useMutation({
    mutationKey: ["create-artefato"],
    mutationFn: (artefato) => apiInstance.post('/artefato', {
      artefato: {
        ...artefato,
        ano: artefato.ano.getFullYear().toString(),
      }
    })
  });

  const { isLoadingUpdate, mutateAsync: updateArtefatoMutation } = useMutation({
    mutationKey: ["update-artefato"],
    mutationFn: (artefato) => apiInstance.patch(`/artefato/${artefato.id}`, {
      artefato: {
        ...artefato,
        ano: artefato.ano.getFullYear().toString(),
      }
    })
  });
  const isLoading = isLoadingCreate || isLoadingUpdate;

  const handleSave = async () => {
    if (!await trigger("auxiliar.artefato")) {
      return;
    }

    let descricaoAlerta = "Artefato atualizado!";
    try {
      const formArtefato = getValues("auxiliar.artefato");

      let artefatoResponse = null;
      if ((formArtefato.id ?? 0) > 0) {
        artefatoResponse = await updateArtefatoMutation(formArtefato);
      } else {
        artefatoResponse = await createArtefatoMutation(formArtefato);
        descricaoAlerta = "Artefato criado!";
      }

      if (formArtefato.fotoAuxiliar && artefatoResponse?.data?.id) {
        const formData = new FormData();
        formData.append("photo", formArtefato.fotoAuxiliar);
        await apiInstance.put(`/artefato/${artefatoResponse.data.id}/foto`, formData);
      
      }
    } catch (error) {
      if (!error?.response?.data?.error) {
        console.error(error);
        return;
      }

      if (Array.isArray(error.response.data.fields)) {
        error.response.data.fields.forEach((field) => {
          setError(`auxiliar.artefato.${field}`, { message: "Campo obrigatório" });
        });
      }

      return;
    }

  

    setValue("auxiliar.artefato", { ...defaultArtefato });
    notifications.show({
      title: descricaoAlerta,
      color: 'teal',
    });
    closeModal();
  };

  return <div>
    <ArtefatoFields />
    <Space h="xs" />
    <Button onClick={handleSave} loading={isLoading} fullWidth>Salvar</Button>
  </div>;
};

const CategoriaField = () => {
  const { control, formState: { errors } } = useFormContext();
  const autocompleteRegister = useController({
    name: "auxiliar.artefato.categoria",
    control: control,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["categorias"],
    queryFn: () => apiInstance.get('/categoria')
  });

  if (isLoading) {
    return <Skeleton height={8} radius="xl" />;
  }

  const results = data.data.data.map((item) => item.descricao);

  return <Autocomplete
    label="Categoria"
    description="Categoria do artefato"
    placeholder="Hardware"
    data={results}
    value={autocompleteRegister.field.value}
    onChange={autocompleteRegister.field.onChange}
    error={errors?.auxiliar?.artefato?.categoria?.message} />;
};

const FotoField = () => {
  const { formState: { errors }, control } = useFormContext();
  const fotoRegister = useController({
    name: "auxiliar.artefato.fotoAuxiliar",
    control: control,
  });

  return <FileInput
    label="Foto do artefato"
    placeholder="Foto do artefato"
    error={errors?.auxiliar?.artefato?.fotoMiniatura?.message}
    value={fotoRegister.value}
    onChange={fotoRegister.field.onChange} 
    accept="image/png,image/jpeg"
  />;
};


const ArtefatoFields = () => {
  const { register, control, formState: { errors } } = useFormContext();
  const quantidadeRegister = useController({
    name: "auxiliar.artefato.quantidade",
    control: control,
  });
  const anoRegister = useController({
    name: "auxiliar.artefato.ano",
    control: control,
  });

  return <div>
    <TextInput
      label="Nome"
      description="Nome do artefato"
      placeholder="Memória RAM"
      {...register("auxiliar.artefato.nome", { required: "Campo obrigatório" })}
      error={errors?.auxiliar?.artefato?.nome?.message} />
    <Space h="xs" />
    <TextInput
      label="Código"
      description="Código único do artefato"
      placeholder="ram_1234"
      {...register("auxiliar.artefato.codigo", { required: "Campo obrigatório" })}
      error={errors?.auxiliar?.artefato?.codigo?.message} />
    <Space h="xs" />
    <CategoriaField />
    <Space h="xs" />
    <YearPickerInput
      label="Ano"
      placeholder="Ano do artefato"
      value={anoRegister.field.value}
      onChange={anoRegister.field.onChange}
      error={errors?.auxiliar?.artefato?.ano?.message} />
    <Space h="xs" />
    <NumberInput
      label="Quantidade"
      description="Quantidade de artefatos doados"
      placeholder="3"
      value={quantidadeRegister.field.value}
      error={errors?.auxiliar?.artefato?.quantidade?.message}
      onChange={quantidadeRegister.field.onChange} />
    <Space h="xs" />
    <Textarea
      label="Informaçõoes"
      description="Maiores informacoes sobre o artefato"
      placeholder="Criado por fulano de tal em 1999..."
      error={errors?.auxiliar?.artefato?.informacoes?.message}
      {...register("auxiliar.artefato.informacoes", { required: "Campo obrigatório" })} />
    <Space h="xs" />
    <FotoField />
    <Space h="xs" />
    <TextInput
      label="Link"
      description="Link para mais informações sobre o artefato"
      error={errors?.auxiliar?.artefato?.link?.message}
      placeholder="https://example.com/wiki/ram"
      {...register("auxiliar.artefato.link")} />
    <Space h="xs" />
    <TextInput
      label="Local de armazenamento"
      description="Local onde o artefato está armazenado"
      error={errors?.auxiliar?.artefato?.localArmazenamento?.message}
      placeholder="Sala 1, prateleira 2, caixa 3"
      {...register("auxiliar.artefato.localArmazenamento")} />
  </div>;
};
