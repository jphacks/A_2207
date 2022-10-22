import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface VrmState {
  modelName: string
  animation: string
  expression: string
  inputVrmModel: File | null | undefined
  setAnimation: (animation: string) => void
  setExpression: (expression: string) => void
  setModelName: (name: string) => void
  setInputVrmModel: (file: File | null | undefined) => void
}

export const useVrmStore = create<VrmState>()(
  devtools((set) => ({
    modelName: 'AliciaSolid',
    animation: 'None',
    expression: 'neutral',
    inputVrmModel: undefined,
    setModelName: (name) =>
      set(
        (state) => ({
          ...state,
          modelName: name,
          inputVrmModel: undefined,
        }),
        false,
        'setModelName',
      ),
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
    setInputVrmModel: (url) =>
      set(
        (state) => ({
          ...state,
          inputVrmModel: url,
        }),
        false,
        'setInputVrmModel',
      ),
  })),
)
