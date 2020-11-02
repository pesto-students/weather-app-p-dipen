import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BigText from '../BigText';
import SmallText from '../SmallText';
import mediaSize from '../../constants/MediaSize';
import requireContext from 'require-context.macro';

const reqSvgs = requireContext(
  '../../assets/weather_icon/animated',
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
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${mediaSize.mobileL} {
    flex-basis: 100%;
    padding-right: 10px;
    margin-top: 10px;
  }
  @media ${mediaSize.tablet} {
    flex-basis: 50%;
    margin: 20px 0;
    padding-right: 20px;
  }
`;

const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  @media ${mediaSize.tablet} {
    justify-content: flex-end;
  }
  img {
    width: 10rem;
    height: 10rem;
  }
`;

const TemperatureWrapper = styled.div`
  margin-left: 10px;
`;

const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: #ffffff;
  @media ${mediaSize.tablet} {
    font-size: 70px;
  }
  @media ${mediaSize.laptop} {
    font-size: 90px;
  }
  @media ${mediaSize.laptopL} {
    font-size: 110px;
  }
`;

const Card = ({ main, city, country, date, description, temp, color, day }) => {
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
        <BigText weight="100" letterSpacing="0.5px">
          {city}, {country}
        </BigText>
        <SmallText weight="100" letterSpacing="0px">
          {date}
        </SmallText>
      </LocationWrapper>
      <CurrentWeatherWrapper className="weatherWrapper">
        <WeatherIcon>
          <img src={weatherImg && weatherImg.default} alt={main} />
        </WeatherIcon>
        <TemperatureWrapper>
          <Temperature>{Math.floor(temp)}&#176;</Temperature>
          <SmallText weight="400" firstToUpperCase color={color}>
            {description}
          </SmallText>
        </TemperatureWrapper>
      </CurrentWeatherWrapper>
    </>
  );
};

Card.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  main: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default Card;
