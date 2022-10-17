import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS, POSE_LANDMARKS_LEFT, POSE_LANDMARKS_RIGHT, POSE_LANDMARKS_NEUTRAL, Results } from '@mediapipe/pose';

/**
 * cnavasに描画する
 * @param ctx canvas context
 * @param results 手の検出結果
 */
export const drawCanvas = (ctx: CanvasRenderingContext2D, results: Results) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height

    ctx.save()
    ctx.clearRect(0, 0, width, height)
    // canvas の左右反転
    ctx.scale(-1, 1)
    ctx.translate(-width, 0)
    // capture image の描画
    ctx.drawImage(results.image, 0, 0, width, height)
    // 手の描画
    if (results.poseLandmarks) {
        drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {visibilityMin: 0.65, color: 'white'});
        drawLandmarks(
            ctx,
            Object.values(POSE_LANDMARKS_LEFT)
                .map(index => results.poseLandmarks[index]),
            {visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)'});
        drawLandmarks(
            ctx,
            Object.values(POSE_LANDMARKS_RIGHT)
                .map(index => results.poseLandmarks[index]),
            {visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)'});
        drawLandmarks(
            ctx,
            Object.values(POSE_LANDMARKS_NEUTRAL)
                .map(index => results.poseLandmarks[index]),
            {visibilityMin: 0.65, color: 'white', fillColor: 'white'});
    }
    ctx.restore()
}
