import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Camera } from '@mediapipe/camera_utils'
import { Pose, Results } from '@mediapipe/pose'
import { drawCanvas } from '../../utils/drawCanvas'
import updateCounter from '../../utils/updateCounter'
import { useTimer } from '../../hooks/useTimer'
import { Title, Stack, Text, SimpleGrid } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'

const SquatCounter = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resultsRef = useRef<any>(null)
  const [count, setCount] = useState(0)
  const [stage, setStage] = useState('')
  const prevStageRef = useRef('')
  const { time, isStart } = useTimer()
  const elbowRef = useRef([2 / 3, 2 / 3])
  const { setMode, studied } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
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
    if (count === 5) {
      if (studied) {
        setMode('finish')
      } else {
        setMode('study')
      }
    }
  }, [count])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* capture */}
      <Webcam
        audio={false}
        style={{ visibility: 'hidden' }}
        width={0}
        height={0}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <Stack sx={() => ({ backgroundColor: 'transparent' })}>
        {/* output */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              padding: '2em 2em',
              margin: '2em 0',
              fontWeight: 'bold',
              background: '#FFF',
              border: 'solid 3px #6091d3',
              borderRadius: '10px',
            }}
          >
            <SimpleGrid cols={2}>
              <Text>残り回数 :</Text>
              <Text>{count}</Text>
            </SimpleGrid>
            <SimpleGrid cols={2}>
              <Text>状態 : </Text>
              <Text>{stage}</Text>
            </SimpleGrid>
          </div>
          <div
            style={{
              padding: '1em 1em',
              margin: '2em 0',
              fontWeight: 'bold',
              background: '#FFF',
              border: 'solid 3px #6091d3',
              borderRadius: '10px',
              minWidth: '300px',
              width: '30vw',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                backgroundColor: 'white',
              }}
            >
              {time <= 9 && time >= 1 && (
                <Title p={3} color="blue">
                  {time}
                </Title>
              )}
              {time === 0 && <Title color="blue">START</Title>}
            </div>
            <canvas
              style={{
                borderRadius: '5px',
                height: '100%',
                width: '100%',
              }}
              ref={canvasRef}
            />
          </div>
        </div>
      </Stack>
    </div>
  )
}

export default SquatCounter
