import {
  ActionIcon,
  Modal,
  Select,
  Center,
  Title,
  Stack,
  FileInput,
} from '@mantine/core'
import { IconSettings, IconUpload } from '@tabler/icons'
import { Dispatch, SetStateAction } from 'react'
import shallow from 'zustand/shallow'
import { useVrmStore } from 'src/stores/vrmStore'

interface IconConfigProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export function IconConfig({ opened, setOpened }: IconConfigProps) {
  const {
    expression,
    setExpression,
    modelName,
    setModelName,
    inputVrmModel,
    setInputVrmModel,
  } = useVrmStore(
    (state) => ({
      expression: state.expression,
      modelName: state.modelName,
      inputVrmModel: state.inputVrmModel,
      setModelName: state.setModelName,
      setExpression: state.setExpression,
      setInputVrmModel: state.setInputVrmModel,
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
