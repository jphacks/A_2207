import { Property } from 'csstype'

export const OverlayWrapper = ({
  children,
  top,
  left,
  right,
  bottom,
}: {
  children: React.ReactNode
  top?: Property.Top<string | number> | undefined
  left?: Property.Left<string | number> | undefined
  right?: Property.Right<string | number> | undefined
  bottom?: Property.Bottom<string | number> | undefined
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {children}
    </div>
  )
}
