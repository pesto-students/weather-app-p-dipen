import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import SearchBarCity from '../components/SearchBarCity';
import BigText from '../components/BigText';
import Text from '../components/Text';
import { getCityWeatherDetail, setDetailCity, loadCities } from '../actions';
import { Container, Row, Col } from 'react-awesome-styled-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import SuggestionBox from '../components/SuggestionBox';
import { handleAutoComplete } from '../utils/common';
import _ from 'lodash';

const TextWithStyle = styled(Text)`
  cursor: pointer;
`;
class Header extends PureComponent {
  state = {
    searchInput: '',
    loadCurrentCity: false,
    suggestions: [],
    focus: false,
  };
  handleSelectSuggestions = (suggested) => {
    this.setState(() => ({ searchInput: suggested }));
    const { getCityWeatherDetail, history } = this.props;
    getCityWeatherDetail(suggested);
    history.push('/city');
  };
  handleChange = (e) => {
    this.setState({ searchInput: e.target.value });
    if (e.target.value !== '') {
      this.getSuggestionsList(e.target.value);
    } else {
      this.setState({ suggestions: [] });
    }
  };
  getSuggestionsList = _.debounce(async (city) => {
    try {
      this.setState(() => ({
        isFetching: true,
      }));
      let suggestions = await handleAutoComplete(city);
      this.setState({ suggestions: suggestions, isFetching: false });
    } catch (err) {
      console.error(err);
    }
  }, 500);

  goToDetails = (city) => {
    const { setDetailCity, history } = this.props;
    setDetailCity(city);
    history.push('/city');
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { searchInput } = this.state;
    const { getCityWeatherDetail, history } = this.props;
    getCityWeatherDetail(searchInput);
    history.push('/city');
  };
  loadCurrentCity = (e) => {
    e.stopPropagation();
    this.setState(() => ({ loadCurrentCity: true }));
    const { loadCities, userLocationCity: city } = this.props;
    let cities = [];
    cities.push(city.city + ',' + city.country);
    loadCities(cities, () => this.setState({ loadCurrentCity: false }), true);
  };
  inputFocus = (value) => {
    this.setState(() => ({ focus: value }));
  };
  render() {
    const { searchInput, loadCurrentCity, suggestions, focus } = this.state;
    const { userLocationCity: city } = this.props;
    return (
      <header>
        <Container>
          <Row justify="center">
            <Col justify="center" align={{ xs: 'center', md: 'flex-start' }}>
              <BigText letterSpacing="0.5px">Weather App</BigText>
            </Col>
            {Object.keys(city).length > 0 && (
              <Col justify="center" align="center">
                <TextWithStyle onClick={(e) => this.goToDetails(city)}>
                  Your City :- {city.city} {Math.floor(city.temp)}&#176;{' '}
                  <FontAwesomeIcon
                    icon={faSync}
                    size="xs"
                    spin={loadCurrentCity}
                    onClick={this.loadCurrentCity}
                  />
                </TextWithStyle>
              </Col>
            )}
            <Col
              justify="center"
              align={{ xs: 'center', md: 'flex-end' }}
              style={{ position: 'relative' }}
            >
              <SearchBarCity
                submit={this.handleSubmit}
                value={searchInput}
                change={this.handleChange}
                onFocus={this.inputFocus}
                focus={focus}
                suggestions={suggestions}
                handleSelectSuggestions={this.handleSelectSuggestions}
              />
              {/* {searchInput !== '' && focus && suggestions.length > 0 && (
                <SuggestionBox
                  suggestions={suggestions}
                  onChange={this.handleSelectSuggestions}
                />
              )} */}
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userLocationCity: state.getIn(['detail', 'userLocationCity']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  getCityWeatherDetail: (searchValue) =>
    dispatch(getCityWeatherDetail(searchValue)),
  setDetailCity: (data) => dispatch(setDetailCity(data)),
  loadCities: (data, cb, currentCity) =>
    dispatch(loadCities(data, cb, currentCity)),
});

Header.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getCityWeatherDetail: PropTypes.func.isRequired,
  userLocationCity: PropTypes.object,
  setDetailCity: PropTypes.func.isRequired,
};

const HeaderWithRouter = withRouter(Header);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithRouter);
