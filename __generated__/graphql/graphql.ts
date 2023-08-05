/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** BigInt custom scalar type */
  BigInt: { input: any; output: any; }
};

export type Contract = {
  __typename?: 'Contract';
  address: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  proposals: Array<Proposal>;
  totalVoters: Scalars['BigInt']['output'];
  type: Scalars['String']['output'];
  voters: Array<Scalars['String']['output']>;
};

export type DeployContractInput = {
  description: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  restriction: Scalars['String']['input'];
  voterGroupId: InputMaybe<Scalars['ID']['input']>;
};

export type Metadata = {
  __typename?: 'Metadata';
  content: Scalars['String']['output'];
  description: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToWhitelist: Scalars['Boolean']['output'];
  deployContract: Contract;
  removeFromWhitelist: Scalars['Boolean']['output'];
};


export type MutationAddToWhitelistArgs = {
  input: WhitelistInput;
};


export type MutationDeployContractArgs = {
  input: DeployContractInput;
};


export type MutationRemoveFromWhitelistArgs = {
  input: WhitelistInput;
};

export type PreCalculation = {
  __typename?: 'PreCalculation';
  transactionFee: TransactionFee;
};

export type Proposal = {
  __typename?: 'Proposal';
  approvalCount: Scalars['BigInt']['output'];
  createdAt: Scalars['String']['output'];
  disapprovalCount: Scalars['BigInt']['output'];
  endAt: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  metadata: Metadata;
  neutralCount: Scalars['BigInt']['output'];
  startAt: Scalars['BigInt']['output'];
  uri: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  contract: Contract;
  preAddToWhitelist: PreCalculation;
  preDeployContract: PreCalculation;
  preRemoveFromWhitelist: PreCalculation;
  proposal: Proposal;
  voterGroups: Array<VoterGroup>;
  voters: Array<Voter>;
};


export type QueryContractArgs = {
  address: Scalars['String']['input'];
};


export type QueryPreAddToWhitelistArgs = {
  input: WhitelistInput;
};


export type QueryPreDeployContractArgs = {
  input: DeployContractInput;
};


export type QueryPreRemoveFromWhitelistArgs = {
  input: WhitelistInput;
};


export type QueryProposalArgs = {
  id: Scalars['ID']['input'];
};

export type TransactionFee = {
  __typename?: 'TransactionFee';
  matic: Scalars['Float']['output'];
  usd: Scalars['Float']['output'];
};

export type Voter = {
  __typename?: 'Voter';
  address: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  email: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
};

export type VoterGroup = {
  __typename?: 'VoterGroup';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  voters: Array<Voter>;
};

export type WhitelistInput = {
  address: Scalars['String']['input'];
  voterAddresses: Array<Scalars['String']['input']>;
};

export type GetContractDetailQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetContractDetailQuery = { __typename?: 'Query', contract: { __typename?: 'Contract', name: string, type: string, voters: Array<string>, proposals: Array<{ __typename?: 'Proposal', id: string }> } };

export type GetContractNameQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetContractNameQuery = { __typename?: 'Query', contract: { __typename?: 'Contract', name: string } };

export type GetVoterGroupListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVoterGroupListQuery = { __typename?: 'Query', voterGroups: Array<{ __typename?: 'VoterGroup', id: string, name: string }> };

export type GetVotersListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVotersListQuery = { __typename?: 'Query', voters: Array<{ __typename?: 'Voter', id: string, address: string, name: string | null, email: string | null }> };

export type GetContractCardQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetContractCardQuery = { __typename?: 'Query', contract: { __typename?: 'Contract', name: string, description: string, totalVoters: any } };

export type DeployContractMutationVariables = Exact<{
  input: DeployContractInput;
}>;


export type DeployContractMutation = { __typename?: 'Mutation', deployContract: { __typename?: 'Contract', address: string } };

export type PreDeployContractQueryVariables = Exact<{
  input: DeployContractInput;
}>;


export type PreDeployContractQuery = { __typename?: 'Query', preDeployContract: { __typename?: 'PreCalculation', transactionFee: { __typename?: 'TransactionFee', usd: number, matic: number } } };

export type ProposalQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProposalQuery = { __typename?: 'Query', proposal: { __typename?: 'Proposal', approvalCount: any, disapprovalCount: any, neutralCount: any, startAt: any, endAt: any, metadata: { __typename?: 'Metadata', name: string, description: string, image: string } } };

export type AddToWhitelistMutationVariables = Exact<{
  input: WhitelistInput;
}>;


export type AddToWhitelistMutation = { __typename?: 'Mutation', addToWhitelist: boolean };

export type PreAddToWhitelistQueryVariables = Exact<{
  input: WhitelistInput;
}>;


export type PreAddToWhitelistQuery = { __typename?: 'Query', preAddToWhitelist: { __typename?: 'PreCalculation', transactionFee: { __typename?: 'TransactionFee', usd: number, matic: number } } };

export type RemoveFromWhitelistMutationVariables = Exact<{
  input: WhitelistInput;
}>;


export type RemoveFromWhitelistMutation = { __typename?: 'Mutation', removeFromWhitelist: boolean };

export type PreRemoveFromWhitelistQueryVariables = Exact<{
  input: WhitelistInput;
}>;


export type PreRemoveFromWhitelistQuery = { __typename?: 'Query', preRemoveFromWhitelist: { __typename?: 'PreCalculation', transactionFee: { __typename?: 'TransactionFee', usd: number, matic: number } } };


export const GetContractDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContractDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"voters"}},{"kind":"Field","name":{"kind":"Name","value":"proposals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetContractDetailQuery, GetContractDetailQueryVariables>;
export const GetContractNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContractName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetContractNameQuery, GetContractNameQueryVariables>;
export const GetVoterGroupListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVoterGroupList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voterGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetVoterGroupListQuery, GetVoterGroupListQueryVariables>;
export const GetVotersListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVotersList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetVotersListQuery, GetVotersListQueryVariables>;
export const GetContractCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContractCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"totalVoters"}}]}}]}}]} as unknown as DocumentNode<GetContractCardQuery, GetContractCardQueryVariables>;
export const DeployContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeployContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeployContractInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deployContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<DeployContractMutation, DeployContractMutationVariables>;
export const PreDeployContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreDeployContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeployContractInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preDeployContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionFee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usd"}},{"kind":"Field","name":{"kind":"Name","value":"matic"}}]}}]}}]}}]} as unknown as DocumentNode<PreDeployContractQuery, PreDeployContractQueryVariables>;
export const ProposalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Proposal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approvalCount"}},{"kind":"Field","name":{"kind":"Name","value":"disapprovalCount"}},{"kind":"Field","name":{"kind":"Name","value":"neutralCount"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode<ProposalQuery, ProposalQueryVariables>;
export const AddToWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddToWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhitelistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddToWhitelistMutation, AddToWhitelistMutationVariables>;
export const PreAddToWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreAddToWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhitelistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preAddToWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionFee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usd"}},{"kind":"Field","name":{"kind":"Name","value":"matic"}}]}}]}}]}}]} as unknown as DocumentNode<PreAddToWhitelistQuery, PreAddToWhitelistQueryVariables>;
export const RemoveFromWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFromWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhitelistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RemoveFromWhitelistMutation, RemoveFromWhitelistMutationVariables>;
export const PreRemoveFromWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreRemoveFromWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhitelistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preRemoveFromWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionFee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usd"}},{"kind":"Field","name":{"kind":"Name","value":"matic"}}]}}]}}]}}]} as unknown as DocumentNode<PreRemoveFromWhitelistQuery, PreRemoveFromWhitelistQueryVariables>;