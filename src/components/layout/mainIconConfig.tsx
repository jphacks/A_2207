import { ActionIcon, Modal, Select, Center, FileInput } from '@mantine/core'
import { IconSettings, IconUpload } from '@tabler/icons'
import { Dispatch, SetStateAction, useState } from 'react'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'

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

  const [modelFile, setModelFile] = useState<File | null>(null)
  const [excercise, setExcercise] = useState<string | null>('squat') // TODO: 終了後にやりたいエクササイズ

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="ここに設定を置く"
      >
        <Select
          label="好きな3Dモデルを選択してください"
          value={modelName}
          onChange={setModelName}
          data={[
            { value: 'AliciaSolid', label: 'アリシア・ソリッド' },
            { value: 'Tsukuyomi', label: 'つくよみちゃん' },
          ]}
        />

        <FileInput
          label="または"
          placeholder="vrmファイルをアップロード"
          value={modelFile}
          onChange={setModelFile}
          icon={<IconUpload size={14} />}
        />

        <Select
          label="終了後のエクササイズ"
          value={excercise}
          onChange={setExcercise}
          data={[
            { value: 'squat', label: 'スクワット' },
            { value: 'deepBreath', label: '深呼吸' },
          ]}
        />

        {/* Modal content */}
      </Modal>
      <Center>
        <ActionIcon variant="transparent">
          <IconSettings onClick={() => setOpened(true)} />
        </ActionIcon>
      </Center>
    </div>
  )
}
