import { useContext, useMemo } from 'react';

import Icon from '../../icons/Icon';
import { TEMPERATURE_TYPE } from '../../helpers/config';
import { ProgramDataInterface } from '../../types/forecastTypes';
import { dateFromString } from '../../helpers/convertStringToDate';
import { ForecastContext } from '../../context/ForecastContext';
import { weatherDailyCodes } from '../../helpers/forecastIconCodes';
import { useMobileScreenDetection } from '../../hooks/useMobileScreenDetection';

import classes from './ForecastProgramTemplate.module.scss';

interface DayInterface {
  dayData: ProgramDataInterface;
}

const DailyForecastTemplate: React.FC<DayInterface> = ({ dayData }) => {
  const {
    time,
    values: {
      temperatureMin,
      temperatureMinFahrenheit,
      temperatureMax,
      temperatureMaxFahrenheit,
      weatherCodeMax,
    },
  } = dayData;
  const { typeOfTemperature, setIsModalOpen, setDetailForecast } =
    useContext(ForecastContext);
  const { day, dateOfMonth, month } = dateFromString(time);
  const { isMobile } = useMobileScreenDetection();

  const showModalWithDetailInformation = () => {
    const { time, values } = dayData;
    setDetailForecast({ time, values });
    setIsModalOpen(true);
  };

  const minTemperature = useMemo(
    () =>
      typeOfTemperature === TEMPERATURE_TYPE.celsius
        ? `${Math.round(temperatureMin * 2) / 2} ${TEMPERATURE_TYPE.celsius}`
        : `${
            typeof temperatureMinFahrenheit === 'number'
              ? Math.round(temperatureMinFahrenheit * 2) / 2
              : temperatureMinFahrenheit
          } ${TEMPERATURE_TYPE.fahrenheit}`,
    [temperatureMin, temperatureMinFahrenheit, typeOfTemperature]
  );
  const maxTemperature = useMemo(
    () =>
      typeOfTemperature === TEMPERATURE_TYPE.celsius
        ? `${Math.round(temperatureMax * 2) / 2} ${TEMPERATURE_TYPE.celsius}`
        : `${
            typeof temperatureMaxFahrenheit === 'number'
              ? Math.round(temperatureMaxFahrenheit * 2) / 2
              : temperatureMaxFahrenheit
          } ${TEMPERATURE_TYPE.fahrenheit}`,
    [temperatureMax, temperatureMaxFahrenheit, typeOfTemperature]
  );

  return (
    <button
      className={classes['Wrapper']}
      onClick={showModalWithDetailInformation}
    >
      <div className={classes['TitleWrapper']}>
        <h1 className={classes['Day']}>{day}</h1>
        <h3
          className={classes['Date-in-month']}
        >{`${month} ${dateOfMonth}`}</h3>
      </div>
      <div className={classes['BodyWrapper']}>
        <Icon
          iconName={
            weatherDailyCodes[weatherCodeMax]
              ? weatherDailyCodes[weatherCodeMax]
              : weatherDailyCodes[0]
          }
          size={isMobile ? 35 : 60}
          metrics="px"
        />
        {temperatureMin ? (
          <p className={classes['Data']}>
            min <strong>{minTemperature}</strong>
          </p>
        ) : null}
        {temperatureMax ? (
          <p className={classes['Data']}>
            max
            <strong>{maxTemperature}</strong>
          </p>
        ) : null}
      </div>
      <div className={classes['Detail-button']}>Details</div>
    </button>
  );
};

export default DailyForecastTemplate;
