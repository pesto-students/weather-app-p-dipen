import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SmallText from "./SmallText";
import Text from "./Text";
import mediaSize from "../constants/MediaSize";

const ForecastWrapper = styled.div`
  flex-shrink: 0;
  flex-grow: 1;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media ${mediaSize.tablet} {
    flex-basis: 110px;
  }
  @media ${mediaSize.laptop} {
    flex-basis: 125px;
  }
  @media ${mediaSize.laptopL} {
    flex-basis: 140px;
  }
`;

const WeatherIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;

const ForecastHour = ({ temp, month, day, hour, icon }) => {
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

  return (
    <ForecastWrapper>
      <Text align="center">
        {month}/{day}
      </Text>
      <Text align="center">{hour}:00</Text>
      <WeatherIcon src={iconUrl} />
      <SmallText align="center" weight="400">
        {temp}&#176;
      </SmallText>
    </ForecastWrapper>
  );
};

ForecastHour.propTypes = {
  temp: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  hour: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

export default ForecastHour;
