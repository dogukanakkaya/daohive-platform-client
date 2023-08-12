# daohive-platform-client

## Project Setup
- Run `cp .env.local.example .env.local` and fill the necessary environment variables in `.env.local` file
- Run `npm i` at the root of the repository
- Run `npm run supabase:generate-types` to generate supabase types
- Run `npm run graphql:codegen` to generate graphql types
  - GraphQL Codegen uses scans the document files and uses AST to generate types. Which can't find dynamic types. Not very relevant at the moment. Maybe later I use fragments to have both flexibility and types.
- Run `npm run dev` to start the local server

---

## Custom hooks

### useFormValidation
This hook helps to validate forms easily. Expects a default state and a `zod` schema. Then will return necessary functions and values to use in a client component.

```ts
export default function Component() {
  // setState only needed when you need to manually update state
  const { state, setState, errors, handleChange, validateForm, isFormValid } = useFormValidation(initialState, Schema)
}
```

<br>

### useEffectState
This hook helps to set a state when initial state changes. This is useful for `useState` hooks which initialized with some prop or any other value. For example when a server component passes down data to client component state. That state must be updated whenever prop changes.

```ts
// `state` will be updated whenever `data` property changes
export default function Component({ data }: Props) {
  const [state, setState] = useEffectState(data)
}
```

<br>

### useMetamask
This hook helps to use Metamask in a more robust way

```ts
export default function Component() {
  const {
    isMetamaskInstalled,
    isMetamaskLoading,
    isMetamaskConnected,
    accounts,
    provider,
    connectToMetamask
  } = useMetamask()
}
```