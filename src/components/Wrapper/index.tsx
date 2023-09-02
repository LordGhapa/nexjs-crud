import * as Styled from './styles';

export type WrapperProps = {
  children?: string;
};

export const Wrapper = ({ children }: WrapperProps) => {
  return <Styled.Wrapper>{children}</Styled.Wrapper>;
};
