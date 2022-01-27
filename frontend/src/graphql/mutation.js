import { gql } from "@apollo/client"

export const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      id, name
    }
  }
`
export const REMOVE_COMMENT = gql`
  mutation removeComment($input: CommentInput2) {
    removeComment(input: $input) {
      id
    }
  }
`

export const EDIT_COMMENT = gql`
  mutation EditComment($input: editCommentInp) {
    editComment(input: $input) {
      id, name, email
    }
  }
`