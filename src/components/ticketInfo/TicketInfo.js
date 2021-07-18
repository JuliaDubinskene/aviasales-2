import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import format from 'date-fns/format';
import set from 'date-fns/set';
import add from 'date-fns/add';
import PropTypes from 'prop-types';
import React from 'react';
import css from '../../app.module.css';

const { biletInfo, infoItem, infoItemTitle, infoItemText } = css;

const TicketInfo = (props) => {
  const { info } = props;
  const { origin, destination, stops, duration, date } = info;

  const hoursFromDate = getHours(new Date(date));
  const minutesFromDate = getMinutes(new Date(date));

  let otpravka = set(new Date(), {
    hours: hoursFromDate,
    minutes: minutesFromDate,
  });

  let hours;
  let minutes;
  if (duration > 59) {
    hours = Math.floor(duration / 60);
    minutes = duration % 60;
  }

  let pribitie = add(otpravka, { hours, minutes });

  otpravka = format(otpravka, 'HH:mm');
  pribitie = format(pribitie, 'HH:mm');

  return (
    <div className={biletInfo}>
      <div className={infoItem}>
        <span className={infoItemTitle}>
          {origin} – {destination}
        </span>
        <span className={infoItemText}>
          {otpravka} – {pribitie}
        </span>
      </div>
      <div className={infoItem}>
        <span className={infoItemTitle}>В пути</span>
        <span className={infoItemText}>
          {hours}ч {minutes}м
        </span>
      </div>
      <div className={infoItem}>
        <span className={infoItemTitle}>
          {stops.length === 0 ? 'без пересадок' : `${stops.length} пересадк${stops.length > 1 ? 'и' : 'а'}`}
        </span>
        <span className={infoItemText}>{stops.join(', ')}</span>
      </div>
    </div>
  );
};

TicketInfo.propTypes = {
  info: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default TicketInfo;
