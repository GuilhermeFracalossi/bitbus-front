import { useEventos } from "./useEventos";

export const useEvento = (id) => {
    return useEventos((data) => data.data.data.find((registro) => registro.id === id));
}