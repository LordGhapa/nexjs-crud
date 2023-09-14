import { gql } from 'graphql-request';

export const GQL_MUTATION_AUTHENTICATE_USER = gql`
mutation AUTHENTICATE_USER($email: String!, $password: String!) {
	login(input: { identifier: $email, password: $password }) {
		jwt
		user {
			id
			username
			email
		}
	}
}
`;

export const GQL_MUTATION_REGISTE_NEW_USER = gql`
mutation CREATE_USER(
  $username: String!
  $email: String!
  $password: String!
) {
  register(
    input: {
      username: $username
      email: $email
      password: $password
    }
  ) {
    jwt
    user {
      id
      username
      email
    }
  }
}
`;
