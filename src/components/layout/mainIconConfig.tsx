import {
  ActionIcon,
  Modal,
  Select,
  Center,
  Title,
  Stack,
  NumberInput,
} from '@mantine/core'
import { IconSettings } from '@tabler/icons'
import { Dispatch, SetStateAction } from 'react'
import shallow from 'zustand/shallow'
import { useVrmStore } from 'src/stores/vrmStore'
import { useSettingsStore } from 'src/stores/settingsStore'
import { DropZone } from './element/dropzone'

interface IconConfigProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export function IconConfig({ opened, setOpened }: IconConfigProps) {
  const { modelName, setModelName } = useVrmStore(
    (state) => ({
      modelName: state.modelName,
      setModelName: state.setModelName,
    }),
    shallow,
  )
  const { squatGoalCount, environment, setSquatGoalCount, setEnvironment } =
    useSettingsStore(
      (state) => ({
        environment: state.environment,
        setEnvironment: state.setEnvironment,
        squatGoalCount: state.squatGoalCount,
        setSquatGoalCount: state.setSquatGoalCount,
      }),
      shallow,
    )

  return (
    <>
      <Modal
        size="lg"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Stack spacing="xl">
          <Title order={3}>VRMモデルの選択</Title>
          <Select
            radius="md"
            size="md"
            value={modelName}
            onChange={setModelName}
            data={[
              { value: 'AliciaSolid', label: 'アリシア・ソリッド' },
              { value: 'Miraikomachi', label: 'ミライ小町' },
            ]}
          />
          <DropZone />

          <Title order={3}>詳細設定</Title>
          <NumberInput
            size="md"
            label="スクワットの回数"
            value={squatGoalCount}
            onChange={setSquatGoalCount}
          />

          <Title order={3}>時間帯</Title>
          <Select
            radius="md"
            size="md"
            value={environment}
            onChange={setEnvironment}
            data={[
              { value: 'sunset', label: '日中' },
              { value: 'dawn', label: '夕方' },
            ]}
          />
        </Stack>
      </Modal>

      <Center>
        <ActionIcon variant="transparent">
          <IconSettings onClick={() => setOpened(true)} />
        </ActionIcon>
      </Center>
    </>
  )
}
