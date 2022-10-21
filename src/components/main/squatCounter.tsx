import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Camera } from '@mediapipe/camera_utils'
import { Pose, Results } from '@mediapipe/pose'
import { drawCanvas } from '../../utils/drawCanvas'
import updateCounter from '../../utils/updateCounter'
import { useTimer } from '../../hooks/useTimer'
import { Title, Stack, Progress } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'

const SquatCounter = () => {
  const { setMode, studied, squatGoalCount } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
      studied: state.studied,
      squatGoalCount: state.squatGoalCount,
    }),
    shallow,
  )
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resultsRef = useRef<any>(null)
  const [count, setCount] = useState(squatGoalCount)
  const [, setStage] = useState('')
  const prevStageRef = useRef('')
  const { time, isStart } = useTimer()
  const elbowRef = useRef([2 / 3, 2 / 3])

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
    const audio = new Audio("/voices/13.wav")
    audio.play()
  }, [])

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
            setCount((prevCount) => prevCount - 1)
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
    if (countGoal >= 10 && count === Math.floor(countGoal/2)) {
      const audio = new Audio("/voices/8.wav")
      audio.play()
    } else if (count === countGoal-3) {
      const audio = new Audio("/voices/14.wav")
      audio.play()
    } else if (count === countGoal) {
      if (studied) {
        setMode('break')
      } else {
        setMode('study')
      }
    }
  }, [count])

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <Stack sx={() => ({ backgroundColor: 'transparent', width: '100%' })}>
          {/* output */}
          <div style={{ position: 'relative', width: '100%' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                borderRadius: '10px',
                marginBottom: '5px',
              }}
            >
              <Progress
                value={(count / squatGoalCount) * 100}
                style={{ width: '70%' }}
              />
              <Title color="blue" pl={20}>
                : {count}
              </Title>
            </div>
            <div
              style={{
                padding: '0.5em',
                fontWeight: 'bold',
                background: '#FFF',
                border: 'solid 3px #6091d3',
                borderRadius: '10px',
                minWidth: '500px',
                width: '100%',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  borderBottomRightRadius: '10px',
                }}
              >
                {time <= 9 && time >= 1 && (
                  <Title p={10} color="blue" size="60px">
                    {time}
                  </Title>
                )}
                {time === 0 && (
                  <Title p={10} color="blue" size="50px">
                    START
                  </Title>
                )}
              </div>
              <canvas
                style={{
                  borderRadius: '5px',
                  padding: '1px',
                  height: '100%',
                  width: '100%',
                }}
                ref={canvasRef}
              />
            </div>
          </div>
        </Stack>
      </div>
      {/* capture */}
      <Webcam
        audio={false}
        style={{ visibility: 'hidden' }}
        width={0}
        height={0}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
    </>
  )
}

export default SquatCounter
