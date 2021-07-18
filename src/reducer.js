const initialState = {
  ticketsSort: 'cheapest',
  filters: [1, 2, 0],
  loading: false,
  ticketsArr: [],
  filteredTicketsArr: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SORT':
      return { ...state, ticketsSort: action.sortType };
    case 'CHANGE_FILTER': {
      let filters = [...state.filters];
      if (action.filterType === 'all') {
        if (filters.length === 4) {
          filters = [];
        } else {
          filters = [1, 2, 3, 0];
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (filters.indexOf(action.filterType) === -1) {
          filters.push(action.filterType);
        } else {
          const index = filters.indexOf(action.filterType);
          const newArr = [...filters.slice(0, index), ...filters.slice(index + 1)];
          filters = newArr;
        }
      }
      return { ...state, filters };
    }
    case 'RECEIVE_TICKETS': {
      const prevTicketsArr = state.ticketsArr ? state.ticketsArr : [];
      return { ...state, ticketsArr: [...prevTicketsArr, ...action.ticketsArr.splice(0, 1)], stop: !!action.stop };
    }
    case 'SET_LOADING': {
      return { ...state, loading: !state.loading };
    }
    case 'SET_FILTERED_TICKETS': {
      return { ...state, filteredTicketsArr: [...action.ticketsArr] };
    }
    default:
      return state;
  }
};

export default reducer;
