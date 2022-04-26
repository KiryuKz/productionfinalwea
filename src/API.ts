/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  plan: string,
  type: Array< string >,
  verified: boolean,
  properties?: Array< PropertyInput | null > | null,
};

export type PropertyInput = {
  id?: string | null,
  owner: string,
  type: string,
  area: Array< string >,
  direction?: Array< string > | null,
  price: Array< string >,
  baths: number,
  rooms: number,
  parking: number,
  others: Array< string >,
  state: Array< string >,
};

export type ModelUserConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  plan?: ModelStringInput | null,
  type?: ModelStringInput | null,
  verified?: ModelBooleanInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  plan: string,
  type: Array< string >,
  verified: boolean,
  properties?:  Array<Property | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type Property = {
  __typename: "Property",
  id: string,
  owner: string,
  type: string,
  area: Array< string >,
  direction?: Array< string > | null,
  price: Array< string >,
  baths: number,
  rooms: number,
  parking: number,
  others: Array< string >,
  state: Array< string >,
};

export type UpdateUserInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  plan?: string | null,
  type?: Array< string > | null,
  verified?: boolean | null,
  properties?: Array< PropertyInput | null > | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateAgentInput = {
  id?: string | null,
  organization: string,
  clients: Array< ClientInput | null >,
};

export type ClientInput = {
  id?: string | null,
  timestamp?: number | null,
};

export type ModelAgentConditionInput = {
  organization?: ModelStringInput | null,
  and?: Array< ModelAgentConditionInput | null > | null,
  or?: Array< ModelAgentConditionInput | null > | null,
  not?: ModelAgentConditionInput | null,
};

export type Agent = {
  __typename: "Agent",
  id: string,
  organization: string,
  clients:  Array<Client | null >,
  createdAt: string,
  updatedAt: string,
};

export type Client = {
  __typename: "Client",
  id: string,
  timestamp?: number | null,
};

export type UpdateAgentInput = {
  id: string,
  organization?: string | null,
  clients?: Array< ClientInput | null > | null,
};

export type DeleteAgentInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  plan?: ModelStringInput | null,
  type?: ModelStringInput | null,
  verified?: ModelBooleanInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelAgentFilterInput = {
  id?: ModelIDInput | null,
  organization?: ModelStringInput | null,
  and?: Array< ModelAgentFilterInput | null > | null,
  or?: Array< ModelAgentFilterInput | null > | null,
  not?: ModelAgentFilterInput | null,
};

export type ModelAgentConnection = {
  __typename: "ModelAgentConnection",
  items:  Array<Agent | null >,
  nextToken?: string | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    plan: string,
    type: Array< string >,
    verified: boolean,
    properties?:  Array< {
      __typename: "Property",
      id: string,
      owner: string,
      type: string,
      area: Array< string >,
      direction?: Array< string > | null,
      price: Array< string >,
      baths: number,
      rooms: number,
      parking: number,
      others: Array< string >,
      state: Array< string >,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    plan: string,
    type: Array< string >,
    verified: boolean,
    properties?:  Array< {
      __typename: "Property",
      id: string,
      owner: string,
      type: string,
      area: Array< string >,
      direction?: Array< string > | null,
      price: Array< string >,
      baths: number,
      rooms: number,
      parking: number,
      others: Array< string >,
      state: Array< string >,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    plan: string,
    type: Array< string >,
    verified: boolean,
    properties?:  Array< {
      __typename: "Property",
      id: string,
      owner: string,
      type: string,
      area: Array< string >,
      direction?: Array< string > | null,
      price: Array< string >,
      baths: number,
      rooms: number,
      parking: number,
      others: Array< string >,
      state: Array< string >,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAgentMutationVariables = {
  input: CreateAgentInput,
  condition?: ModelAgentConditionInput | null,
};

export type CreateAgentMutation = {
  createAgent?:  {
    __typename: "Agent",
    id: string,
    organization: string,
    clients:  Array< {
      __typename: "Client",
      id: string,
      timestamp?: number | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAgentMutationVariables = {
  input: UpdateAgentInput,
  condition?: ModelAgentConditionInput | null,
};

export type UpdateAgentMutation = {
  updateAgent?:  {
    __typename: "Agent",
    id: string,
    organization: string,
    clients:  Array< {
      __typename: "Client",
      id: string,
      timestamp?: number | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAgentMutationVariables = {
  input: DeleteAgentInput,
  condition?: ModelAgentConditionInput | null,
};

export type DeleteAgentMutation = {
  deleteAgent?:  {
    __typename: "Agent",
    id: string,
    organization: string,
    clients:  Array< {
      __typename: "Client",
      id: string,
      timestamp?: number | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    plan: string,
    type: Array< string >,
    verified: boolean,
    properties?:  Array< {
      __typename: "Property",
      id: string,
      owner: string,
      type: string,
      area: Array< string >,
      direction?: Array< string > | null,
      price: Array< string >,
      baths: number,
      rooms: number,
      parking: number,
      others: Array< string >,
      state: Array< string >,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      phoneNumber: string,
      plan: string,
      type: Array< string >,
      verified: boolean,
      properties?:  Array< {
        __typename: "Property",
        id: string,
        owner: string,
        type: string,
        area: Array< string >,
        direction?: Array< string > | null,
        price: Array< string >,
        baths: number,
        rooms: number,
        parking: number,
        others: Array< string >,
        state: Array< string >,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAgentQueryVariables = {
  id: string,
};

export type GetAgentQuery = {
  getAgent?:  {
    __typename: "Agent",
    id: string,
    organization: string,
    clients:  Array< {
      __typename: "Client",
      id: string,
      timestamp?: number | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAgentsQueryVariables = {
  filter?: ModelAgentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAgentsQuery = {
  listAgents?:  {
    __typename: "ModelAgentConnection",
    items:  Array< {
      __typename: "Agent",
      id: string,
      organization: string,
      clients:  Array< {
        __typename: "Client",
        id: string,
        timestamp?: number | null,
      } | null >,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    plan: string,
    type: Array< string >,
    verified: boolean,
    properties?:  Array< {
      __typename: "Property",
      id: string,
      owner: string,
      type: string,
      area: Array< string >,
      direction?: Array< string > | null,
      price: Array< string >,
      baths: number,
      rooms: number,
      parking: number,
      others: Array< string >,
      state: Array< string >,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    plan: string,
    type: Array< string >,
    verified: boolean,
    properties?:  Array< {
      __typename: "Property",
      id: string,
      owner: string,
      type: string,
      area: Array< string >,
      direction?: Array< string > | null,
      price: Array< string >,
      baths: number,
      rooms: number,
      parking: number,
      others: Array< string >,
      state: Array< string >,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    plan: string,
    type: Array< string >,
    verified: boolean,
    properties?:  Array< {
      __typename: "Property",
      id: string,
      owner: string,
      type: string,
      area: Array< string >,
      direction?: Array< string > | null,
      price: Array< string >,
      baths: number,
      rooms: number,
      parking: number,
      others: Array< string >,
      state: Array< string >,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAgentSubscription = {
  onCreateAgent?:  {
    __typename: "Agent",
    id: string,
    organization: string,
    clients:  Array< {
      __typename: "Client",
      id: string,
      timestamp?: number | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAgentSubscription = {
  onUpdateAgent?:  {
    __typename: "Agent",
    id: string,
    organization: string,
    clients:  Array< {
      __typename: "Client",
      id: string,
      timestamp?: number | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAgentSubscription = {
  onDeleteAgent?:  {
    __typename: "Agent",
    id: string,
    organization: string,
    clients:  Array< {
      __typename: "Client",
      id: string,
      timestamp?: number | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};
