import { ActionIcon, Modal, Select, Center, Grid, Slider, Text, Title, Stack } from '@mantine/core'
import { IconSettings } from '@tabler/icons'
import { Dispatch, SetStateAction, useState } from 'react'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useAnimationStore } from 'src/stores/animtionStore'

interface IconConfigProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export function IconConfig({ opened, setOpened }: IconConfigProps) {
  const { modelName, setModelName, positionX, setPositionX, positionY, setPositionY, positionZ, setPositionZ } = useSettingsStore(
    (state) => ({
      modelName: state.modelName,
      setModelName: state.setModelName,
      positionX: state.positionX,
      setPositionX: state.setPositionX,
      positionY: state.positionY,
      setPositionY: state.setPositionY,
      positionZ: state.positionZ,
      setPositionZ: state.setPositionZ,
    }),
    shallow,
  )
  const { animation, setAnimation } = useAnimationStore(
    (state) => ({
      animation: state.animation,
      setAnimation: state.setAnimation,
    }),
    shallow,
  )

  const [excercise, setExcercise] = useState<string | null>('squat') // TODO: 終了後にやりたいエクササイズ

  return (
    <div>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title=<Title>設定</Title>
        
      >

        {/* Modal content */}
        <Stack spacing='xl'>
          <Select
            label="好きな3Dモデルを選択してください"
            value={modelName}
            onChange={setModelName}
            data={[
              { value: 'AliciaSolid', label: 'アリシア・ソリッド' },
              { value: 'Tsukuyomi', label: 'つくよみちゃん' },
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

          <Stack spacing='xs'>
            <Text size='sm'>3Dモデルの位置を調整してください</Text>
            <Grid>
              <Grid.Col span={1}>
                <Text>x:</Text>
              </Grid.Col>
              <Grid.Col span={11}>
                <Slider
                  defaultValue={positionX}
                  onChangeEnd={setPositionX}
                  min={-5}
                  max={5}
                  label={(value) => value.toFixed(1)}
                  step={0.1}
                  styles={{ markLabel: { display: 'none' } }}
                />
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={1}>
                <Text>y:</Text>
              </Grid.Col>
              <Grid.Col span={11}>
                <Slider
                  defaultValue={positionY}
                  onChangeEnd={setPositionY}
                  min={-5}
                  max={5}
                  label={(value) => value.toFixed(1)}
                  step={0.1}
                  styles={{ markLabel: { display: 'none' } }}
                />
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={1}>
                <Text>z:</Text>
              </Grid.Col>
              <Grid.Col span={11}>
                <Slider
                  defaultValue={positionZ}
                  onChangeEnd={setPositionZ}
                  min={-5}
                  max={5}
                  label={(value) => value.toFixed(1)}
                  step={0.1}
                  styles={{ markLabel: { display: 'none' } }}
                />
              </Grid.Col>
            </Grid>
          </Stack>

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
            label="25分ごとのメニューを選んでください"
            value={animation}
            onChange={setAnimation}
            data={[
              { value: 'squat', label: 'スクワット' },
              { value: 'deepBreath', label: '深呼吸' },
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
