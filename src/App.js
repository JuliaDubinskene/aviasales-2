import { Spin, Alert } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Ticket from './components/ticket/Ticket';
import Filter from './components/filter/Filter';
import * as actions from './actions/actions';
import AviaLogo from './img/Logo.png';

import css from './app.module.css';

import '../node_modules/antd/dist/antd.css';

const { app, main, tickets, ticketsFilter, ticketsBtn, selected, aviaLogo, mainContent, header } = css;

function App(props) {
  const { getTickets, changeSort, setFilteredTickets, state } = props;
  const [searchId, setSearchId] = useState('');

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetch('https://front-test.beta.aviasales.ru/search')
      .then((resp) => resp.json())
      .then((resp) => {
        setSearchId(resp.searchId);
        getTickets(resp.searchId);
      });
  }, []);

  useEffect(() => {
    if (!state.stop && !state.loading) {
      getTickets(searchId);
    }
  });

  if (state.ticketsSort === 'cheapest') {
    state.filteredTicketsArr.sort((aElem, bElem) => aElem.price - bElem.price); 
  } else if (state.ticketsSort === 'fastest') {
    state.filteredTicketsArr.sort((aElem, bElem) => {
      const aMinDuration = Math.min(...aElem.segments.map((elem) => elem.duration));
      const bMinDuration = Math.min(...bElem.segments.map((elem) => elem.duration));
      return aMinDuration - bMinDuration;
    });
  }

  useEffect(() => {
    const ticketsArr = JSON.parse(JSON.stringify(state.ticketsArr)).filter((elem) => {
      const arr = { ...elem };
      arr.segments = arr.segments.filter((segment) => state.filters.indexOf(segment.stops.length) !== -1);
      return arr.segments.length !== 0;
    });
    setFilteredTickets(ticketsArr);
  }, [state.filters, state.ticketsArr]);

  return (
    <div className={app}>
      <header className={header}>
        <img className={aviaLogo} src={AviaLogo} alt="site logo" />
      </header>
      <main className={mainContent}>
        <Filter />
        <main className={main}>
          <div className={ticketsFilter}>
            <input
              onClick={() => changeSort('cheapest')}
              className={[ticketsBtn, state.ticketsSort === 'cheapest' ? selected : null].join(' ')}
              type="button"
              value="Самый дешевый"
            />
            <input
              onClick={() => changeSort('fastest')}
              className={[ticketsBtn, state.ticketsSort === 'fastest' ? selected : null].join(' ')}
              type="button"
              value="Самый быстрый"
            />
          </div>
          <div className={tickets}>
            {state.filters.length === 0 || state.filteredTicketsArr.length === 0 ? (
              <Alert
                message="Рейсов, подходящих под заданные фильтры, не найдено"
                type="error"
                style={{ marginTop: '20px' }}
              />
            ) : null}
            {state.filteredTicketsArr.map((elem) => (
              <Ticket key={elem.price} price={elem.price} carrier={elem.carrier} segments={elem.segments} />
            ))}
            {!state.stop ? <Spin style={{ marginTop: '20px' }} /> : null}
          </div>
        </main>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => {
  const { changeSort, getTickets, setFilteredTickets } = bindActionCreators(actions, dispatch);

  return {
    changeSort,
    getTickets,
    setFilteredTickets,
  };
};

App.propTypes = {
  changeSort: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
  setFilteredTickets: PropTypes.func.isRequired,
  state: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
