import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { css } from '@emotion/css'
import { Camera } from '@mediapipe/camera_utils'
import { Pose, Results } from '@mediapipe/pose'
import { drawCanvas } from '../../utils/drawCanvas'
import updateCounter from '../../utils/updateCounter'
import { useTimer } from '../../hooks/useTimer'
import { Title, Stack, Text, SimpleGrid } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
}

const styles = {
  webcam: css`
    position: absolute;
    top: 0px;
    left: 0px;
    visibility: hidden;
  `,
}

const SquatCounter = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resultsRef = useRef<any>(null)
  const [count, setCount] = useState(0)
  const [stage, setStage] = useState('')
  const prevStageRef = useRef('')
  const { time, isStart } = useTimer()
  const elbowRef = useRef([2 / 3, 2 / 3])
  const { setMode, setPositionX, setPositionY, setPositionZ, studied } =
    useSettingsStore(
      (state) => ({
        setMode: state.setMode,
        setPositionX: state.setPositionX,
        setPositionY: state.setPositionY,
        setPositionZ: state.setPositionZ,
        studied: state.studied,
      }),
      shallow,
    )

  /**
   * 検出結果（フレーム毎に呼び出される）
   * @param results
   */
  const onResults = useCallback((results: Results) => {
    resultsRef.current = results
    const canvasCtx = canvasRef.current!.getContext('2d')!
    drawCanvas(canvasCtx, results, elbowRef.current)
  }, [])

  // 初期設定
  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
      },
    })

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    pose.onResults(onResults)

    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null
    ) {
      const camera = new Camera(webcamRef.current.video!, {
        onFrame: async () => {
          if (webcamRef.current !== null) {
            await pose.send({ image: webcamRef.current!.video! })
          }
        },
        width: 1280,
        height: 720,
      })
      camera.start()
    }
  }, [onResults])

  useEffect(() => {
    if (time > 0 && resultsRef.current !== null) {
      const landmarks = resultsRef.current.poseLandmarks
      if (landmarks && landmarks[13] && landmarks[14]) {
        const leftElbow = landmarks[13].y
        const rightElbow = landmarks[14].y
        if (0.2 <= leftElbow && leftElbow <= 0.8) {
          elbowRef.current = [leftElbow, leftElbow]
        }
      }
    }
  }, [time])

  useEffect(() => {
    if (isStart && time > 0) {

      const timerId = setInterval(() => {
        const updateResult = updateCounter(
          resultsRef.current,
          prevStageRef.current,
          elbowRef.current[0],
          elbowRef.current[1],
        )
        if (updateResult) {
          setStage(updateResult.newStage)
          if (
            prevStageRef.current === 'DOWN' &&
            updateResult.newStage === 'UP'
          ) {
            setCount((prevCount) => prevCount + 1)
          }
          prevStageRef.current = updateResult.newStage
        }
      }, 100)
      return () => {
        clearInterval(timerId)
      }
    }
  }, [isStart])

  useEffect(() => {
    const countGoal = 5
    if (count === countGoal-10) {
      const audio = new Audio("/voices/7.wav")
      audio.play()
    } else if (countGoal >= 10 && count === Math.floor(countGoal/2)) {
      const audio = new Audio("/voices/8.wav")
      audio.play()
    } else if (count === countGoal-3) {
      const audio = new Audio("/voices/9.wav")
      audio.play()
    } else if (count === countGoal-1) {
      const audio = new Audio("/voices/10.wav")
      audio.play()
    } else if (count === 15) {
      if (studied) {
        setMode('finish')
      } else {
        setMode('study')
      }
      setPositionX(0)
      setPositionY(-0.8)
      setPositionZ(0)
    }
  }, [count])

  return (
    // <div className={styles.container}>
    <div style={{ width: '100%', height: '100%' }}>
      {/* capture */}
      <Webcam
        audio={false}
        style={{ visibility: 'hidden' }}
        width={128}
        height={72}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className={styles.webcam}
      />
      <Stack sx={() => ({ backgroundColor: 'transparent' })}>
        {/* output */}
        {/* <div className={styles.buttonContainer}> */}
        <div style={{ position: 'relative' }}>
          <SimpleGrid cols={2}>
            <Text>カウント :</Text>
            <Text color="red" weight={700}>
              {' '}
              {count}
            </Text>
          </SimpleGrid>
          <SimpleGrid cols={2}>
            <Text>状態 : </Text>
            <Text color="red" weight={700}>
              {stage}
            </Text>
          </SimpleGrid>

          {time <= 9 && time >= 1 && (
            <Title
              color="blue"
              style={{
                fontSize: '300px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {time}
            </Title>
          )}
          {time === 0 && (
            <Title
              color="blue"
              style={{
                fontSize: '150px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              START
            </Title>
          )}
          <canvas
            ref={canvasRef}
            style={{ minWidth: '300px', width: '30vw' }}
          />
        </div>
      </Stack>
    </div>
  )
}

export default SquatCounter
