interface Props {
  messages: string[] | React.ReactNode[]
}

export default function InfoCard({ messages }: Props) {
  return (
    <ul className="text-xs bg-gray-200 dark:bg-gray-700 p-4 rounded flex flex-col gap-2 border-l-4 border-blue-500">
      {messages.map((message, i) => <li key={i}><i className="bi bi-info-circle"></i> {message}</li>)}
    </ul>
  )
}
