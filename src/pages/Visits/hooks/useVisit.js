import { useVisits } from "./useVisits"

export const useVisit = (id) => {
    return useVisits({
        select: (data) => data.data.find((registro) => registro.id == id) 
    });
}