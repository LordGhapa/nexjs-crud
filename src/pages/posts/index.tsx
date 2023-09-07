import React from 'react';
import { GetServerSideProps } from 'next';
import { Wrapper } from '../../components/Wrapper';

export default function Index() {
  return (
    <>
      <Wrapper>
        <h1>posts</h1>
      </Wrapper>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
