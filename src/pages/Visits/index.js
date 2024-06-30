import { Badge, Button, Card, Center, Flex, Grid, Group, Image, Loader, Modal, Skeleton, Space, Text, Title } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "react-query";
import { useVisit } from "./hooks/useVisit";
import { useDisclosure } from "@mantine/hooks";
import { EventoModal } from "./EventoModal";
import { useVisits } from "./hooks/useVisits";
import { TipoPessoaEnum } from "../../enum/TipoPessoaEnum";

const queryClient = new QueryClient();

const defaultEvento = {
    id: 0,
    nome: "",
    data: new Date(),
    descricao: "",
    local: "",
    responsavel: {
        nome: "",
        email: "",
        tipo: TipoPessoaEnum.RESPONSAVEL
    },
    foto: "",
}


export const VisitsPage = () => {
    const form = useForm({
        defaultValues: {
            evento: defaultEvento,
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <FormProvider {...form} >
                <EventoContent />
            </FormProvider>
        </QueryClientProvider>
    );
}

const EventoContent = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { setValue } = useFormContext();
    const handleOpenModalAddEvento = () => {
        setValue("evento", { ...defaultEvento });
        open();
    }

    const handleClose = () => {
        close();
        queryClient.refetchQueries(["eventos", "pessoa"]);
    }

    return <>
        <div>
            <Flex
                direction={"row"}
                justify={"space-between"}
            >
                <Title order={3}>Visitas agendadas</Title>
                <Button rightSection={<IconSquareRoundedPlus size={18} />} color="teal" onClick={handleOpenModalAddEvento} >Nova visita</Button>
            </Flex>
        </div>
        <Space h="md" />
        <Modal opened={opened} onClose={close} title="Visita">
            <EventoModal closeModal={handleClose} />
        </Modal>
        <div>
            <ListagemCardsEventos open={open} />
        </div>
    </>;
}

export const EventoCard = ({ id, open }) => {
    const { data: visita, isLoading, isError } = useVisit(id);
    const { setValue } = useFormContext();
    if (isLoading) {
        return <Center>
            <Skeleton height={400} width={400} radius="xl" />
        </Center>
    }

    if (!visita) {
        return <Text>Evento não encontrado</Text>;
    }

    if (isError) {
        return <Text>Erro ao carregar evento</Text>;
    }

    const parsedVisita = {
        ...visita,
        data: new Date(visita.data),
        responsavel: {
            nome: visita.pessoa.nome,
            email: visita.pessoa.email,
            tipo: TipoPessoaEnum.RESPONSAVEL
        }
    }

    const handleEdit = () => {
        console.log(parsedVisita)
        setValue("evento", { ...parsedVisita });
        open();
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={parsedVisita?.foto ? process.env.REACT_APP_API_URL + parsedVisita?.foto : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}
                    height={160}
                    alt="Norway"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{parsedVisita.nome}</Text>
                <Badge color="teal">{String(parsedVisita.data.getDate()).padStart(2, '0')}/{String(parsedVisita.data.getMonth()).padStart(2, '0')}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {parsedVisita?.descricao}
            </Text>

            <Button color="teal" fullWidth mt="md" radius="md" onClick={handleEdit}>
                Editar dados visita
            </Button>
        </Card>
    );
}

const ListagemCardsEventos = ({ open }) => {
    const { isLoading, data } = useVisits();

    if (isLoading) {
        return <Center>
            <Loader color="teal" size="xl" />
        </Center>;
    }

    if (!data?.data?.data) {
        return <Text>Nenhum evento encontrado</Text>;
    }

    return <Grid grow gutter={"md"}>
        {data.data.data.map((evento) => (
            <Grid.Col span={4} key={evento.id}>
                <EventoCard id={evento.id} open={open} />
            </Grid.Col>
        ))}
    </Grid>;
};