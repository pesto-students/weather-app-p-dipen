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
import { addRemoveFavoriteCity, addCityToList } from '../actions';

const ContainerWithStyle = styled(Container)``;
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
  }
  addRemoveFavorite = (e, city) => {
    e.preventDefault();
    const { addRemoveFavoriteCity, addCityToList } = this.props;
    addRemoveFavoriteCity(city.city);
    addCityToList(city);
  };
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
});

const mapDispatchToProps = (dispatch) => ({
  addRemoveFavoriteCity: (name) => dispatch(addRemoveFavoriteCity(name)),
  addCityToList: (data) => dispatch(addCityToList(data)),
});

DetailCity.protypes = {
  city: PropTypes.object.isRequired,
  loader: PropTypes.bool.isRequired,
  error: PropTypes.object,
  favorities: PropTypes.array.isRequired,
  addRemoveFavoriteCity: PropTypes.func.isRequired,
  addCityToList: PropTypes.func.isRequired,
};

const DetailCityWithRouter = withRouter(DetailCity);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailCityWithRouter);
