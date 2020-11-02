import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MediumText from './MediumText';
import SmallText from './SmallText';
import mediaSize from '../constants/MediaSize';
import requireContext from 'require-context.macro';

const reqSvgs = requireContext(
  '../assets/weather_icon/animated',
  true,
  /\.svg$/,
);

const svgs = reqSvgs.keys().reduce((res, pth) => {
  res[
    pth
      .replace(/^.*[\\\/]/, '')
      .replace(/\.[^.]*$/, '')
      .replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase();
      })
  ] = reqSvgs(pth);
  return res;
}, {});

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 0px;
  }
`;

const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  @media ${mediaSize.mobileL} {
    flex-basis: 100%;
  }
  @media ${mediaSize.tablet} {
    flex-basis: 50%;
  }
`;

const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  img {
    width: 64px;
    height: 64px;
  }
`;

const TemperatureWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-content: center;
  flex-direction: column;
`;

const Temperature = styled.h3`
  display: block;
  font-size: 3rem;
  font-weight: 400;
  text-align: center;
`;

const DashboardCard = ({
  main,
  city,
  country,
  date,
  description,
  temp,
  color,
  day,
}) => {
  let weatherImg = '';

  if (main === 'Thunderstorm') {
    weatherImg = svgs.thunder;
  } else if (main === 'Drizzle') {
    weatherImg = svgs.rainy7;
  } else if (main === 'Rain') {
    weatherImg = day === 'd' ? svgs.rainy3 : svgs.rainy6;
  } else if (main === 'Snow') {
    weatherImg = day === 'd' ? svgs.snowy3 : svgs.snowy6;
  } else if (main === 'Clear') {
    weatherImg = day === 'd' ? svgs.day : svgs.night;
  } else if (main === 'Clouds') {
    weatherImg = day === 'd' ? svgs.cloudyDay3 : svgs.cloudyNight3;
  } else {
    weatherImg = svgs.cloudy;
  }
  return (
    <>
      <LocationWrapper>
        <MediumText weight="100" letterSpacing="0.5px">
          {city}, {country}
        </MediumText>
        <SmallText weight="100" letterSpacing="0px">
          {date}
        </SmallText>
      </LocationWrapper>
      <CurrentWeatherWrapper>
        <TemperatureWrapper>
          <Temperature>{Math.floor(temp)}&#176;</Temperature>
        </TemperatureWrapper>
        <WeatherIcon>
          <img src={weatherImg && weatherImg.default} alt={main} />
        </WeatherIcon>
      </CurrentWeatherWrapper>
      <SmallText weight="200" firstToUpperCase align="center">
        {description}
      </SmallText>
    </>
  );
};

DashboardCard.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  main: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  color: PropTypes.string,
  day: PropTypes.string,
};

export default DashboardCard;
