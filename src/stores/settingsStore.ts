import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface SettingsState {
  modelName: string
  mode: string
  goal: string
  setModelName: (name: string) => void
  setMode: (name: string) => void
  setGoal: (goal: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  devtools((set) => ({
    modelName: 'AliciaSolid',
    mode: 'initial',
    goal: '',
    setModelName: (name: string) =>
      set(
        (state) => ({
          ...state,
          modelName: name,
        }),
        false,
        'setModelName',
      ),
    setMode: (name: string) =>
      set(
        (state) => ({
          ...state,
          mode: name,
        }),
        false,
        'setMode',
      ),
    setGoal: (goal: string) =>
      set(
        (state) => ({
          ...state,
          goal: goal,
        }),
        false,
        'setGoal',
      ),
  })),
)
