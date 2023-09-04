import React from 'react';
import Home from '../templates/Home';
import { GetServerSideProps } from 'next';

export default function Index() {
  return (
    <>
      <Home />;
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
