import {
  ActionIcon,
  Modal,
  Select,
  Center,
  Title,
  Stack,
  FileInput,
  NumberInput,
} from '@mantine/core'
import { IconSettings, IconUpload } from '@tabler/icons'
import { Dispatch, SetStateAction } from 'react'
import shallow from 'zustand/shallow'
import { useVrmStore } from 'src/stores/vrmStore'
import { useSettingsStore } from 'src/stores/settingsStore'

interface IconConfigProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export function IconConfig({ opened, setOpened }: IconConfigProps) {
  const { modelName, setModelName, inputVrmModel, setInputVrmModel } =
    useVrmStore(
      (state) => ({
        modelName: state.modelName,
        inputVrmModel: state.inputVrmModel,
        setModelName: state.setModelName,
        setInputVrmModel: state.setInputVrmModel,
      }),
      shallow,
    )
  const { squatGoalCount, setSquatGoalCount } = useSettingsStore(
    (state) => ({
      squatGoalCount: state.squatGoalCount,
      setSquatGoalCount: state.setSquatGoalCount,
    }),
    shallow,
  )

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
          <FileInput
            label="好きなvrmモデルをアップロードしてください"
            placeholder="vrmファイルをアップロード"
            value={inputVrmModel}
            onChange={setInputVrmModel}
            icon={<IconUpload size={14} />}
          />

          <NumberInput
            label="スクワットの回数を指定してください"
            value={squatGoalCount}
            onChange={setSquatGoalCount}
          />
          {/* <Select
            label="expressionを選んでください"
            value={expression}
            onChange={setExpression}
            data={[
              { value: 'neutral', label: 'neutral' },
              { value: 'happy', label: 'Happy' },
            ]}
          /> */}
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
