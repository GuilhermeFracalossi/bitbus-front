import { useQuery } from "react-query"
import apiInstance from "../../../services/api_client";
import { useFormContext } from "react-hook-form";

export const useEventos = (select) => {
    const { watch } = useFormContext();
    const tipoEvento = watch("tipoEvento");

    return useQuery({
        queryKey: ["eventos", tipoEvento],
        queryFn: () => apiInstance.get('/evento', {
            params: {
                tipo: tipoEvento
            }
        }),
        cacheTime: Infinity,
        staleTime: Infinity,
        select
    });
}
