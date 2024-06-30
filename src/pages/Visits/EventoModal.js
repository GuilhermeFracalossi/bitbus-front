import { Button, FileInput, Select, Skeleton, Space, Switch, TextInput, Textarea, rem } from "@mantine/core";
import { useController, useFormContext } from "react-hook-form";
import { DatePickerInput } from "@mantine/dates";
import apiInstance from "../../services/api_client";
import { useMutation, useQuery } from "react-query";
import { notifications } from "@mantine/notifications";
import { TipoEventoEnum } from "../../enum/TipoEventoEnum";
import { TipoPessoaEnum } from "../../enum/TipoPessoaEnum";
import { useVisits } from "./hooks/useVisits";
import { useMemo, useState } from "react";
import { IconAt } from "@tabler/icons-react";

export const EventoModal = ({ closeModal }) => {
    const { formState: { errors }, trigger, getValues } = useFormContext();
    const { refetch } = useVisits();
    const { setValue } = useFormContext();

    const { isLoadingCreate, mutateAsync: createEventoMutation } = useMutation({
        mutationKey: ["create-evento"],
        mutationFn: (evento) => apiInstance.post('/evento', {
          evento: {
            ...evento,
            tipo: TipoEventoEnum.VISITA,
            data: evento.data.toString(),
          }
        })
      });

      const { isLoadingUpdate, mutateAsync: updateEventoMutation } = useMutation({
        mutationKey: ["update-evento"],
        mutationFn: (evento) => apiInstance.patch('/evento/' + evento.id, {
          evento: {
            ...evento,
            tipo: TipoEventoEnum.VISITA,
            data: evento.data.toString()
          }
        })
      });

    const handleSave = async () => {
        if (!await trigger("evento")) {
            return;
        }

        const data = getValues("evento");
        let res = undefined;

        let mensagem = "Evento atualizado!";
        if (data.id === 0) {
            res = await createEventoMutation(data);
            mensagem = "Evento criado!";
        } else {
            res = await updateEventoMutation(data);
        }

        if (data.foto && typeof data.foto !== "string") {
            const formData = new FormData();
            formData.append("photo", data.foto);
            await apiInstance.put(`/evento/${res.data.id}/foto`, formData);
        }

        notifications.show({
            title: mensagem,
            color: 'teal',
        });

        refetch();
        closeModal();
    };

    return <div>
        <EventoFields />
        <Space h="xs" />
        <Button onClick={handleSave} color="teal" fullWidth loading={isLoadingCreate || isLoadingUpdate}>Salvar</Button>
    </div>;
};
const EventoFields = () => {
    return <div>
        <NomeField />
        <DataField />
        <DescricaoField />
        <LocalField />
        <ResponsavelField />
        <FotoField />
    </div>;
};
const NomeField = () => {
    const { register, formState: { errors } } = useFormContext();
    return <div>
        <TextInput
            label="Nome"
            description="Nome da visita"
            placeholder="Visita a escola elementar"
            {...register("evento.nome", { required: "Campo obrigatório" })}
            error={errors?.evento?.nome?.message} />
        <Space h="xs" />
    </div>;
};
const DataField = () => {
    const { formState: { errors }, control } = useFormContext();
    const dateRegister = useController({
        name: "evento.data",
        control: control,
    });
    return <div>
        <DatePickerInput
            locale="es"
            label="Data"
            placeholder="02/12/2021"
            value={dateRegister.field.value}
            onChange={dateRegister.field.onChange}
            error={errors?.evento?.data?.message} />
        <Space h="xs" />
    </div>;
};
const DescricaoField = () => {
    const { register, formState: { errors } } = useFormContext();
    return <div>
        <Textarea
            label="Descrição"
            description="Maiores informacoes sobre a visita"
            placeholder="Visita a escola elementar para apresentar a nova tecnologia de ensino..."
            error={errors?.evento?.descricao?.message}
            {...register("evento.descricao", { required: "Campo obrigatório" })} />
        <Space h="xs" />
    </div>;
};
const LocalField = () => {
    const { register, formState: { errors } } = useFormContext();
    return <div>
        <TextInput
            label="Local"
            description="Local da visita"
            placeholder="Rua das flores, 123, bairro jardim das rosas"
            {...register("evento.local", { required: "Campo obrigatório" })}
            error={errors?.evento?.nome?.message} />
        <Space h="xs" />
    </div>;
};
const ResponsavelField = () => {
    const { register, formState: { errors }, watch, setValue } = useFormContext();
    const [newResponsavel, setNewResponsavel] = useState(false);    
    const { data: pessoasQueryResult, isLoading } = useQuery({
        queryKey: ["pessoa"],
        queryFn: () => apiInstance.get('/pessoa'),
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    const pessoasParsed = useMemo(() => {
        return pessoasQueryResult?.data?.data.filter((pessoa) => pessoa.tipo === TipoPessoaEnum.RESPONSAVEL).map((pessoa) => pessoa.nome);
    }, [pessoasQueryResult]);

    if (isLoading) {
        return <Skeleton height={8} radius="xl" />;
    }

    return <div>
            {newResponsavel && (<>
                    <TextInput
                        label="Nome responsável"
                        description="Nome do responsável"
                        placeholder="João da Silva"
                        {...register("evento.responsavel.nome", { required: "Campo obrigatório" })}
                        error={errors?.evento?.responsalve?.nome?.message} 
                    />
                    <Space h="xs" />
                    <TextInput
                        label="Email responsável"
                        description="Email do responsável"
                        placeholder="joao.da.silva@gmail.com"
                        {...register("evento.responsavel.email", { required: "Campo obrigatório" })}
                        error={errors?.evento?.responsalve?.email?.message}
                        rightSectionPointerEvents="none"
                        rightSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} 
                    />
                </>
            )}
            {!newResponsavel && (<>
                <Select
                    label="Responsável"
                    description="Responsável pela visita"
                    placeholder="João da Silva"
                    data={pessoasParsed}
                    value={watch("evento.responsavel.nome")}
                    onChange={(value) => {
                        const pessoa = pessoasQueryResult.data.data.find((pessoa) => pessoa.nome === value);
                        setValue("evento.responsavel.nome", pessoa.nome);
                        setValue("evento.responsavel.email", pessoa.email);
                    }}
                    searchable
                    error={errors?.evento?.responsavel?.nome?.message} 
                />
            </>)}
            <Space h="xs" />
            <Switch
                checked={newResponsavel}
                onChange={(event) => setNewResponsavel(event.currentTarget.checked)}
                label="Cadastrar novo responsável"
                color="teal"
            />
        <Space h="xs" />
    </div>;
};

const FotoField = () => {
    const { formState: { errors }, control } = useFormContext();
    const fotoRegister = useController({
      name: "evento.foto",
      control: control,
    });
  
    return <FileInput
      label="Foto do evento"
      placeholder="Foto do evento"
      error={errors?.evento?.foto?.message}
      value={fotoRegister.value}
      onChange={fotoRegister.field.onChange} 
      accept="image/png,image/jpeg"
    />;
};


