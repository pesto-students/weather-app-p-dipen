import ActionTypes from '../constants/ActionTypes';
import { CallWeather } from '../utils/common';
import { setCurrentLocationDetailCity } from './detail';

export const addCityToList = (data) => ({
  type: ActionTypes.ADD_CITY_TO_STORE,
  data,
});

export const removeCityFromList = (data) => ({
  type: ActionTypes.REMOVE_CITY_FROM_LIST,
  data,
});

export const addRemoveFavoriteCity = (data) => ({
  type: ActionTypes.ADD_REMOVE_FAVORITE_CITY,
  data,
});

export const initalLoad = (citiesToExclude = []) => {
  return (dispatch) => {
    let apiUrl =
      'https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q=&rows=15&sort=population';
    if (citiesToExclude) {
      apiUrl += citiesToExclude.reduce((resStr, city) => {
        resStr += `&exclude.city=${city}`;
        return resStr;
      }, '');
    }
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        let Cities = data.records.reduce((arr, data) => {
          arr.push(data.fields.city + ',' + data.fields.country);
          return arr;
        }, []);
        Cities.forEach((value) => {
          CallWeather(value)
            .then((weatherInfo) => {
              if (weatherInfo) {
                weatherInfo.cityname = value.split(',')[0];
                dispatch(addCityToList(weatherInfo));
              }
            })
            .catch((error) => console.log(error));
        });
      });
  };
};

export const loadCities = (cities, cb = () => {}, currentCity) => {
  return (dispatch) => {
    cities.forEach(async (value, index) => {
      console.log(value);
      try {
        let weatherInfo = await CallWeather(value);
        if (weatherInfo) {
          dispatch(addCityToList(weatherInfo));
        }
        if (currentCity) {
          dispatch(setCurrentLocationDetailCity(weatherInfo));
        }
        if (cities.length === index + 1) {
          if (cb) {
            cb();
          }
        }
      } catch (error) {
        console.log(error);
        if (cb) {
          cb();
        }
      }
    });
  };
};
