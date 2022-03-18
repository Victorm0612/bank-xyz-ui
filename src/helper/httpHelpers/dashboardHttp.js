/* eslint-disable import/prefer-default-export */
import axiosInstance from '../../config/axiosConfig';
// eslint-disable-next-line global-require
const moment = require('moment').default || require('moment');

const axios = axiosInstance;
const TODAY = moment().format('YYYY-MM-DD');
const MONTH = moment().format('MM');

export const getStatistics = async (token, locationId, day, month) => {
  let daySelected = TODAY;
  let monthSelected = MONTH;
  if (day && month) {
    daySelected = day;
    monthSelected = month;
  }
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const topTypeServices = await axios.get(
      `getLocationUseData/${locationId}`,
      headers
    );
    const averageWait = await axios.get(
      `getAvgTimeByLocation/${locationId}`,
      headers
    );
    const clientsByDay = await axios.get(
      `getClientsByDay/${locationId}/${daySelected}`,
      headers
    );
    const clientsByMonth = await axios.get(
      `getClientsByMonth/${locationId}/${monthSelected}`,
      headers
    );
    return {
      topTypeServices: topTypeServices.data,
      averageWait: averageWait.data,
      clientsByDay: clientsByDay.data,
      clientsByMonth: clientsByMonth.data
    };
  } catch (error) {
    throw error.message;
  }
};
