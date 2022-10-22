import { Button, Center, Stack, Text } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect } from 'react'
import { useVrmStore } from 'src/stores/vrmStore'

const ChoiceButton = () => {
  const { setMode } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
      goal: state.goal,
      setGoal: state.setGoal,
    }),
    shallow,
  )
  const { setAnimation } = useVrmStore(
    (state) => ({
      setAnimation: state.setAnimation,
    }),
    shallow,
  )

  useEffect(() => {
    // (async() => {
    //   const fileNumbers = [4]
    //   for (const fileNumber of fileNumbers) {
    //     // 音声の再生が終わるまでループを回さないように止めておく
    //     await new Promise<void>((resolve) => {
    //         const sound = new Audio(`voices/${fileNumber}.wav`)
    //         sound.play();
    //         sound.addEventListener('ended', async () => {
    //             // 音声終了後にいきなり次の音声が再生されてると違和感がすごいのでちょっとスリープかける
    //             await sleep(1);
    //             resolve();
    //         }, {once: true});
    //     });
    //   }
    // })()
    const audio = new Audio('/voices/11.wav')
    setAnimation('Thankful')
    audio.play()
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
          スクワットモード
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          radius="xl"
          size="xl"
          // disabled
        >
          <Stack spacing={0}>
            <Text color="gray.5">深呼吸モード</Text>
            <Text size="xs" color="gray.4">
              Comming Soon
            </Text>
          </Stack>
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          radius="xl"
          size="xl"
          onClick={() => setMode('initial')}
        >
          終了する
        </Button>
      </Stack>
    </Center>
  )
}

export default ChoiceButton
