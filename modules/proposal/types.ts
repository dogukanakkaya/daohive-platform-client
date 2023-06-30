export interface Metadata {
  name: string
  description: string
  content: string
  image: string
}

export interface ExtraProposalProps {
  metadata: Metadata
  voteCount: [number, number, number]
}

export enum MetadataProvider {
  Arweave = 1
}