import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import mediaSize from "../constants/MediaSize";
import ForecastHour from "./ForecastHour";
import MediumText from "./MediumText";
import SmallText from "./SmallText";
import Text from "./Text";
import Card from "./Card";

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  overflow: hidden;
  top: 20px;
  .weatherWrapper {
    background: rgb(16, 42, 66, 0.5);
    border-radius: 10px;
    h4 {
      color: var(--clr-white);
    }
  }
`;

const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  align-self: flex-start;
  @media ${mediaSize.mobileL} {
    flex-basis: 100%;
    margin: 0px 0px 10px 0px;
  }
  @media ${mediaSize.tablet} {
    flex-basis: 50%;
    margin: 20px 0;
  }
`;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media ${mediaSize.laptop} {
    padding: 20px 10px;
  }
`;

const ForecastWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Forecast = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;

  -webkit-flex: 1;
  flex: 1;

  @media ${mediaSize.laptop} {
    order: 4;
  }
`;

const Result = ({ weather }) => {
  const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    forecast,
    day,
  } = weather;

  const forecasts = forecast.map((item) => (
    <ForecastHour
      key={item.dt}
      temp={Math.floor(item.main.temp * 1) / 1}
      icon={item.weather[0].icon}
      month={item.dt_txt.slice(5, 7)}
      day={item.dt_txt.slice(8, 10)}
      hour={item.dt_txt.slice(11, 13) * 1}
    />
  ));

  return (
    <Results>
      <Card
        city={city}
        country={country}
        date={date}
        temp={temp}
        main={main}
        description={description}
        day={day}
      />
      <WeatherDetailsWrapper>
        <WeatherDetail>
          <SmallText align="center" weight="400">
            {Math.floor(highestTemp)}&#176;
          </SmallText>
          <Text align="center">Hight</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallText align="center" weight="400">
            {wind}mph
          </SmallText>
          <Text align="center">Wind</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallText align="center" weight="400">
            {sunrise}
          </SmallText>
          <Text align="center">Sunrise</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallText align="center" weight="400">
            {Math.floor(lowestTemp)}&#176;
          </SmallText>
          <Text align="center">Low</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallText align="center" weight="400">
            {humidity}%
          </SmallText>
          <Text align="center">Rain</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallText align="center" weight="400">
            {sunset}
          </SmallText>
          <Text align="center">Sunset</Text>
        </WeatherDetail>
      </WeatherDetailsWrapper>
      <ForecastWrapper>
        <MediumText weight="400">Forecast</MediumText>
        <Forecast>{forecasts}</Forecast>
      </ForecastWrapper>
    </Results>
  );
};

Result.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    main: PropTypes.string,
    temp: PropTypes.number,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    humidity: PropTypes.number,
    wind: PropTypes.number,
    highestTemp: PropTypes.number,
    lowestTemp: PropTypes.number,
    forecast: PropTypes.array,
  }).isRequired,
};

export default Result;
