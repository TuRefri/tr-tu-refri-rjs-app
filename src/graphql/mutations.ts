
/* USERS */

export const createUser =`
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
    }
  }
`;

export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      username
      email
      avatar
      bannerProfile
    }
  }
`;

/* Magnets */

export const deleteMagnet = /* GraphQL */ `
  mutation DeleteMagnet(
    $input: DeleteMagnetInput!
  ) {
    deleteMagnet(input: $input) {
      id
    }
  }
`

export const createMagnet =  /* GraphQL */ `
  mutation CreateMagnet(
    $input: CreateMagnetInput!
  ) {
    createMagnet(input: $input) {
      id
    }
  }
`