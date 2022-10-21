import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { POSE_CONNECTIONS, Results } from '@mediapipe/pose'

/**
 * cnavasに描画する
 * @param ctx canvas context
 * @param results 手の検出結果
 */
export const drawCanvas = (
  ctx: CanvasRenderingContext2D,
  results: Results,
  elbow: any,
) => {
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  ctx.save()
  ctx.clearRect(0, 0, width, height)
  // canvas の左右反転
  ctx.scale(-1, 1)
  ctx.translate(-width, 0)
  // capture image の描画
  ctx.drawImage(results.image, 0, 0, width, height)

  // console.log(elbow)

  if (elbow[0] !== 0 && elbow[1] !== 0) {
    ctx.lineWidth = 4
    ctx.strokeStyle = '#ffffff'
    ctx.moveTo(0, elbow[0] * height)
    ctx.lineTo(width, elbow[0] * height)
    ctx.stroke()
  }

  // 手の描画
  if (results.poseLandmarks) {
    drawConnectors(
      ctx,
      [results.poseLandmarks[11], results.poseLandmarks[12]],
      POSE_CONNECTIONS,
      { visibilityMin: 0.65, color: 'white' },
    )
    drawLandmarks(
      ctx,
      [results.poseLandmarks[11], results.poseLandmarks[12]],
      // Object.values(POSE_LANDMARKS_RIGHT)
      //     .map(index => results.poseLandmarks[index]),
      { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)' },
    )
    // drawLandmarks(
    //     ctx,
    //     Object.values(POSE_LANDMARKS_NEUTRAL)
    //         .map(index => results.poseLandmarks[index]),
    //     {visibilityMin: 0.65, color: 'white', fillColor: 'white'});
  }
  ctx.restore()
}
