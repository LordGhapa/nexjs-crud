import * as Styled from './styles';
type loadingProps = {
  children?: React.ReactNode;
};
export const Loading = ({ children }: loadingProps) => {
  return (
    <>
      {children}
      <Styled.Container />;
    </>
  );
};
