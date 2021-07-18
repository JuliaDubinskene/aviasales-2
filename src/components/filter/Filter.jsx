import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import css from '../../app.module.css';
import * as actions from '../../actions/actions';

const { filterContainer, filter, filterItem, title } = css;

const Filter = (props) => {
  const { filters, changeFilter } = props;
  return (
    <div className={filterContainer}>
      <div className={title}>Количество пересадок</div>
      <ul className={filter}>
        <li>
          <label className={filterItem}>
            <input type="checkbox" onClick={() => changeFilter('all')} checked={filters.length === 4 ? '1' : ''} />
            Все
          </label>
        </li>
        <li>
          <label className={filterItem}>
            <input type="checkbox" onClick={() => changeFilter(0)} checked={filters.indexOf(0) !== -1 ? '1' : ''} />
            Без пересадок
          </label>
        </li>
        <li>
          <label className={filterItem}>
            <input type="checkbox" onClick={() => changeFilter(1)} checked={filters.indexOf(1) !== -1 ? '1' : ''} />1
            пересадка
          </label>
        </li>
        <li>
          <label className={filterItem}>
            <input type="checkbox" onClick={() => changeFilter(2)} checked={filters.indexOf(2) !== -1 ? '1' : ''} />2
            пересадки
          </label>
        </li>
        <li>
          <label className={filterItem}>
            <input type="checkbox" onClick={() => changeFilter(3)} checked={filters.indexOf(3) !== -1 ? '1' : ''} />3
            пересадки
          </label>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({ filters: state.filters });

const mapDispatchToProps = (dispatch) => {
  const { changeSort, changeFilter } = bindActionCreators(actions, dispatch);

  return {
    changeSort,
    changeFilter,
  };
};

Filter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filters: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
