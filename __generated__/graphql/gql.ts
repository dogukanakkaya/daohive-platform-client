/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      query GetContractDetail($address: String!) {\n        contract(address: $address) {\n          name\n          type\n          voters\n          proposals {\n            id\n          }\n        }\n      }\n    ": types.GetContractDetailDocument,
    "\n      query GetContractName($address: String!) {\n        contract(address: $address) {\n          name\n        }\n      }\n    ": types.GetContractNameDocument,
    "\n      query GetVoterGroupList {\n        voterGroups {\n          id\n          name\n        }\n      }\n    ": types.GetVoterGroupListDocument,
    "\n      query GetVotersList {\n        voters {\n          id\n          address\n          name\n          email\n          weight\n        }\n      }\n    ": types.GetVotersListDocument,
    "\n    query GetContractCard($address: String!) {\n        contract(address: $address) {\n          name\n          description\n          voterCount\n          proposalCount\n          activeProposalCount\n        }\n      }\n    ": types.GetContractCardDocument,
    "\n    mutation DeployContract ($input: DeployContractInput!) {\n      deployContract(input: $input) {\n        address\n      }\n    }\n  ": types.DeployContractDocument,
    "\n    query PreDeployContract ($input: DeployContractInput!) {\n      preDeployContract(input: $input) {\n        transactionFee {\n          usd\n          matic\n        }\n      }\n    }\n  ": types.PreDeployContractDocument,
    "\n    query Proposal($id: ID!){\n      proposal(id: $id) {\n        approvalCount\n        disapprovalCount\n        neutralCount\n        startAt\n        endAt\n        metadata {\n          name\n          description\n          image\n        }\n      }\n    }\n  ": types.ProposalDocument,
    "\n    mutation AddProposal ($input: AddProposalInput!) {\n      addProposal(input: $input) {\n        id\n      }\n    }\n  ": types.AddProposalDocument,
    "\n    mutation AddToWhitelist ($input: WhitelistInput!) {\n      addToWhitelist(input: $input)\n    }\n  ": types.AddToWhitelistDocument,
    "\n    mutation RemoveFromWhitelist ($input: WhitelistInput!) {\n      removeFromWhitelist(input: $input)\n    }\n  ": types.RemoveFromWhitelistDocument,
    "\n    query PreAddToWhitelist ($input: WhitelistInput!) {\n      preAddToWhitelist(input: $input) {\n        transactionFee {\n          usd\n          matic\n        }\n      }\n    }\n  ": types.PreAddToWhitelistDocument,
    "\n    query PreRemoveFromWhitelist ($input: WhitelistInput!) {\n      preRemoveFromWhitelist(input: $input) {\n        transactionFee {\n          usd\n          matic\n        }\n      }\n    }\n  ": types.PreRemoveFromWhitelistDocument,
    "\n    query GetVoterGroup ($id: ID!) {\n      voterGroup(id: $id) {\n        name,\n        voters {\n          id\n        }\n      }\n    }\n  ": types.GetVoterGroupDocument,
    "\n    mutation CreateVoterGroup ($input: VoterGroupInput!) {\n      createVoterGroup(input: $input) {\n        id\n      }\n    }\n  ": types.CreateVoterGroupDocument,
    "\n    mutation DeleteVoterGroup ($id: ID!) {\n      deleteVoterGroup(id: $id)\n    }\n  ": types.DeleteVoterGroupDocument,
    "\n    mutation UpdateVoterGroup ($id: ID!, $input: VoterGroupInput!) {\n      updateVoterGroup(id: $id, input: $input) {\n        id\n      }\n    }\n  ": types.UpdateVoterGroupDocument,
    "\n    mutation UpdateMutation ($id: ID!, $input: UpdateVoterInput!) {\n      updateVoter(id: $id, input: $input) {\n        id\n      }\n    }\n  ": types.UpdateMutationDocument,
    "\n    mutation DeleteVoter ($id: [ID!]!) {\n      deleteVoter(id: $id)\n    }\n  ": types.DeleteVoterDocument,
    "\n    mutation CreateVoter ($input: CreateVoterInput!) {\n      createVoter(input: $input) {\n        id\n      }\n    }\n  ": types.CreateVoterDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetContractDetail($address: String!) {\n        contract(address: $address) {\n          name\n          type\n          voters\n          proposals {\n            id\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetContractDetail($address: String!) {\n        contract(address: $address) {\n          name\n          type\n          voters\n          proposals {\n            id\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetContractName($address: String!) {\n        contract(address: $address) {\n          name\n        }\n      }\n    "): (typeof documents)["\n      query GetContractName($address: String!) {\n        contract(address: $address) {\n          name\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetVoterGroupList {\n        voterGroups {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      query GetVoterGroupList {\n        voterGroups {\n          id\n          name\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetVotersList {\n        voters {\n          id\n          address\n          name\n          email\n          weight\n        }\n      }\n    "): (typeof documents)["\n      query GetVotersList {\n        voters {\n          id\n          address\n          name\n          email\n          weight\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetContractCard($address: String!) {\n        contract(address: $address) {\n          name\n          description\n          voterCount\n          proposalCount\n          activeProposalCount\n        }\n      }\n    "): (typeof documents)["\n    query GetContractCard($address: String!) {\n        contract(address: $address) {\n          name\n          description\n          voterCount\n          proposalCount\n          activeProposalCount\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeployContract ($input: DeployContractInput!) {\n      deployContract(input: $input) {\n        address\n      }\n    }\n  "): (typeof documents)["\n    mutation DeployContract ($input: DeployContractInput!) {\n      deployContract(input: $input) {\n        address\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query PreDeployContract ($input: DeployContractInput!) {\n      preDeployContract(input: $input) {\n        transactionFee {\n          usd\n          matic\n        }\n      }\n    }\n  "): (typeof documents)["\n    query PreDeployContract ($input: DeployContractInput!) {\n      preDeployContract(input: $input) {\n        transactionFee {\n          usd\n          matic\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Proposal($id: ID!){\n      proposal(id: $id) {\n        approvalCount\n        disapprovalCount\n        neutralCount\n        startAt\n        endAt\n        metadata {\n          name\n          description\n          image\n        }\n      }\n    }\n  "): (typeof documents)["\n    query Proposal($id: ID!){\n      proposal(id: $id) {\n        approvalCount\n        disapprovalCount\n        neutralCount\n        startAt\n        endAt\n        metadata {\n          name\n          description\n          image\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddProposal ($input: AddProposalInput!) {\n      addProposal(input: $input) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation AddProposal ($input: AddProposalInput!) {\n      addProposal(input: $input) {\n        id\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddToWhitelist ($input: WhitelistInput!) {\n      addToWhitelist(input: $input)\n    }\n  "): (typeof documents)["\n    mutation AddToWhitelist ($input: WhitelistInput!) {\n      addToWhitelist(input: $input)\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RemoveFromWhitelist ($input: WhitelistInput!) {\n      removeFromWhitelist(input: $input)\n    }\n  "): (typeof documents)["\n    mutation RemoveFromWhitelist ($input: WhitelistInput!) {\n      removeFromWhitelist(input: $input)\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query PreAddToWhitelist ($input: WhitelistInput!) {\n      preAddToWhitelist(input: $input) {\n        transactionFee {\n          usd\n          matic\n        }\n      }\n    }\n  "): (typeof documents)["\n    query PreAddToWhitelist ($input: WhitelistInput!) {\n      preAddToWhitelist(input: $input) {\n        transactionFee {\n          usd\n          matic\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query PreRemoveFromWhitelist ($input: WhitelistInput!) {\n      preRemoveFromWhitelist(input: $input) {\n        transactionFee {\n          usd\n          matic\n        }\n      }\n    }\n  "): (typeof documents)["\n    query PreRemoveFromWhitelist ($input: WhitelistInput!) {\n      preRemoveFromWhitelist(input: $input) {\n        transactionFee {\n          usd\n          matic\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetVoterGroup ($id: ID!) {\n      voterGroup(id: $id) {\n        name,\n        voters {\n          id\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetVoterGroup ($id: ID!) {\n      voterGroup(id: $id) {\n        name,\n        voters {\n          id\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateVoterGroup ($input: VoterGroupInput!) {\n      createVoterGroup(input: $input) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateVoterGroup ($input: VoterGroupInput!) {\n      createVoterGroup(input: $input) {\n        id\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteVoterGroup ($id: ID!) {\n      deleteVoterGroup(id: $id)\n    }\n  "): (typeof documents)["\n    mutation DeleteVoterGroup ($id: ID!) {\n      deleteVoterGroup(id: $id)\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateVoterGroup ($id: ID!, $input: VoterGroupInput!) {\n      updateVoterGroup(id: $id, input: $input) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateVoterGroup ($id: ID!, $input: VoterGroupInput!) {\n      updateVoterGroup(id: $id, input: $input) {\n        id\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateMutation ($id: ID!, $input: UpdateVoterInput!) {\n      updateVoter(id: $id, input: $input) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateMutation ($id: ID!, $input: UpdateVoterInput!) {\n      updateVoter(id: $id, input: $input) {\n        id\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteVoter ($id: [ID!]!) {\n      deleteVoter(id: $id)\n    }\n  "): (typeof documents)["\n    mutation DeleteVoter ($id: [ID!]!) {\n      deleteVoter(id: $id)\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateVoter ($input: CreateVoterInput!) {\n      createVoter(input: $input) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateVoter ($input: CreateVoterInput!) {\n      createVoter(input: $input) {\n        id\n      }\n    }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;