import { Badge, Button, Card, Center, Flex, Grid, Group, Image, Loader, Modal, Skeleton, Space, Text, Title } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";
import { useDisclosure } from "@mantine/hooks";
import { EventoModal } from "../../components/Event/EventoModal";
import { TipoPessoaEnum } from "../../enum/TipoPessoaEnum";
import { useEventos } from "../../components/Event/hooks/useEventos";
import { useEvento } from "../../components/Event/hooks/useEvento";
import { useQueryClient } from "react-query";
import { InscritosModal } from "./Inscritos/InscritosModal";

export const EventoContent = ({
    tipoEvento, title, titleAddBtn, defaultEvento, permiteAdicionarInscritos = false
}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const inscritosModalDisclosure = useDisclosure(false);
    const queryClient = useQueryClient();
    const { setValue } = useFormContext();
    const handleOpenModalAddEvento = () => {
        setValue("evento", { ...defaultEvento });
        open();
    };

    const handleClose = () => {
        close();
        queryClient.refetchQueries(["eventos", "pessoa"]);
    };

    return <>
        <div>
            <Flex
                direction={"row"}
                justify={"space-between"}
            >
                <Title order={3}>{title}</Title>
                <Button rightSection={<IconSquareRoundedPlus size={18} />} color="teal" onClick={handleOpenModalAddEvento}>{titleAddBtn}</Button>
            </Flex>
        </div>
        <Space h="md" />
        <Modal opened={opened} onClose={close} title="Novo evento">
            <EventoModal closeModal={handleClose} />
        </Modal>
        {permiteAdicionarInscritos && <InscritosModal modalControl={inscritosModalDisclosure} />}
        <div>
            <ListagemCardsEventos open={open} inscritosModalControl={inscritosModalDisclosure} permiteAdicionarInscritos={permiteAdicionarInscritos} />
        </div>
    </>;
};

export const EventoCard = ({ id, open, inscritosModalControl, permiteAdicionarInscritos }) => {
    const [, { open: openInscritosModal }] = inscritosModalControl;
    const { data: evento, isLoading, isError } = useEvento(id);
    const { setValue } = useFormContext();
    if (isLoading) {
        return <Center>
            <Skeleton height={400} width={400} radius="xl" />
        </Center>;
    }

    if (!evento) {
        return <Text>Evento não encontrado</Text>;
    }

    if (isError) {
        return <Text>Erro ao carregar evento</Text>;
    }

    const parsedEvento = {
        ...evento,
        data: new Date(evento.data),
        responsavel: {
            nome: evento.pessoa.nome,
            email: evento.pessoa.email,
            tipo: TipoPessoaEnum.RESPONSAVEL
        }
    };

    const handleEdit = () => {
        setValue("evento", { ...parsedEvento });
        open();
    };

    const handleInscritos = () => {
        setValue("evento", { ...parsedEvento });
        openInscritosModal();
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={parsedEvento?.foto ? process.env.REACT_APP_API_URL + parsedEvento?.foto : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}
                    height={160}
                    alt="Norway" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{parsedEvento.nome}</Text>
                <Badge color="teal">{String(parsedEvento.data.getDate()).padStart(2, '0')}/{String(parsedEvento.data.getMonth()).padStart(2, '0')}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {parsedEvento?.descricao}
            </Text>

            <Group justify="space-between" grow>

                <Button color="teal" fullWidth={!permiteAdicionarInscritos} mt="md" radius="md" size="md" onClick={handleEdit}>
                    Editar dados evento
                </Button>
                {permiteAdicionarInscritos && <Button color="teal" mt="md" radius="md" size="md" onClick={handleInscritos}>Ver inscritos</Button>}
            </Group>
        </Card>
    );
};
const ListagemCardsEventos = ({ open, inscritosModalControl, permiteAdicionarInscritos }) => {
    const { isLoading, data } = useEventos();

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
                <EventoCard id={evento.id} open={open} inscritosModalControl={inscritosModalControl} permiteAdicionarInscritos={permiteAdicionarInscritos} />
            </Grid.Col>
        ))}
    </Grid>;
};
