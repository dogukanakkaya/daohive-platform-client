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
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type AddProposalInput = {
  address: Scalars['String']['input'];
  content: Scalars['String']['input'];
  description: Scalars['String']['input'];
  endAt: Scalars['String']['input'];
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
  startAt: Scalars['String']['input'];
};

export type Contract = {
  __typename?: 'Contract';
  activeProposalCount: Scalars['BigInt']['output'];
  address: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  proposalCount: Scalars['BigInt']['output'];
  proposals: Array<Proposal>;
  type: Scalars['String']['output'];
  voterCount: Scalars['BigInt']['output'];
  voters: Array<Scalars['String']['output']>;
  weights: Scalars['JSONObject']['output'];
};

export type CreateVoterInput = {
  address: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteWeightsInput = {
  address: Scalars['String']['input'];
  voters: Array<Scalars['String']['input']>;
};

export type DeployContractInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  voterGroupId?: InputMaybe<Scalars['ID']['input']>;
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
  addProposal: Proposal;
  addToWhitelist: Scalars['Boolean']['output'];
  createVoter: Voter;
  createVoterGroup: VoterGroup;
  deleteVoter: Scalars['Boolean']['output'];
  deleteVoterGroup: Scalars['Boolean']['output'];
  deleteWeights: Scalars['Boolean']['output'];
  deployContract: Contract;
  removeFromWhitelist: Scalars['Boolean']['output'];
  setWeights: Scalars['Boolean']['output'];
  updateVoter: Voter;
  updateVoterGroup: VoterGroup;
};


export type MutationAddProposalArgs = {
  input: AddProposalInput;
};


export type MutationAddToWhitelistArgs = {
  input: WhitelistInput;
};


export type MutationCreateVoterArgs = {
  input: CreateVoterInput;
};


export type MutationCreateVoterGroupArgs = {
  input: VoterGroupInput;
};


export type MutationDeleteVoterArgs = {
  id: Array<Scalars['ID']['input']>;
};


export type MutationDeleteVoterGroupArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWeightsArgs = {
  input: DeleteWeightsInput;
};


export type MutationDeployContractArgs = {
  input: DeployContractInput;
};


export type MutationRemoveFromWhitelistArgs = {
  input: WhitelistInput;
};


export type MutationSetWeightsArgs = {
  input: SetWeightsInput;
};


export type MutationUpdateVoterArgs = {
  id: Scalars['ID']['input'];
  input: UpdateVoterInput;
};


export type MutationUpdateVoterGroupArgs = {
  id: Scalars['ID']['input'];
  input: VoterGroupInput;
};

export type PreCalculation = {
  __typename?: 'PreCalculation';
  transactionFee: TransactionFee;
};

export type Proposal = {
  __typename?: 'Proposal';
  approvalCount: Scalars['BigInt']['output'];
  contract: Contract;
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
  preAddProposal: PreCalculation;
  preAddToWhitelist: PreCalculation;
  preDeleteWeights: PreCalculation;
  preDeployContract: PreCalculation;
  preRemoveFromWhitelist: PreCalculation;
  preSetWeights: PreCalculation;
  proposal: Proposal;
  voter: Voter;
  voterGroup: VoterGroup;
  voterGroups: Array<VoterGroup>;
  voters: Array<Voter>;
};


export type QueryContractArgs = {
  address: Scalars['String']['input'];
};


export type QueryPreAddProposalArgs = {
  input: AddProposalInput;
};


export type QueryPreAddToWhitelistArgs = {
  input: WhitelistInput;
};


export type QueryPreDeleteWeightsArgs = {
  input: DeleteWeightsInput;
};


export type QueryPreDeployContractArgs = {
  input: DeployContractInput;
};


export type QueryPreRemoveFromWhitelistArgs = {
  input: WhitelistInput;
};


export type QueryPreSetWeightsArgs = {
  input: SetWeightsInput;
};


export type QueryProposalArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVoterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVoterGroupArgs = {
  id: Scalars['ID']['input'];
};

export type SetWeightsInput = {
  address: Scalars['String']['input'];
  voters: Array<Scalars['String']['input']>;
  weights: Array<Scalars['Int']['input']>;
};

export type TransactionFee = {
  __typename?: 'TransactionFee';
  matic: Scalars['Float']['output'];
  usd: Scalars['Float']['output'];
};

export type UpdateVoterInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type Voter = {
  __typename?: 'Voter';
  address: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  email: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  weight: Scalars['Int']['output'];
};

export type VoterGroup = {
  __typename?: 'VoterGroup';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  voters: Array<Voter>;
};

export type VoterGroupInput = {
  name: Scalars['String']['input'];
  voters?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type WhitelistInput = {
  address: Scalars['String']['input'];
  voters: Array<Scalars['String']['input']>;
};

export type GetContractDetailQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetContractDetailQuery = { __typename?: 'Query', contract: { __typename?: 'Contract', name: string, type: string, voters: Array<string>, weights: any, proposals: Array<{ __typename?: 'Proposal', id: string }> } };

export type GetContractNameQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetContractNameQuery = { __typename?: 'Query', contract: { __typename?: 'Contract', name: string } };

export type GetVoterGroupListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVoterGroupListQuery = { __typename?: 'Query', voterGroups: Array<{ __typename?: 'VoterGroup', id: string, name: string }> };

export type GetVotersListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVotersListQuery = { __typename?: 'Query', voters: Array<{ __typename?: 'Voter', id: string, address: string, name: string | null, email: string | null, weight: number }> };

export type GetContractCardQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetContractCardQuery = { __typename?: 'Query', contract: { __typename?: 'Contract', name: string, description: string, voterCount: any, proposalCount: any, activeProposalCount: any } };

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

export type PreAddProposalQueryVariables = Exact<{
  input: AddProposalInput;
}>;


export type PreAddProposalQuery = { __typename?: 'Query', preAddProposal: { __typename?: 'PreCalculation', transactionFee: { __typename?: 'TransactionFee', usd: number, matic: number } } };

export type AddProposalMutationVariables = Exact<{
  input: AddProposalInput;
}>;


export type AddProposalMutation = { __typename?: 'Mutation', addProposal: { __typename?: 'Proposal', id: string } };

export type SetWeightsMutationVariables = Exact<{
  input: SetWeightsInput;
}>;


export type SetWeightsMutation = { __typename?: 'Mutation', setWeights: boolean };

export type DeleteWeightsMutationVariables = Exact<{
  input: DeleteWeightsInput;
}>;


export type DeleteWeightsMutation = { __typename?: 'Mutation', deleteWeights: boolean };

export type PreSetWeightsQueryVariables = Exact<{
  input: SetWeightsInput;
}>;


export type PreSetWeightsQuery = { __typename?: 'Query', preSetWeights: { __typename?: 'PreCalculation', transactionFee: { __typename?: 'TransactionFee', usd: number, matic: number } } };

export type PreDeleteWeightsQueryVariables = Exact<{
  input: DeleteWeightsInput;
}>;


export type PreDeleteWeightsQuery = { __typename?: 'Query', preDeleteWeights: { __typename?: 'PreCalculation', transactionFee: { __typename?: 'TransactionFee', usd: number, matic: number } } };

export type AddToWhitelistMutationVariables = Exact<{
  input: WhitelistInput;
}>;


export type AddToWhitelistMutation = { __typename?: 'Mutation', addToWhitelist: boolean };

export type RemoveFromWhitelistMutationVariables = Exact<{
  input: WhitelistInput;
}>;


export type RemoveFromWhitelistMutation = { __typename?: 'Mutation', removeFromWhitelist: boolean };

export type PreAddToWhitelistQueryVariables = Exact<{
  input: WhitelistInput;
}>;


export type PreAddToWhitelistQuery = { __typename?: 'Query', preAddToWhitelist: { __typename?: 'PreCalculation', transactionFee: { __typename?: 'TransactionFee', usd: number, matic: number } } };

export type PreRemoveFromWhitelistQueryVariables = Exact<{
  input: WhitelistInput;
}>;


export type PreRemoveFromWhitelistQuery = { __typename?: 'Query', preRemoveFromWhitelist: { __typename?: 'PreCalculation', transactionFee: { __typename?: 'TransactionFee', usd: number, matic: number } } };

export type GetVoterGroupQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetVoterGroupQuery = { __typename?: 'Query', voterGroup: { __typename?: 'VoterGroup', name: string, voters: Array<{ __typename?: 'Voter', id: string }> } };

export type CreateVoterGroupMutationVariables = Exact<{
  input: VoterGroupInput;
}>;


export type CreateVoterGroupMutation = { __typename?: 'Mutation', createVoterGroup: { __typename?: 'VoterGroup', id: string } };

export type DeleteVoterGroupMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteVoterGroupMutation = { __typename?: 'Mutation', deleteVoterGroup: boolean };

export type UpdateVoterGroupMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: VoterGroupInput;
}>;


export type UpdateVoterGroupMutation = { __typename?: 'Mutation', updateVoterGroup: { __typename?: 'VoterGroup', id: string } };

export type UpdateVoterMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateVoterInput;
}>;


export type UpdateVoterMutation = { __typename?: 'Mutation', updateVoter: { __typename?: 'Voter', id: string } };

export type DeleteVoterMutationVariables = Exact<{
  id: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type DeleteVoterMutation = { __typename?: 'Mutation', deleteVoter: boolean };

export type CreateVoterMutationVariables = Exact<{
  input: CreateVoterInput;
}>;


export type CreateVoterMutation = { __typename?: 'Mutation', createVoter: { __typename?: 'Voter', id: string } };


export const GetContractDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContractDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"voters"}},{"kind":"Field","name":{"kind":"Name","value":"weights"}},{"kind":"Field","name":{"kind":"Name","value":"proposals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetContractDetailQuery, GetContractDetailQueryVariables>;
export const GetContractNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContractName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetContractNameQuery, GetContractNameQueryVariables>;
export const GetVoterGroupListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVoterGroupList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voterGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetVoterGroupListQuery, GetVoterGroupListQueryVariables>;
export const GetVotersListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVotersList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}}]}}]} as unknown as DocumentNode<GetVotersListQuery, GetVotersListQueryVariables>;
export const GetContractCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContractCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"voterCount"}},{"kind":"Field","name":{"kind":"Name","value":"proposalCount"}},{"kind":"Field","name":{"kind":"Name","value":"activeProposalCount"}}]}}]}}]} as unknown as DocumentNode<GetContractCardQuery, GetContractCardQueryVariables>;
export const DeployContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeployContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeployContractInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deployContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<DeployContractMutation, DeployContractMutationVariables>;
export const PreDeployContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreDeployContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeployContractInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preDeployContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionFee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usd"}},{"kind":"Field","name":{"kind":"Name","value":"matic"}}]}}]}}]}}]} as unknown as DocumentNode<PreDeployContractQuery, PreDeployContractQueryVariables>;
export const ProposalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Proposal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approvalCount"}},{"kind":"Field","name":{"kind":"Name","value":"disapprovalCount"}},{"kind":"Field","name":{"kind":"Name","value":"neutralCount"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode<ProposalQuery, ProposalQueryVariables>;
export const PreAddProposalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreAddProposal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddProposalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preAddProposal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionFee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usd"}},{"kind":"Field","name":{"kind":"Name","value":"matic"}}]}}]}}]}}]} as unknown as DocumentNode<PreAddProposalQuery, PreAddProposalQueryVariables>;
export const AddProposalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProposal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddProposalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProposal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddProposalMutation, AddProposalMutationVariables>;
export const SetWeightsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetWeights"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetWeightsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setWeights"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SetWeightsMutation, SetWeightsMutationVariables>;
export const DeleteWeightsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWeights"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteWeightsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWeights"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteWeightsMutation, DeleteWeightsMutationVariables>;
export const PreSetWeightsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreSetWeights"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetWeightsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preSetWeights"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionFee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usd"}},{"kind":"Field","name":{"kind":"Name","value":"matic"}}]}}]}}]}}]} as unknown as DocumentNode<PreSetWeightsQuery, PreSetWeightsQueryVariables>;
export const PreDeleteWeightsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreDeleteWeights"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteWeightsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preDeleteWeights"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionFee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usd"}},{"kind":"Field","name":{"kind":"Name","value":"matic"}}]}}]}}]}}]} as unknown as DocumentNode<PreDeleteWeightsQuery, PreDeleteWeightsQueryVariables>;
export const AddToWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddToWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhitelistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddToWhitelistMutation, AddToWhitelistMutationVariables>;
export const RemoveFromWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFromWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhitelistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RemoveFromWhitelistMutation, RemoveFromWhitelistMutationVariables>;
export const PreAddToWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreAddToWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhitelistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preAddToWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionFee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usd"}},{"kind":"Field","name":{"kind":"Name","value":"matic"}}]}}]}}]}}]} as unknown as DocumentNode<PreAddToWhitelistQuery, PreAddToWhitelistQueryVariables>;
export const PreRemoveFromWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreRemoveFromWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhitelistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preRemoveFromWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionFee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usd"}},{"kind":"Field","name":{"kind":"Name","value":"matic"}}]}}]}}]}}]} as unknown as DocumentNode<PreRemoveFromWhitelistQuery, PreRemoveFromWhitelistQueryVariables>;
export const GetVoterGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVoterGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voterGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"voters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetVoterGroupQuery, GetVoterGroupQueryVariables>;
export const CreateVoterGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVoterGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VoterGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVoterGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateVoterGroupMutation, CreateVoterGroupMutationVariables>;
export const DeleteVoterGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteVoterGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteVoterGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteVoterGroupMutation, DeleteVoterGroupMutationVariables>;
export const UpdateVoterGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVoterGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VoterGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVoterGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateVoterGroupMutation, UpdateVoterGroupMutationVariables>;
export const UpdateVoterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVoter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateVoterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVoter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateVoterMutation, UpdateVoterMutationVariables>;
export const DeleteVoterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteVoter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteVoter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteVoterMutation, DeleteVoterMutationVariables>;
export const CreateVoterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVoter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVoterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVoter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateVoterMutation, CreateVoterMutationVariables>;