import { useVisits } from "./useVisits"

export const useVisit = (id) => {
    return useVisits((data) => data.data.data.find((registro) => registro.id === id));
}