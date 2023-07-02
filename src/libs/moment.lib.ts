import moment from 'moment';

export const getStartOfDay = (time?: Date | number) => {
  let result = moment();

  if (time) {
    if (typeof time === 'number') {
      result = moment.unix(time);
    } else {
      result = moment(time);
    }
  }

  return result.startOf('day').toISOString();
};

export const getValidFormat = (date: Date) => moment(date).format('DD.MM.YY HH:mm');
