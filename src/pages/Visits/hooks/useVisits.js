import { useQuery } from "react-query"
import apiInstance from "../../../services/api_client";
import { TipoEventoEnum } from "../../../enum/TipoEventoEnum";

export const useVisits = (select) => {
    return useQuery({
        queryKey: ["visits"],
        queryFn: () => apiInstance.get('/evento', {
            params: {
                tipo: TipoEventoEnum.VISITA
            }
        }),
        cacheTime: Infinity,
        staleTime: Infinity,
        select
    });
}
