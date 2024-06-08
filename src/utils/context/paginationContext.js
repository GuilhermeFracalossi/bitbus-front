import { createContext, useContext, useReducer } from 'react';

const PaginationContext = createContext();

const initialState = {
  page: 0,
  pageSize: 20, //constante??
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'nextPage':
      return { page: state.page + 1 };
    case 'prevPage':
      return { page: state.page - 1 };
    case 'setPage':
      return { page: action.page };
    default:
      throw new Error();
  }
}

export const PaginationProvider = ({ extendState, children }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...extendState });

  return (
    <PaginationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PaginationContext.Provider>
  );
}

export const usePaginationContext = () => {
  return useContext(PaginationContext)
}