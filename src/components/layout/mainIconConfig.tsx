import { ActionIcon, Modal, Select, Center, Title, Stack } from '@mantine/core'
import { IconSettings } from '@tabler/icons'
import { Dispatch, SetStateAction, useState } from 'react'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useVrmStore } from 'src/stores/vrmStore'

interface IconConfigProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export function IconConfig({ opened, setOpened }: IconConfigProps) {
  const { modelName, setModelName } = useSettingsStore(
    (state) => ({
      modelName: state.modelName,
      setModelName: state.setModelName,
    }),
    shallow,
  )
  const { animation, setAnimation, expression, setExpression } = useVrmStore(
    (state) => ({
      animation: state.animation,
      expression: state.expression,
      setAnimation: state.setAnimation,
      setExpression: state.setExpression,
    }),
    shallow,
  )

  const [excercise, setExcercise] = useState<string | null>('squat') // TODO: 終了後にやりたいエクササイズ

  return (
    <div>
      <Modal
        size="lg"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title>設定</Title>}
      >
        {/* Modal content */}
        <Stack spacing="xl">
          <Select
            label="好きな3Dモデルを選択してください"
            value={modelName}
            onChange={setModelName}
            data={[
              { value: 'AliciaSolid', label: 'アリシア・ソリッド' },
              { value: 'Tsukuyomi', label: 'つくよみちゃん' },
              { value: 'Miraikomachi', label: 'ミライ小町' },
            ]}
          />

          {/* TODO */}
          {/* <FileInput
            label="または"
            placeholder="vrmファイルをアップロード"
            value={modelFile}
            onChange={setModelFile}
            icon={<IconUpload size={14} />}
          /> */}

          <Select
            label="25分ごとのメニューを選んでください"
            value={excercise}
            onChange={setExcercise}
            data={[
              { value: 'squat', label: 'スクワット' },
              { value: 'deepBreath', label: '深呼吸' },
            ]}
          />
          <Select
            label="animationを選んでください"
            value={animation}
            onChange={setAnimation}
            data={[
              { value: 'idle', label: '立ち姿' },
              { value: 'BreakdanceEnding1', label: 'ブレイクダンス' },
              { value: 'StandingGreeting', label: '手を振る' },
            ]}
          />
          <Select
            label="expressionを選んでください"
            value={expression}
            onChange={setExpression}
            data={[
              { value: 'neutral', label: 'neutral' },
              { value: 'happy', label: 'Happy' },
            ]}
          />
        </Stack>
      </Modal>
      <Center>
        <ActionIcon variant="transparent">
          <IconSettings onClick={() => setOpened(true)} />
        </ActionIcon>
      </Center>
    </div>
  )
}
