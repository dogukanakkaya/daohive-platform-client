# daohive-platform-client

## Project Setup
- Run `cp .env.local.example .env.local` and fill the necessary environment variables in `.env.local` file
- Run `npm i` at the root of the repository
- Run `npm run supabase:generate-types` to generate supabase types
- Run `npm run graphql:codegen` to generate graphql types
  - GraphQL Codegen uses scans the document files and uses AST to generate types. Which can't find dynamic types. Not very relevant at the moment. Maybe later I use fragments to have both flexibility and types.
- Run `npm run dev` to start the local server
