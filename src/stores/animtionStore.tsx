import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface AnimationState {
  animation: string
  setAnimation: (animation: string) => void
}

export const useAnimationStore = create<AnimationState>()(
  devtools((set) => ({
    animation: 'standing',
    setAnimation: (animation) =>
      set(
        (state) => ({
          ...state,
          animation,
        }),
        false,
        'setAnimation',
      ),
  })),
)
