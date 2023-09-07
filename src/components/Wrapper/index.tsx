import { Menu } from '../Menu';
import * as Styled from './styles';

export type WrapperProps = {
  children?: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <>
      <Styled.Wrapper>
        <Menu />
        {children}
      </Styled.Wrapper>
      ;
    </>
  );
};
