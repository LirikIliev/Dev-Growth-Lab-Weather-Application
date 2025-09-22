import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { dateFromString } from '../../helpers/convertStringToDate';
import { ForecastContext } from '../../context/ForecastContext';
import { DailyDataInterface } from '../../types/forecastTypes';
import HourlyForecastTemplate from './HourlyForecastTemplate';
import { hourlyOrder } from '../../helpers/hourlyOrder';
import HourlyForecastTitle from './HourlyForecastTitle';

import classes from './HourlyForecastWrapper.module.scss';

enum DailyPart {
  Morning = 'Morning',
  Day = 'Day',
  Evening = 'Evening',
  Night = 'Night',
}

interface DailyParts {
  Morning?: DailyDataInterface[];
  Day?: DailyDataInterface[];
  Evening?: DailyDataInterface[];
  Night?: DailyDataInterface[];
}

const HourlyForecastWrapper: React.FC = () => {
  const [dailyForecast, setDailyForecast] = useState<
    Map<DailyPart, DailyDataInterface[]>
  >(new Map());

  const {
    dailyForecast: {
      timelines: { hourly = [] },
    },
  } = useContext(ForecastContext);

  useEffect(() => {
    if (!hourly.length) return;

    const forecastDailyData = hourly.reduce<
      Map<DailyPart, DailyDataInterface[]>
    >((acc, val) => {
      const { time } = val;
      const { hour } = dateFromString(time);
      const partOfTheDay = hourlyOrder(hour) as DailyPart;

      if (!acc.has(partOfTheDay)) {
        acc.set(partOfTheDay, [val]);
      } else {
        acc.get(partOfTheDay)!.push(val);
      }

      return acc;
    }, new Map<DailyPart, DailyDataInterface[]>());

    setDailyForecast(new Map(forecastDailyData));
  }, [hourly]);

  console.log(dailyForecast);

  const dailyInfoRender = useCallback(
    () =>
      Array.from(dailyForecast.entries()).map(([title, forecastData]) => {
        return (
          <div className={classes['Daily-forecast-info']}>
            <div className={classes['Daily-forecast-title']}>
              <p>{title}</p>
            </div>
            <div className={classes['Hourly-wrapper']}>
              {forecastData.map((hourDate) => (
                <HourlyForecastTemplate
                  key={hourDate.time}
                  values={hourDate.values}
                  time={hourDate.time}
                />
              ))}
            </div>
          </div>
        );
      }),
    [dailyForecast]
  );

  return (
    <div className={classes['Daily-forecast-wrapper']}>{dailyInfoRender()}</div>
  );
};

export default HourlyForecastWrapper;
