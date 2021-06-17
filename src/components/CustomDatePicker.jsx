import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import DP from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DPWrapper = styled.div`
  ${({
    isOpen,
    theme: { white, blue, lightBlue, darkBlue, borderRadiusStandard },
  }) => css`
    align-items: center;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    padding: 2px 0px;
    position: relative;
    width: auto;
    transition: all 0.2s;
    color: ${isOpen ? blue : darkBlue};

    :hover,
    &:focus {
      color: ${blue};

      input {
        color: ${blue};
      }
    }

    .react-datepicker-wrapper {
      width: 100%;
    }

    input {
      cursor: pointer;
      border: none;
      font-weight: bold;
      transition: all 0.2s;
      width: 100%;
      color: ${isOpen ? blue : darkBlue};

      &:focus {
        outline: none;
      }

      &:disabled {
        cursor: auto;
        background-color: transparent;

        &:hover {
          color: ${darkBlue};
        }
      }
    }

    .react-datepicker-popper[data-placement^='bottom']
      .react-datepicker__triangle::before,
    .react-datepicker-popper[data-placement^='top']
      .react-datepicker__triangle::before,
    .react-datepicker-popper[data-placement^='bottom']
      .react-datepicker__triangle::after,
    .react-datepicker-popper[data-placement^='top']
      .react-datepicker__triangle::after {
      left: -200px;
    }

    .react-datepicker-popper[data-placement^='bottom']
      .react-datepicker__triangle,
    .react-datepicker-popper[data-placement^='bottom']
      .react-datepicker__triangle::before {
      border-bottom-color: ${blue};
    }
    .react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle,
    .react-datepicker-popper[data-placement^='top']
      .react-datepicker__triangle::before {
      border-top-color: ${blue};
    }

    .react-datepicker__current-month,
    .react-datepicker__day-name {
      color: ${white};
    }

    .react-datepicker__navigation--next {
      border-left-color: ${white};
      transition: all 0.2s;

      &:hover {
        border-left-color: #b3b3b3;
      }
    }

    .react-datepicker__navigation--previous {
      border-right-color: ${white};
      transition: all 0.2s;

      &:hover {
        border-right-color: #b3b3b3;
      }
    }

    .react-datepicker__day--selected {
      background-color: ${blue};

      &:hover {
        background-color: ${lightBlue};
      }
    }

    .react-datepicker__header,
    .react-datepicker__today-button {
      background-color: ${blue};
      border-bottom-color: ${blue};
      color: ${white};
    }

    .react-datepicker__today-button {
      border-radius: ${borderRadiusStandard};
      transition: all 0.2s;

      &:hover {
        background-color: ${lightBlue};
      }
    }

    .react-datepicker__day {
      transition: all 0.2s;

      &--today {
        border-radius: 0.3em;
        border: 2px solid ${blue};
      }

      &--keyboard-selected {
        background-color: ${lightBlue};
      }

      &:focus {
        outline: none;
      }
    }

    .react-datepicker__time-container--with-today-button {
      right: -85px;
    }

    .react-datepicker-time__header {
      color: ${white};
    }

    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item--selected {
      background-color: ${blue};
      color: white;
      font-weight: bold;
    }

    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item:hover {
      cursor: pointer;
      background-color: ${lightBlue};
    }
  `};
`;

const Chevron = styled.div`
  transition: transform 0.2s;
  transform: ${({ isOpen }) => isOpen && 'rotate(180deg)'};
  position: absolute;
  right: 0;
`;

const DatePicker = ({ onChange, disabled }) => {
  /*
 TODO: Decide whether to convert a date into the UTC format.
  Make the date picker return the UTC time zone
 */
  const today = moment().startOf().toDate();
  const minDate = today;

  const [date, setDate] = useState(today);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newDate) => {
    setDate(newDate);
    // TODO: Refactor. The component is bind to the specific onChange method.
    onChange(newDate);
  };

  return (
    <DPWrapper isOpen={isOpen}>
      <DP
        selected={date}
        onChange={handleChange}
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={minDate}
        todayButton="Today"
        showTimeSelect
        timeIntervals={1}
        onCalendarOpen={() => setIsOpen(true)}
        onCalendarClose={() => setIsOpen(false)}
        disabled={disabled}
      />
      {!disabled && (
        <Chevron isOpen={isOpen}>
          <FontAwesomeIcon icon="chevron-down" />
        </Chevron>
      )}
    </DPWrapper>
  );
};

DatePicker.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
DatePicker.defaultProps = {
  onChange: () => null,
  disabled: false,
};

export default DatePicker;
