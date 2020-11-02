import React from "react";
import DashboardCard from "./DashboardCard";
import PropTypes from "prop-types";
import { Col } from "react-awesome-styled-grid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";

const StyleCol = styled(Col)`
  background-color: #ffffff;
  box-shadow: var(--light-shadow);
  border-radius: 10px;
  margin: 5px;
  padding: 10px;
  position: relative;
  &:hover {
    cursor: pointer;
    box-shadow: var(--dark-shadow);
  }
  @media only screen and (min-width: 64rem) {
    max-width: fit-content;
    min-width: 18%;
    flex: none;
    flex-basis: auto;
    flex-grow: auto;
  }
`;
const GroupIcon = styled.span`
  position: absolute;
  bottom: 0px;
  left: 1px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  font-size: 20px;
  margin-top: 10px;
  .remove {
    margin-right: 10px;
    color: var(--clr-red-light);
    &:hover {
      color: var(--clr-red-dark);
    }
  }
  .star {
    margin-right: 10px;
    color: ${({ favorite }) =>
      favorite ? "var(--clr-yellow-dark)" : "var(--clr-yellow-light)"};
    &:hover {
      color: ${({ favorite }) =>
        favorite ? "var(--clr-yellow-light)" : "var(--clr-yellow-dark)"};
    }
  }
`;
const CitiesList = ({
  city,
  favorite = false,
  goToDetails,
  addRemoveFavorite,
  deleteCity,
}) => (
  <StyleCol onClick={() => goToDetails(city)}>
    <DashboardCard
      city={city.city}
      country={city.country}
      date={city.date}
      temp={city.temp}
      main={city.main}
      description={city.description}
      day={city.day}
    />
    <GroupIcon favorite={favorite}>
      <FontAwesomeIcon
        icon={faStar}
        onClick={(e) => addRemoveFavorite(e, city.city)}
        className="star"
      />
      <FontAwesomeIcon
        icon={faTimes}
        onClick={(e) => deleteCity(e, city.city)}
        className="remove"
      />
    </GroupIcon>
  </StyleCol>
);

CitiesList.propTypes = {
  city: PropTypes.shape({
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
    day: PropTypes.string,
  }).isRequired,
  favorite: PropTypes.bool,
  goToDetails: PropTypes.func.isRequired,
  addRemoveFavorite: PropTypes.func.isRequired,
  deleteCity: PropTypes.func.isRequired,
  color: PropTypes.string,
};

export default CitiesList;
