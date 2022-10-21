import { Button, Center, Stack, Title } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect } from 'react'

const FinaleMenu = () => {
  const { setDefaultState } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
      mode: state.mode,
      setDefaultState: state.setDefaultState,
    }),
    shallow,
  )

  const sleep = (second: number) => new Promise(resolve => setTimeout(resolve, second * 1000))

  useEffect(() => {
    (async() => {
      const fileNumbers = [11, 12]
      for (const fileNumber of fileNumbers) {
        // 音声の再生が終わるまでループを回さないように止めておく
        await new Promise<void>((resolve) => {
            const sound = new Audio(`voices/${fileNumber}.wav`)
            sound.play();
            sound.addEventListener('ended', async () => {
                // 音声終了後にいきなり次の音声が再生されてると違和感がすごいのでちょっとスリープかける
                await sleep(1);
                resolve();
            }, {once: true});
        });
      }
    })()
  }, [])

  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <Stack sx={() => ({ backgroundColor: 'transparent' })}>
        <Title color="blue" style={{ fontSize: '50px' }}>
          お疲れ様でした
        </Title>
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          radius="xl"
          size="md"
          onClick={() => setDefaultState()}
        >
          もう一度はじめる
        </Button>
      </Stack>
    </Center>
  )
}

export default FinaleMenu
