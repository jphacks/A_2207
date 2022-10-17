import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface SettingsState {
  modelName: string
  mode: string
  goal: string
  positionX: number
  positionY: number
  positionZ: number 
  setModelName: (name: string) => void
  setMode: (name: string) => void
  setGoal: (goal: string) => void
  setPositionX: (x: number) => void
  setPositionY: (y: number) => void
  setPositionZ: (z: number) => void
}

export const useSettingsStore = create<SettingsState>()(
  devtools((set) => ({
    modelName: 'AliciaSolid',
    mode: 'initial',
    goal: '',
    positionX: 0,
    positionY: -0.8,
    positionZ: 0,
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
    setPositionX: (x: number) =>
      set(
        (state) => ({
          ...state,
          positionX: x,
        }),
        false,
        'setPositionX',
      ),
      setPositionY: (y: number) =>
      set(
        (state) => ({
          ...state,
          positionY: y,
        }),
        false,
        'setPositionY',
      ),
      setPositionZ: (z: number) =>
      set(
        (state) => ({
          ...state,
          positionZ: z,
        }),
        false,
        'setPositionZ',
      ),
  })),
)
