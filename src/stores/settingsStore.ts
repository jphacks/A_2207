import create from 'zustand'
import { devtools } from 'zustand/middleware'

type SettingsState = {
  modelName: string
  mode: string
  goal: string
  studied: boolean
  countRemain: number
  squatGoalCount: number
  workTime: number
  breakTime: number
}
type SettingsStoreState = {
  setDefaultState: () => void
  setModelName: (name: string) => void
  setMode: (name: string) => void
  setGoal: (goal: string) => void
  setStudied: (bool: boolean) => void
  setCountRemain: (count: number) => void
  setSquatGoalCount: (squatGoalCount: number) => void
  setWorkTime: (time: number) => void
  setBreakTime: (time: number) => void
} & SettingsState

export const initialState: SettingsState = {
  modelName: 'AliciaSolid',
  mode: 'initial',
  goal: '',
  studied: false,
  countRemain: 60,
  squatGoalCount: 15,
  workTime: 25,
  breakTime: 5,
}

export const useSettingsStore = create<SettingsStoreState>()(
  devtools((set) => ({
    ...initialState,
    setDefaultState: () =>
      set(
        (state) => ({
          ...state,
          ...initialState,
        }),
        false,
        'setDefaultState',
      ),
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
    setStudied: (bool: boolean) =>
      set(
        (state) => ({
          ...state,
          studied: bool,
        }),
        false,
        'setStudied',
      ),
    setCountRemain: (count: number) =>
      set(
        (state) => ({
          ...state,
          countRemain: count,
        }),
        false,
        'setCountRemain',
      ),
    setSquatGoalCount: (squatGoalCount: number) =>
      set(
        (state) => ({
          ...state,
          squatGoalCount,
        }),
        false,
        'setSquatGoalCount',
      ),
    setWorkTime: (time: number) =>
      set(
        (state) => ({
          ...state,
          workTime: time,
        }),
        false,
        'setWorkTime',
      ),
    setBreakTime: (time: number) =>
      set(
        (state) => ({
          ...state,
          breakTime: time,
        }),
        false,
        'setBreakTime',
      ),
  })),
)
