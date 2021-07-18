export const changeSort = (sortType) => ({ type: 'CHANGE_SORT', sortType });
export const changeFilter = (filterType) => ({ type: 'CHANGE_FILTER', filterType });
export const receiveTickets = (ticketsArr, stop) => ({ type: 'RECEIVE_TICKETS', ticketsArr, stop });
export const setLoading = () => ({ type: 'SET_LOADING' });

// eslint-disable-next-line arrow-body-style
export const getTickets = (searchId) => {
  return (dispatch) => {
    dispatch(setLoading());
    fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
      .then((resp) => resp.json())
      .then((resp) => {
        dispatch(receiveTickets(resp.tickets, resp.stop));
        dispatch(setLoading());
      })
      .catch(() => dispatch(setLoading()));
  };
};
export const setFilteredTickets = (ticketsArr) => ({ type: 'SET_FILTERED_TICKETS', ticketsArr });
