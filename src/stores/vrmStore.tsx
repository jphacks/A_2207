import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface VrmState {
  modelName: string
  animation: string
  expression: string
  inputVrmModel: File | null | undefined
  emote: string | undefined
  setAnimation: (animation: string) => void
  setExpression: (expression: string) => void
  setModelName: (name: string) => void
  setInputVrmModel: (file: File | null | undefined) => void
  emoteStart: (emote: string) => void
  emoteFinish: () => void
}

export const useVrmStore = create<VrmState>()(
  devtools((set) => ({
    modelName: 'AliciaSolid',
    animation: 'idle',
    expression: 'neutral',
    inputVrmModel: undefined,
    emote: undefined,
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
    emoteStart: (emote) =>
      set(
        (state) => ({
          ...state,
          emote,
        }),
        false,
        'emoteStart',
      ),
    emoteFinish: () =>
      set(
        (state) => ({
          ...state,
          emote: undefined,
        }),
        false,
        'emoteFinish',
      ),
  })),
)
