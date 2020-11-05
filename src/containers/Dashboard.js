import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  initalLoad,
  setDetailCity,
  removeCityFromList,
  addRemoveFavoriteCity,
  getCityWeatherDetail,
  loadCities,
} from '../actions';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-awesome-styled-grid';
import BigText from '../components/BigText';
import { withRouter } from 'react-router';
import SmallText from '../components/SmallText';
import Text from '../components/Text';
import CitiesList from '../components/CitiesList';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { handleLocationPermission } from '../utils/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const SmallTextWithStyle = styled(SmallText)`
  margin-left: 10px;
  font-size: 1.5rem;
`;
const RefreshData = styled.span`
  position: relative;
`;
const FontAwesomeIconStyle = styled(FontAwesomeIcon)`
  cursor: pointer;
  bottom: 0.5px;
  right: 0px;
  position: absolute;
`;
const LoadMoreButton = styled.div`
  cursor: pointer;
  flex-basis: 100%;
  text-align: center;
  margin: 30px 0px;
  span {
    padding: 10px;
    border: solid;
    display: inline;
    &:hover {
      background: white;
      transition: 0.2s ease-in;
    }
  }
`;
export class Dashboard extends Component {
  state = {
    loader: {
      favorite: false,
      cities: false,
    },
  };
  componentDidMount() {
    const { initalLoad } = this.props;
    initalLoad();
    if ('geolocation' in navigator) {
      this.getlocation();
    }
  }
  getlocation = async () => {
    const { getCityWeatherDetail, history } = this.props;
    try {
      let result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted') {
        const latlon = await handleLocationPermission();
        if (latlon) {
          getCityWeatherDetail(null, latlon);
        }
      }
      if (result.state === 'prompt') {
        const latlon = await handleLocationPermission();
        if (latlon) {
          getCityWeatherDetail(null, latlon);
          history.push('/citycurrentlocation');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  goToDetails = (city) => {
    const { setDetailCity, history } = this.props;
    setDetailCity(city);
    history.push(`/city/${city.city}`);
  };
  deleteCity = (e, cityName) => {
    e.stopPropagation();
    const { removeCityFromList } = this.props;
    removeCityFromList(cityName);
  };
  addRemoveFavorite = (e, cityName) => {
    e.stopPropagation();
    const { addRemoveFavoriteCity } = this.props;
    addRemoveFavoriteCity(cityName);
  };
  loadCurrentWeatherCities = (cities, loader) => {
    this.setState(() => ({ loader: { [loader]: true } }));
    const { loadCities } = this.props;
    loadCities(cities, () =>
      this.setState(() => ({ loader: { [loader]: false } })),
    );
  };
  loadMoreCities = (e) => {
    e.preventDefault();
    const { cities, initalLoad } = this.props;
    initalLoad(
      Object.keys(cities).reduce((res, key) => {
        let city = cities[key];
        res.push(city.cityname || city.city.toLowerCase());
        return res;
      }, []),
    );
  };
  render() {
    const { cities, removeList, favorites } = this.props;
    const { loader } = this.state;
    let citiesList =
      cities &&
      Object.keys(cities)
        .filter((city) => removeList.indexOf(city) === -1)
        .filter((city) => favorites.indexOf(city) === -1)
        .reduce((res, city) => {
          res[city] = cities[city];
          return res;
        }, {});
    let favcitiesList =
      cities &&
      Object.keys(cities)
        .filter((city) => removeList.indexOf(city) === -1)
        .filter((city) => favorites.indexOf(city) > -1)
        .reduce((res, city) => {
          res[city] = cities[city];
          return res;
        }, {});

    return (
      <Container>
        <Row justify="center">
          <BigText letterSpacing="0.5px" weight="200">
            Dashboard
          </BigText>
        </Row>
        {Object.keys(favcitiesList).length > 0 && (
          <>
            <Row align="baseline" justify="space-between">
              <SmallTextWithStyle weight="300" letterSpacing="0.5px">
                Favorite City List
              </SmallTextWithStyle>

              <RefreshData>
                <FontAwesomeIconStyle
                  icon={faSync}
                  spin={loader.favorite}
                  onClick={(e) =>
                    this.loadCurrentWeatherCities(
                      Object.keys(favcitiesList),
                      'favorite',
                    )
                  }
                />
              </RefreshData>
            </Row>
            <Row justify="center">
              <TransitionGroup component={null}>
                {Object.keys(favcitiesList)
                  .sort()
                  .map((key) => (
                    <CSSTransition timeout={500} classNames="item" key={key}>
                      <CitiesList
                        city={favcitiesList[key]}
                        key={favcitiesList[key]['city']}
                        favorite={true}
                        goToDetails={this.goToDetails}
                        addRemoveFavorite={this.addRemoveFavorite}
                        deleteCity={this.deleteCity}
                      />
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </Row>
          </>
        )}
        <Row align="baseline" justify="space-between">
          <SmallTextWithStyle weight="300" letterSpacing="0.5px">
            City List
          </SmallTextWithStyle>
          {Object.keys(citiesList).length > 0 && (
            <RefreshData>
              <FontAwesomeIconStyle
                icon={faSync}
                spin={loader.cities}
                onClick={(e) =>
                  this.loadCurrentWeatherCities(
                    Object.keys(citiesList),
                    'cities',
                  )
                }
              />
            </RefreshData>
          )}
        </Row>
        <Row justify="center">
          {Object.keys(citiesList).length > 0 ? (
            <>
              <TransitionGroup component={null}>
                {Object.keys(citiesList)
                  .sort()
                  .map((key) => (
                    <CSSTransition timeout={500} classNames="item" key={key}>
                      <CitiesList
                        city={citiesList[key]}
                        key={citiesList[key]['city']}
                        favorite={false}
                        goToDetails={this.goToDetails}
                        addRemoveFavorite={this.addRemoveFavorite}
                        deleteCity={this.deleteCity}
                      />
                    </CSSTransition>
                  ))}
              </TransitionGroup>
              <LoadMoreButton onClick={this.loadMoreCities}>
                <Text>Load More Cities</Text>
              </LoadMoreButton>
            </>
          ) : (
            <Text>Empty List</Text>
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.getIn(['initalLoad', 'cities']).toJS(),
  removeList: state.getIn(['initalLoad', 'removeList']).toJS(),
  favorites: state.getIn(['initalLoad', 'favorites']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  initalLoad: (cities) => dispatch(initalLoad(cities)),
  setDetailCity: (data) => dispatch(setDetailCity(data)),
  removeCityFromList: (name) => dispatch(removeCityFromList(name)),
  addRemoveFavoriteCity: (name) => dispatch(addRemoveFavoriteCity(name)),
  getCityWeatherDetail: (cityname, latlon) =>
    dispatch(getCityWeatherDetail(cityname, latlon)),
  loadCities: (data, cb) => dispatch(loadCities(data, cb)),
});

Dashboard.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  initalLoad: PropTypes.func.isRequired,
  setDetailCity: PropTypes.func.isRequired,
  cities: PropTypes.object,
  removeList: PropTypes.array,
  favorites: PropTypes.array,
  removeCityFromList: PropTypes.func.isRequired,
  addRemoveFavoriteCity: PropTypes.func.isRequired,
  getCityWeatherDetail: PropTypes.func.isRequired,
};

const DashboardWithRouter = withRouter(Dashboard);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardWithRouter);
