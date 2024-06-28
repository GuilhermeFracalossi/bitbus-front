import { Badge, Button, Card, Center, Flex, Grid, Group, Image, Loader, Skeleton, Space, Text, Title } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { FormProvider, useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "react-query";
import { useVisits } from "./hooks/useVisits";
import { useVisit } from "./hooks/useVisit";

const queryClient = new QueryClient();

const defaultEvento = {
    id: 0,
    nome: "",
    data: new Date(),
    descricao: "",
    local: "",
    responsavel: "",
    foto: "",
}

const handleOpenModalAddEvento = () => {

}

export const VisitsPage = () => {
    const form = useForm({
        defaultValues: {
            eventos: [],
            auxiliar: {
                evento: defaultEvento,
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <FormProvider {...form} >
                <div>
                    <Flex
                        direction={"row"}
                        justify={"space-between"}
                    >
                        <Title order={3}>Visitas agendadas</Title>
                        <Button rightSection={<IconSquareRoundedPlus size={18} />} onClick={handleOpenModalAddEvento} >Novo evento</Button>
                    </Flex>
                </div>
                <Space h="md" />
                <div>
                    <ListagemCardsEventos />
                </div>
            </FormProvider>
        </QueryClientProvider>
    );
}

const ListagemCardsEventos = () => {
    const { isLoading, data, isError } = useVisits();

    if (isLoading) {
        return <Center>
          <Loader color="teal" size="xl" />
        </Center>;
    }

    return <Grid grow gutter={"md"}>
        {data.data.map(evento => (
            <Grid.Col span={4}>
                <EventoCard id={evento.id} />
            </Grid.Col>
        ))}
    </Grid>;
};

const EventoCard = ({ id }) => {
    const {data: visita, isLoading, isError } = useVisit(id);
    if (isLoading) {
        return <Center>
            <Skeleton height={400} width={400} radius="xl" />
        </Center>
    }

    if (!visita) {
        return <Text>Evento não encontrado</Text>;
    }
    console.log(visita.data);

    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={visita?.foto ?? "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}
            height={160}
            alt="Norway"
          />
        </Card.Section>
  
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{visita.nome}</Text>
          <Badge color="pink">{String(visita.data.getDate()).padStart(2, '0')}/{String(visita.data.getMonth()).padStart(2, '0')}</Badge>
        </Group>
  
        <Text size="sm" c="dimmed">
          {visita?.descricao}
        </Text>
  
        <Button color="blue" fullWidth mt="md" radius="md">
          Editar dados visita
        </Button>
      </Card>
    );
  }