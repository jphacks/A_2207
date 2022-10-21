import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface VrmState {
  animation: string
  expression: string
  setAnimation: (animation: string) => void
  setExpression: (expression: string) => void
}

export const useVrmStore = create<VrmState>()(
  devtools((set) => ({
    animation: 'idle',
    expression: 'neutral',
    setAnimation: (animation) =>
      set(
        (state) => ({
          ...state,
          animation,
        }),
        false,
        'setAnimation',
      ),
    setExpression: (expression) =>
      set(
        (state) => ({
          ...state,
          expression,
        }),
        false,
        'setExpression',
      ),
  })),
)
