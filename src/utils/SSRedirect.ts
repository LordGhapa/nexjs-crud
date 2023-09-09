export const SSRedirect = (pathTo: string) => {
  return {
    redirect: {
      destination: `/login?redirect=${pathTo}`,
      permanent: false,
    },
  };
};
