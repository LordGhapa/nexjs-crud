import { gql } from 'graphql-request';

export const GQL_QUERY_CREATE_POST = gql`
query GET_POSTS($id: ID,$user_id:ID) {
	posts: auths(
		sort: ["id:desc"],
		pagination: { pageSize: 99 },
		filters: { id: { eq: $id } user:{id:{eq:$user_id}} }
	) {
		data {
			id
			attributes {
				name
				auth_text
				user {
					data {
						id
						attributes {
							username
							email
						}
					}
				}
				createdAt
			}
		}
	}
}

`;
