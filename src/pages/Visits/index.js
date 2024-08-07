import { FormProvider, useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "react-query";
import { TipoPessoaEnum } from "../../enum/TipoPessoaEnum";
import { TipoEventoEnum } from "../../enum/TipoEventoEnum";
import { EventoContent } from "../../components/Event/EventoContent";

export const queryClient = new QueryClient();

export const defaultEvento = {
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
            tipoEvento: TipoEventoEnum.VISITA,
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
                <EventoContent 
                    tipoEvento={TipoEventoEnum.VISITA} 
                    title="Visitas agendadas" 
                    titleAddBtn="Adicionar visita"
                    defaultEvento={defaultEvento}
                />
            </FormProvider>
        </QueryClientProvider>
    );
}
