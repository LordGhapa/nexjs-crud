/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { css } from 'styled-components';

export const Wrapper = styled.nav`
  ${({ theme }) => css`
  display:flex;
  flex-flow: row wrap;
  margin-bottom:${theme.spacings.xlarge} ;
  font-size: ${theme.font.sizes.small};
  gap: ${theme.spacings.small};
  padding-block: ${theme.spacings.xsmall};
   a{
    text-decoration: none;
  }

  `}
`;
