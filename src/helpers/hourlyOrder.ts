interface TimeOfTheDayInterface {
  [key: string]: string;
}

const timeOfTheDay: TimeOfTheDayInterface = {
  '06:00': 'Morning',
  '07:00': 'Morning',
  '08:00': 'Morning',
  '09:00': 'Morning',
  '10:00': 'Morning',
  '11:00': 'Morning',
  '12:00': 'Day',
  '13:00': 'Day',
  '14:00': 'Day',
  '15:00': 'Day',
  '16:00': 'Day',
  '17:00': 'Day',
  '18:00': 'Evening',
  '19:00': 'Evening',
  '20:00': 'Evening',
  '21:00': 'Evening',
  '22:00': 'Evening',
  '23:00': 'Evening',
  '00:00': 'Night',
  '01:00': 'Night',
  '02:00': 'Night',
  '03:00': 'Night',
  '04:00': 'Night',
  '05:00': 'Night',
};

export const hourlyOrder = (hour: string) => timeOfTheDay[hour];
