import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { css } from "@emotion/css";
import { Camera } from "@mediapipe/camera_utils";
import { Pose, Results } from "@mediapipe/pose";
import { drawCanvas } from "./utils/drawCanvas";
import updateCounter from "./utils/updateCounter";
import { useTimer } from "./hooks/useTimer";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

const styles = {
    container: css`
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    canvas: css`
        position: absolute;
        width: 100vw;
        height: auto;
        background-color: #fff;
    `,
    buttonContainer: css`
        position: absolute;
        top: 20px;
        left: 20px;
    `,
    button: css`
        color: #fff;
        background-color: #0082cf;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        padding: 10px 10px;
        cursor: pointer;
    `,
    pictures: css`
        margin: 0 auto;
    `,
};

export const App = () => {
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

    /** 検出結果をconsoleに出力する */
    const OutputData = () => {
        const results = resultsRef.current as Results;
        console.log(results.poseLandmarks);
    };

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

    const ColoredLine = ({}) => (
        <hr
            style={{
                color: "red",
                backgroundColor: "red",
                height: 20,
                textAlign: 'center'
            }}
            
        />
    );

    return (
        <div className={styles.container}>
            {/* capture */}
            <Webcam
                audio={false}
                style={{ visibility: "hidden" }}
                width={1280}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            {/* draw */}
            <canvas ref={canvasRef} className={styles.canvas} />
            {/* output */}
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={OutputData}>
                    Output Data
                </button>
                {/* TODO */}
                <p>Count : {count}</p>
                <p>Stage : {stage}</p>
                <p>Time : {time}</p>
                <div className={styles.pictures}>
                    {time <= 9 && time >= 1 && <img src={`/number_${time}.png`} alt="countdown" />}
                    {time == 0 && <img src={`/start.png`} alt="start" />}
                </div>
                <ColoredLine />
            </div>
        </div>
    );
};
