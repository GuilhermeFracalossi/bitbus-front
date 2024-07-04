import { Alert, Autocomplete, Button, Center, Loader, Modal, Select, Skeleton, Space, Table, TextInput, rem } from "@mantine/core";
import { useController, useFormContext } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useInscritos } from "./hooks/useInscritos";
import { IconAt, IconInfoCircle } from "@tabler/icons-react";
import { useMemo } from "react";
import apiInstance from "../../../services/api_client";
import { TipoPessoaEnum } from "../../../enum/TipoPessoaEnum";

export const InscritosModal = ({ modalControl }) => {
    const [opened, { open, close }] = modalControl;
    const queryClient = useQueryClient();
    const handleClose = () => {
        close();
        queryClient.refetchQueries(["eventos", "pessoa"]);
    };

    return <Modal opened={opened} onClose={close} title="Inscritos">
        <InscritosContent closeModal={handleClose} />
    </Modal>;
};

const InscritosContent = ({ closeModal }) => {
    const {data, isLoading, isError} = useInscritos();
    
    if (isLoading) {
        return <Center>
            <Loader color="teal" size="lg" />
        </Center>;
    }

    if (isError) {
        const icon = <IconInfoCircle />;
    
        return (
          <Alert variant="light" color="yellow" title="Erro ao obter integrantes" icon={icon}>
            Houve um erro ao obter os inscritos. Por favor, tente novamente.
          </Alert>
        );
    }

    const inscritos = data.data;

    return <div>
        <AdicionarInscrito />
        {inscritos.length <= 0 && <Alert variant="light" color="blue" title="Nenhum inscrito encontrado" icon={<IconInfoCircle />}>
                Não há inscritos para este evento.
            </Alert>}
        {inscritos.length > 0 && (
            <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nome</Table.Th>
                <Table.Th>E-mail</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {inscritos.map((inscrito) => {
                    return <Table.Tr key={inscrito.id}>
                        <Table.Td>{inscrito.nome}</Table.Td>
                        <Table.Td>{inscrito.email}</Table.Td>
                    </Table.Tr>;
                })}
            </Table.Tbody>
            </Table>
        )}

    </div>;
};

const AdicionarInscrito = () => {
    const { register, formState: { errors }, setValue, getValues, trigger, control } = useFormContext();
    const { data: pessoasQueryResult, isLoading } = useQuery({
        queryKey: ["pessoa"],
        queryFn: () => apiInstance.get('/pessoa'),
        cacheTime: Infinity,
        staleTime: Infinity,
    });
    const { refetch } = useInscritos();

    const autocompleteRegister = useController({
        name: "inscritoAux.nome",
        control: control,
    });

    const pessoasParsed = useMemo(() => {
        return pessoasQueryResult?.data?.data.filter((pessoa) => pessoa.tipo === TipoPessoaEnum.INSCRITO).map((pessoa) => pessoa.nome);
    }, [pessoasQueryResult]);

    const { mutateAsync, isLoading: isSaving } = useMutation({
        mutationFn: async (inscrito) => {
            await apiInstance.put('evento/' + getValues("evento.id") + '/inscrito', {
                pessoa: inscrito
            });
        },
    });

    if (isLoading) {
        return <Skeleton height={20} radius="xl" />;
    }

    const handleAdicionarInscrito = async () => {
        if (!await trigger("inscritoAux")) return;
        const inscrito = getValues("inscritoAux");
        await mutateAsync(inscrito);
        
        setValue("inscritoAux", {
            nome: "",
            email: ""
        });
        refetch();
    }

    return <div>
        <Autocomplete
            label="Inscrito"
            description="Novo inscrito"
            placeholder="João da Silva"
            data={pessoasParsed}
            value={autocompleteRegister.field.value}
            onChange={autocompleteRegister.field.onChange}
            onOptionSubmit={(value) => {
                const pessoa = pessoasQueryResult.data.data.find((pessoa) => pessoa.nome === value);
                if (!pessoa) return;
                setValue("inscritoAux.nome", pessoa.nome);
                setValue("inscritoAux.email", pessoa.email);
            }}
            searchable
            error={errors?.inscritoAux?.nome?.message} 
        />
        <Space h="xs" />
        <TextInput
            label="E-mail do inscrito"
            description="E-mail do inscrito"
            placeholder="joao.da.silva@gmail.com"
            {...register("inscritoAux.email", { required: "Campo obrigatório" })}
            error={errors?.inscritoAux?.email?.message}
            rightSectionPointerEvents="none"
            rightSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} 
        />
        <Space h="xs" />
        <Button color="teal" fullWidth onClick={handleAdicionarInscrito} loading={isSaving}>Adicionar inscrito</Button>
        <Space h="xs" />
    </div>;
};

