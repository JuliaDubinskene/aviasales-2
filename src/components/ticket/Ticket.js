import React from 'react';
import PropTypes from 'prop-types';
import css from '../../app.module.css';
import logo from '../../img/s7logo.png';
import TicketInfo from '../ticketInfo/TicketInfo';

const { ticket, ticketHeader, ticketPrice, ticketLogo } = css;

const Ticket = (props) => {
  const { carrier, segments } = props;
  let { price } = props;

  if (String(price).split('').length > 3) {
    price = String(price).split(''); 
    price.splice(price.length - 3, 0, ' '); 
    price = price.join('');
  }

  segments.sort((aElem, bElem) => aElem.stops.length - bElem.stops.length);

  return (
    <div className={ticket}>
      <header className={ticketHeader}>
        <div className={ticketPrice}>{`${price} Р`}</div>
        <div className={ticketLogo}>
          <img src={logo} alt="carrier logo" />
          {carrier}
        </div>
      </header>
      {segments.map((elem) => (
        <TicketInfo key={elem.duration} info={elem} />
      ))}
    </div>
  );
};

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default Ticket;
