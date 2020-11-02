const OpenWeatherApiUrl = 'https://api.openweathermap.org/data/2.5';
const CityNameApiUrl =
  'https://parseapi.back4app.com/classes/Continentscountriescities_City';

export const CallWeather = (city, latlon) => {
  const APIkey = process.env.REACT_APP_weatherApiKey;
  const weather = `${OpenWeatherApiUrl}/weather?APPID=${APIkey}&units=metric${
    city ? `&q=${city}` : ''
  }${latlon ? `&lat=${latlon.lat}&lon=${latlon.lon}` : ''}`;
  const forecast = `${OpenWeatherApiUrl}/forecast?APPID=${APIkey}&units=metric${
    city ? `&q=${city}` : ''
  }${latlon ? `&lat=${latlon.lat}&lon=${latlon.lon}` : ''}`;
  return Promise.all([fetch(weather), fetch(forecast)])
    .then(([res1, res2]) => {
      if (res1.ok && res2.ok) {
        return Promise.all([res1.json(), res2.json()]);
      }
      throw Error(res1.statusText, res2.statusText);
    })
    .then(([data1, data2]) => {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'Nocvember',
        'December',
      ];
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const currentDate = new Date();
      const date = `${days[currentDate.getDay()]}, ${currentDate.getDate()} ${
        months[currentDate.getMonth()]
      }`;
      const sunset = new Date(data1.sys.sunset * 1000)
        .toLocaleTimeString()
        .slice(0, 5);
      const sunrise = new Date(data1.sys.sunrise * 1000)
        .toLocaleTimeString()
        .slice(0, 5);

      const weatherInfo = {
        city: data1.name,
        country: data1.sys.country,
        date,
        description: data1.weather[0].description,
        main: data1.weather[0].main,
        temp: data1.main.temp,
        highestTemp: data1.main.temp_max,
        lowestTemp: data1.main.temp_min,
        sunrise,
        sunset,
        clouds: data1.clouds.all,
        humidity: data1.main.humidity,
        wind: data1.wind.speed,
        forecast: data2.list,
        day: data1.weather[0].icon.split('')[2],
      };
      return Promise.resolve(weatherInfo);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

export const handleLocationPermission = async () => {
  const geolocation = navigator.geolocation;
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude.toFixed(2),
          lon: position.coords.longitude.toFixed(2),
        });
      },
      () => {
        reject(new Error('Permission denied'));
      },
    );
  });
  return location;
};

export const handleAutoComplete = async (city) => {
  const suggestionList = new Promise((resolve, reject) => {
    const where = encodeURIComponent(
      JSON.stringify({
        name: {
          $regex: `^${city.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })}`,
        },
      }),
    );
    fetch(`${CityNameApiUrl}?limit=10&keys=name&where=${where}`, {
      headers: {
        'X-Parse-Application-Id': process.env.REACT_APP_Application_Id, // This is your app's application id
        'X-Parse-REST-API-Key': process.env.REACT_APP_REST_API_Key, // This is your app's REST API key
      },
    })
      .then((response) => response.json())
      .then((res) =>
        resolve(
          res.results.reduce((list, city) => {
            list.push(city.name);
            return list;
          }, []),
        ),
      )
      .catch((err) => console.log(err));
  });
  return suggestionList;
};
