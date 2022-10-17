import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { css } from "@emotion/css";
import { Camera } from "@mediapipe/camera_utils";
import { Pose, Results } from "@mediapipe/pose";
import { drawCanvas } from "../utils/drawCanvas";
import updateCounter from "../utils/updateCounter";
import { useTimer } from "../hooks/useTimer";
import { Title, Stack } from '@mantine/core'

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

const styles = {
    webcam: css`
      position: absolute;
      top: 0px;
      left: 0px;
      visibility: hidden;
    `
}

const SquatCounter = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const resultsRef = useRef<any>(null);
    const [count, setCount] = useState(0);
    const [stage, setStage] = useState("");
    const prevStageRef = useRef("");
    const { time, isStart } = useTimer();

    /**
     * 検出結果（フレーム毎に呼び出される）
     * @param results
     */
    const onResults = useCallback((results: Results) => {
        resultsRef.current = results;
        const canvasCtx = canvasRef.current!.getContext("2d")!;
        drawCanvas(canvasCtx, results);
    }, []);

    // 初期設定
    useEffect(() => {
        const pose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            },
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        pose.onResults(onResults);

        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null
        ) {
            const camera = new Camera(webcamRef.current.video!, {
                onFrame: async () => {
                    await pose.send({ image: webcamRef.current!.video! });
                },
                width: 1280,
                height: 720,
            });
            camera.start();
        }
    }, [onResults]);

    useEffect(() => {
        if (isStart) {
            console.log("start!!");
            const landmarks = resultsRef.current.poseLandmarks;
            const leftElbow = landmarks[13].y;
            const rightElbow = landmarks[14].y;

            const timerId = setInterval(() => {
                const updateResult = updateCounter(
                    resultsRef.current,
                    prevStageRef.current,
                    leftElbow,
                    rightElbow
                );
                if (updateResult) {
                    setStage(updateResult.newStage);
                    if (
                        prevStageRef.current === "DOWN" &&
                        updateResult.newStage === "UP"
                    ) {
                        setCount((prevCount) => prevCount + 1);
                    }
                    prevStageRef.current = updateResult.newStage;
                }
            }, 100);
            return () => {
                clearInterval(timerId);
            };
        }
    }, [isStart]);


    return (
        // <div className={styles.container}>
        <div style={{width:'100%', height:'100%'}}>
            {/* capture */}
            <Webcam
                audio={false}
                style={{ visibility: "hidden" }}
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
                <div>
                    <p>Count : {count}</p>
                    <p>Stage : {stage}</p>
                    {/* <Title>
                    {(time <= 9 && time >= 1) ? time :
                        (time===0 && time)
                    }
                    </Title> */}

                    {/* <div className={styles.pictures}> */}
                    {/* <div style={{ zIndex : "10px" }}> */}
                        {/* {(time <= 9 && time >= 1) ? <Title>{time}</Title> :
                            (time===0 && <Title>{time}</Title>)
                        }   */}
                        {/* {time <= 9 && time >= 1 && <img src={`/number_${time}.png`} alt="countdown" />}
                        {time == 0 && <img src={`/start.png`} alt="start" />} */}
                    {/* </div> */}
                    {/* <ColoredLine /> */}
                </div>
                {/* draw */}
                <canvas ref={canvasRef} style={{ minWidth: '300px', width: "30vw" }} />
            </Stack>

        </div>
    );
};

export default SquatCounter
