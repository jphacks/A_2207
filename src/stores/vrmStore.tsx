import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface VrmState {
  animation: string
  setAnimation: (animation: string) => void
}

export const useVrmStore = create<VrmState>()(
  devtools((set) => ({
    animation: 'idle',
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
