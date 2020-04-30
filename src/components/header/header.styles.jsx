import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContianer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// define a css block which can be shared in other styled components.
// in this case is div and Link
export const OptionContianerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

// the following two are sharing same style if not will be duplicated
export const OptionLink = styled(Link)`
  ${OptionContianerStyles}
`;

export const OptionDiv = styled.div`
  ${OptionContianerStyles}
`;
