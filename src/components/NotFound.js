import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const NotFoundWrapper = styled.div`
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto 0;
  padding: 20px;
  position: relative;
  border-radius: 10px;
  top: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
`;

const NotfoundIcon = styled.span`
  display: block;
  text-align: center;
  color: inherit;
  font-size: 40px;
  margin-right: 10px;
`;

const NotFoundText = styled.span`
  color: inherit;
  font-size: 17px;
`;

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <NotfoundIcon>
        <FontAwesomeIcon icon={faFrown} />
      </NotfoundIcon>
      <NotFoundText>
        {navigator.onLine
          ? `Sorry, the specified city was not found..`
          : `No internet connection...`}
      </NotFoundText>
    </NotFoundWrapper>
  );
};

export default NotFound;
