import ActionTypes from '../constants/ActionTypes';
import { CallWeather } from '../utils/common';

export const setDetailCity = (data) => ({
  type: ActionTypes.SET_DETAIL_CITY,
  data,
});

export const setCurrentLocationDetailCity = (data) => ({
  type: ActionTypes.SET_CURRENT_LOCATION_DETAIL_CITY,
  data,
});

export const loadDetailCity = () => ({
  type: ActionTypes.LOAD_DETAIL_CITY,
});

export const loadDetailCityError = (error) => ({
  type: ActionTypes.LOAD_DETAIL_CITY_ERROR,
  error,
});

export const getCityWeatherDetail = (cityname, latlon) => {
  return (dispatch) => {
    dispatch(loadDetailCity());
    CallWeather(cityname, latlon)
      .then((weatherInfo) => {
        if (weatherInfo) {
          dispatch(setDetailCity(weatherInfo));
        }
        if (latlon) {
          dispatch(setCurrentLocationDetailCity(weatherInfo));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(loadDetailCityError(error));
      });
  };
};
