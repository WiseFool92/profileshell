import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProfileShellHeader = styled.h1`
  font-size: 24px;
  text-align: center;
  color: white;
`;

const StyledWrapper = styled.section`
  background-color: black;
`;

function Header() {
  return (
    <StyledWrapper>
      <>
        <ProfileShellHeader>
          Profile Shell
        </ProfileShellHeader>
        <ul>
          <li>
            <Link to = "/">Home</Link>
          </li>
          <li>
            <Link to = "/signin">Sign In</Link>
          </li>
          <li>
            <Link to = '/forum'>Forum</Link>
          </li>
        </ul>
      </>
    </StyledWrapper>
  );
}

export default Header;