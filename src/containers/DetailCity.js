import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Result from '../components/Result';
import Text from '../components/Text';
import { Container, Row, Col } from 'react-awesome-styled-grid';
import NotFound from '../components/NotFound';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  getCityWeatherDetail,
  addRemoveFavoriteCity,
  addCityToList,
  setDetailCity,
} from '../actions';

const ContainerWithStyle = styled(Container)`
  min-height: 100vh;
`;
const LinkWithStyle = styled(Link)`
  color: inherit;
`;
const Favorite = styled.span`
  .star {
    margin-left: 10px;
    color: ${({ favorite }) =>
      favorite ? 'var(--clr-yellow-dark)' : 'var(--clr-yellow-light)'};
  }

  &:hover {
    cursor: pointer;
    .star {
      color: ${({ favorite }) =>
        favorite ? 'var(--clr-yellow-light)' : 'var(--clr-yellow-dark)'};
    }
  }
`;
export class DetailCity extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    const { match, history, getCityWeatherDetail } = this.props;
    if (match.path === '/city/:cityname') {
      if (
        Object.keys(match.params).length > 0 &&
        Object.keys(match.params).indexOf('cityname') > -1
      ) {
        console.log('after update');
        getCityWeatherDetail(match.params.cityname);
      } else {
        history.push('/');
      }
    }
  }
  componentWillUnmount() {
    const { setDetailCity } = this.props;
    setDetailCity({});
  }
  addRemoveFavorite = (e, city) => {
    e.preventDefault();
    const { addRemoveFavoriteCity, addCityToList } = this.props;
    addRemoveFavoriteCity(city.city);
    addCityToList(city);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      console.log(prevProps, this.props);
      this.props.getCityWeatherDetail(this.props.match.params.cityname);
      this.forceUpdate();
    }
  }
  render() {
    const { city, error, loader, favorites } = this.props;
    let favorite = favorites.indexOf(city.city) !== -1;
    return (
      <ContainerWithStyle>
        <Row>
          <Col>
            <Text>
              <LinkWithStyle to="/">
                <FontAwesomeIcon icon={faArrowLeft} /> Go To Dashboard
              </LinkWithStyle>
            </Text>
          </Col>
          {!error && !loader && (
            <Col align="flex-end">
              <Favorite favorite={favorite}>
                <Text onClick={(e) => this.addRemoveFavorite(e, city)}>
                  {favorite ? `Remove From ` : `Add to `}
                  Favorite List
                  <FontAwesomeIcon icon={faStar} className="star" />
                </Text>
              </Favorite>
            </Col>
          )}
        </Row>
        <Row>
          {loader && <Loader />}
          {city && Object.keys(city).length > 0 && (
            <>
              <Result weather={city} />
            </>
          )}
          {error && <NotFound />}
        </Row>
      </ContainerWithStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  city: state.getIn(['detail', 'city']).toJS(),
  loader: state.getIn(['detail', 'loader']),
  error: state.getIn(['detail', 'error']),
  favorites: state.getIn(['initalLoad', 'favorites']).toJS(),
  userLocationCity: state.getIn(['detail', 'userLocationCity']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  addRemoveFavoriteCity: (name) => dispatch(addRemoveFavoriteCity(name)),
  addCityToList: (data) => dispatch(addCityToList(data)),
  getCityWeatherDetail: (searchValue) =>
    dispatch(getCityWeatherDetail(searchValue)),
  setDetailCity: (data) => dispatch(setDetailCity(data)),
});

DetailCity.protypes = {
  city: PropTypes.object.isRequired,
  loader: PropTypes.bool.isRequired,
  error: PropTypes.object,
  favorities: PropTypes.array.isRequired,
  addRemoveFavoriteCity: PropTypes.func.isRequired,
  addCityToList: PropTypes.func.isRequired,
  getCityWeatherDetail: PropTypes.func.isRequired,
  setDetailCity: PropTypes.func.isRequired,
};

const DetailCityWithRouter = withRouter(DetailCity);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailCityWithRouter);
