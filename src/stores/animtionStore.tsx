import create from 'zustand'

interface AnimationState {
  animation: string
  isPaused: boolean
  pauseToggle: () => void
}

export const useAnimationStore = create<AnimationState>((set) => ({
  animation: 'GangnamStyle',
  isPaused: false,
  pauseToggle: () =>
    set((state) => ({
      ...state,
      isPaused: !state.isPaused,
    })),
}))
