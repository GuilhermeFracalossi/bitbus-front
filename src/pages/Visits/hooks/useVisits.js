import { useQuery } from "react-query"

// export const useVisits = ({ select }) => {
//     return useQuery({
//         queryKey: ["visits"],
//         queryFn: () => apiInstance.get('/evento', {
//             params: {
//                 tipo: "visita"
//             }
//         }),
//         cacheTime: Infinity,
//         staleTime: Infinity,
//         select 
//     });
// }


export const useVisits = (options) => {
    return useQuery({
        queryKey: ["visits"],
        queryFn: () => Promise.resolve({
            data: [
                {
                    id: 1,
                    nome: "Visita ao museu",
                    data: new Date(),
                    descricao: "Visita ao museu de história natural",
                    local: "Museu de história natural",
                    responsavel: "João da Silva",
                    foto: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
                },
                {
                    id: 2,
                    nome: "Visita ao zoológico",
                    data: new Date(),
                    descricao: "Visita ao zoológico de São Paulo",
                    local: "Zoológico de São Paulo",
                    responsavel: "Maria da Silva",
                    foto: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
                },
                {
                    id: 2,
                    nome: "Visita ao zoológico",
                    data: new Date(),
                    descricao: "Visita ao zoológico de São Paulo",
                    local: "Zoológico de São Paulo",
                    responsavel: "Maria da Silva",
                    foto: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
                },
                {
                    id: 2,
                    nome: "Visita ao zoológico",
                    data: new Date(),
                    descricao: "Visita ao zoológico de São Paulo",
                    local: "Zoológico de São Paulo",
                    responsavel: "Maria da Silva",
                    foto: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
                },
                {
                    id: 2,
                    nome: "Visita ao zoológico",
                    data: new Date(),
                    descricao: "Visita ao zoológico de São Paulo",
                    local: "Zoológico de São Paulo",
                    responsavel: "Maria da Silva",
                    foto: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
                },
            ]
        }),
        cacheTime: Infinity,
        staleTime: Infinity,
        ...options
    });
}