/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      firstName
      lastName
      email
      phoneNumber
      plan
      type
      verified
      properties {
        id
        owner
        type
        area
        direction
        price
        baths
        rooms
        parking
        others
        state
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      firstName
      lastName
      email
      phoneNumber
      plan
      type
      verified
      properties {
        id
        owner
        type
        area
        direction
        price
        baths
        rooms
        parking
        others
        state
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      firstName
      lastName
      email
      phoneNumber
      plan
      type
      verified
      properties {
        id
        owner
        type
        area
        direction
        price
        baths
        rooms
        parking
        others
        state
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAgent = /* GraphQL */ `
  subscription OnCreateAgent {
    onCreateAgent {
      id
      organization
      clients {
        id
        timestamp
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAgent = /* GraphQL */ `
  subscription OnUpdateAgent {
    onUpdateAgent {
      id
      organization
      clients {
        id
        timestamp
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAgent = /* GraphQL */ `
  subscription OnDeleteAgent {
    onDeleteAgent {
      id
      organization
      clients {
        id
        timestamp
      }
      createdAt
      updatedAt
    }
  }
`;
