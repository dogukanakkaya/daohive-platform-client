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
    "\n      query GetContractDetail($address: String!) {\n        contract(address: $address) {\n          name\n          voters {\n            address\n            name\n          }\n        }\n      }\n    ": types.GetContractDetailDocument,
    "\n      query GetContractName($address: String!) {\n        contract(address: $address) {\n          name\n        }\n      }\n    ": types.GetContractNameDocument,
    "\n      query GetVoterGroupList {\n        voterGroups {\n          id\n          name\n        }\n      }\n    ": types.GetVoterGroupListDocument,
    "\n      query GetVotersList {\n        voters {\n          id\n          address\n          name\n          email\n        }\n      }\n    ": types.GetVotersListDocument,
    "\n    query GetContractCard($address: String!) {\n        contract(address: $address) {\n          address\n          name\n          description\n          totalVoters\n        }\n      }\n    ": types.GetContractCardDocument,
    "\n    query Proposal($id: String!){\n      proposal(id: $id) {\n        approvalCount\n        disapprovalCount\n        neutralCount\n        startAt\n        endAt\n        metadata {\n          name\n          description\n          image\n        }\n      }\n    }\n  ": types.ProposalDocument,
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
export function gql(source: "\n      query GetContractDetail($address: String!) {\n        contract(address: $address) {\n          name\n          voters {\n            address\n            name\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetContractDetail($address: String!) {\n        contract(address: $address) {\n          name\n          voters {\n            address\n            name\n          }\n        }\n      }\n    "];
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
export function gql(source: "\n      query GetVotersList {\n        voters {\n          id\n          address\n          name\n          email\n        }\n      }\n    "): (typeof documents)["\n      query GetVotersList {\n        voters {\n          id\n          address\n          name\n          email\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetContractCard($address: String!) {\n        contract(address: $address) {\n          address\n          name\n          description\n          totalVoters\n        }\n      }\n    "): (typeof documents)["\n    query GetContractCard($address: String!) {\n        contract(address: $address) {\n          address\n          name\n          description\n          totalVoters\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Proposal($id: String!){\n      proposal(id: $id) {\n        approvalCount\n        disapprovalCount\n        neutralCount\n        startAt\n        endAt\n        metadata {\n          name\n          description\n          image\n        }\n      }\n    }\n  "): (typeof documents)["\n    query Proposal($id: String!){\n      proposal(id: $id) {\n        approvalCount\n        disapprovalCount\n        neutralCount\n        startAt\n        endAt\n        metadata {\n          name\n          description\n          image\n        }\n      }\n    }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;