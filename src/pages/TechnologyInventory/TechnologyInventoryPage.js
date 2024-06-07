import React from 'react';
import '../../styles/TechnologyInventoryPage.css'; // Importe o arquivo de estilos
import { Button, FileInput, Modal, TextInput } from '@mantine/core';
import { FormProvider, useController, useForm, useFormContext } from 'react-hook-form';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

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
          <Button rightSection={<IconPlus size={14}/>} onClick={open} >Add item</Button>
        </header>
        <Modal opened={opened} onClose={close} title="Novo artefato">
          <ModalContent />
        </Modal>
        {/* {isFormVisible && <TechnologyForm onSubmit={addTechnology} onClose={handleFormClose} />}
        <TechnologyList
          technologies={technologies}
          onUpdate={updateTechnology}
          onRemove={deleteTechnology}
          /> */}
      </div>
    </FormProvider>
  );
};

const ModalContent = () => {
  const {register} = useFormContext();
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
