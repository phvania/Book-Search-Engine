import gql from "apollo/client";     //ask

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        author
        title
        description
        image
        link
      }
    }
  }
`;