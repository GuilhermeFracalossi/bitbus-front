import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import apiInstance from "../../../../services/api_client";

export const useInscritos = () => {
    const {watch} = useFormContext();
    const idEvento = watch("evento.id");

    return useQuery({
        queryKey: ["inscritos", idEvento],
        queryFn: () => apiInstance.get('/evento/' + idEvento + '/inscritos'),
        cacheTime: Infinity,
        staleTime: Infinity,
    });
}