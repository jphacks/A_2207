import { Button, Center, TextInput, Stack } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect } from 'react'

const ChoiceButton = () => {
  const { setMode, goal, setGoal } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
      goal: state.goal,
      setGoal: state.setGoal,
    }),
    shallow,
  )

  const sleep = (second: number) => new Promise(resolve => setTimeout(resolve, second * 1000))

  useEffect(() => {
    (async() => {
      const fileNumbers = [4, 5, 6]
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
      <Stack sx={() => ({ backgroundColor: 'transparent', height: 300 })}>
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          radius="xl"
          size="xl"
          onClick={() => setMode('fitness')}
        >
          スクワットに挑戦する
        </Button>
        <Button
          variant="default"
          radius="xl"
          size="xl"
          onClick={() => setMode('finale')}
        >
          終了する
        </Button>
      </Stack>
    </Center>
  )
}

export default ChoiceButton
