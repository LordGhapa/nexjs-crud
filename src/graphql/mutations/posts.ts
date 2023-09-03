import { gql } from 'graphql-request';

export const GQL_MUTATION_CREATE_POST = gql`

mutation CREATE_POST($name:String,$auth_text:String) {
  createAuth(
    data: {
      name: $name
      auth_text: $auth_text
    }
  ) {
    data {
      id
      attributes {
        name
        auth_text
        createdAt
        user {
          data {
            id
            attributes {
              username
              email
            }
          }
        }
      }
    }
  }
}

`;
export const GQL_MUTATION_UPDATE_POST = gql`

mutation UPDATE_POST($id:ID!,$name:String,$auth_text:String) {
	updateAuth(
		id: $id
		data: { name: $name, auth_text:$auth_text}
	) {
		data {
			id
			attributes {
				name
				auth_text
        createdAt
				user {
					data {
						id
						attributes {
							username
							email
						}
					}
				}
			}
		}
	}
}

`;
export const GQL_MUTATION_DELETE_POST = gql`

mutation DELETE_POST($id:ID!) {
	deleteAuth(	id: $id) {
		data {
			id
			attributes {
				name
				auth_text
        createdAt
				user {
					data {
						id
						attributes {
							username
							email
						}
					}
				}
			}
		}
	}
}
`;
