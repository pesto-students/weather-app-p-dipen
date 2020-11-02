import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px auto 0;
  padding: 20px;
  position: relative;
  border-radius: 10px;
  top: 20px;
`;

const LoaderIcon = styled.span`
  display: block;
  text-align: center;
  color: #ffffff;
  font-size: 40px;
  margin-right: 10px;
`;

const LoaderText = styled.span`
  display: block;
  text-align: center;
  color: #ffffff;
  font-size: 17px;
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderIcon>
        <FontAwesomeIcon icon={faSpinner} spin />
      </LoaderIcon>
      <LoaderText>Loading..</LoaderText>
    </LoaderWrapper>
  );
};

export default Loader;
