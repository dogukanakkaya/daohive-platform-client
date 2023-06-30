import { useEffect } from 'react'

type AsyncEffectCallback = (signal: AbortSignal) => Promise<void>;

export default function useAbortableAsyncEffect(asyncEffect: AsyncEffectCallback, dependencies: React.DependencyList) {
  useEffect(() => {
    const controller = new AbortController()

    !async function () {
      try {
        await asyncEffect(controller.signal)
      } catch (error: any) {
        if (!['AbortError', 'CanceledError'].includes(error.name)) {
          console.error('An unexpected error occurred:', error)
        }
      }
    }()

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}