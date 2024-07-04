import { FormProvider, useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "react-query";
import { TipoPessoaEnum } from "../../enum/TipoPessoaEnum";
import { TipoEventoEnum } from "../../enum/TipoEventoEnum";
import { EventoContent } from "../../components/Event/EventoContent";

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
    inscritos: [],
}

export const WorkshopsPage = () => {
    const form = useForm({
        defaultValues: {
            evento: defaultEvento,
            tipoEvento: TipoEventoEnum.WORKSHOP,
            inscritoAux: {
                nome: "",
                email: "",
                tipo: TipoPessoaEnum.INSCRITO
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <FormProvider {...form} >
                <WorkshopContent />
            </FormProvider>
        </QueryClientProvider>
    );
}

const WorkshopContent = () => {
    return <EventoContent 
        tipoEvento={TipoEventoEnum.WORKSHOP} 
        title="Palestras e oficinas"
        titleAddBtn="Adicionar palestra ou oficina"
        defaultEvento={defaultEvento}
        permiteAdicionarInscritos
    />;
}