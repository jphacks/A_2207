import { Results } from "@mediapipe/pose";

function checkPosition(leftNow: number, rightNow: number, leftRef: number, rightRef: number) {
    let isClear = false;
    if (leftRef <= leftNow && rightRef <= rightNow) {
        isClear = true
    }
    return isClear;
}

const updateCounter = (
    results: Results,
    stage: string,
    leftElbow: number,
    rightElbow: number
) => {
    const landmarks = results.poseLandmarks;

    if (landmarks === void 0) {
        return null;
    }

    const leftShoulder = landmarks[11].y;
    const rightShoulder = landmarks[12].y;
    let isClear = checkPosition(leftShoulder, rightShoulder, leftElbow, rightElbow)

    let newStage: string = stage;
    let countChange: number = 0;

    if (!isClear) {
        newStage = "UP";
    }
    else if (isClear && stage === "UP") {
        newStage = "DOWN";
        countChange = 1;
    }
    return { newStage: newStage, countChange: countChange };
};

export default updateCounter;
