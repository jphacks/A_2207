import { Group, Text, useMantineTheme } from '@mantine/core'
import { IconUpload, IconMan, IconX } from '@tabler/icons'
import { Dropzone, DropzoneProps } from '@mantine/dropzone'
import { useVrmStore } from 'src/stores/vrmStore'
import shallow from 'zustand/shallow'

export function DropZoneFullScreen(props: Partial<DropzoneProps>) {
  const theme = useMantineTheme()
  const { setInputVrmModel } = useVrmStore(
    (state) => ({
      setInputVrmModel: state.setInputVrmModel,
    }),
    shallow,
  )
  return (
    <Dropzone.FullScreen
      onDrop={(files) => {
        console.log('accepted files', files)
        setInputVrmModel(files[0])
      }}
      onReject={(files) => console.log('rejected files', files)}
      {...props}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 100, pointerEvents: 'none' }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === 'dark' ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconMan size={50} stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            好きな VRM モデルをアップロードしてください
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            VRM ファイルをアップロード
          </Text>
        </div>
      </Group>
    </Dropzone.FullScreen>
  )
}
