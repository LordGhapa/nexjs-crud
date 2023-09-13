/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { css } from 'styled-components';

export const Wrapper = styled.form`
  ${({ theme }) => css``}
`;
export const ButtonWrapper = styled.div`
  ${({ theme }) => css`
  display: flex;
  gap: 20px;
  `}
`;
export const ErrorMessage = styled.p`
  ${({ theme }) => css`
  font-size: ${theme.font.sizes.small};
  background:${theme.colors.warning};
  color:${theme.colors.white};
  padding: ${theme.spacings.xsmall} ${theme.spacings.small};

  `}
`;
