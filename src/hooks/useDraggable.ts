import { useState, useRef, useCallback } from 'react'

interface Position {
  x: number
  y: number
  w: number
  h: number
}

interface DragState {
  isDragging: boolean
  fieldIndex: number | null
  startX: number
  startY: number
  offsetX: number
  offsetY: number
}

interface UseDraggableProps {
  canvasWidth: number
  canvasHeight: number
}

export const useDraggable = <T extends { position: Position }>({
  canvasWidth,
  canvasHeight,
}: UseDraggableProps) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    fieldIndex: null,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  })

  const canvasRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, index: number, items: T[]) => {
      e.preventDefault()
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const item = items[index]

      // Calculate offset from mouse to element's top-left corner
      const offsetX = e.clientX - rect.left - item.position.x
      const offsetY = e.clientY - rect.top - item.position.y

      setDragState({
        isDragging: true,
        fieldIndex: index,
        startX: e.clientX,
        startY: e.clientY,
        offsetX,
        offsetY,
      })
    },
    []
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, items: T[], updatePosition: (index: number, x: number, y: number) => void) => {
      if (!dragState.isDragging || dragState.fieldIndex === null) return

      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const item = items[dragState.fieldIndex]

      // Calculate new position relative to canvas
      let newX = e.clientX - rect.left - dragState.offsetX
      let newY = e.clientY - rect.top - dragState.offsetY

      // Bounds checking
      newX = Math.max(0, Math.min(newX, canvasWidth - item.position.w))
      newY = Math.max(0, Math.min(newY, canvasHeight - item.position.h))

      updatePosition(dragState.fieldIndex, newX, newY)
    },
    [dragState, canvasWidth, canvasHeight]
  )

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      fieldIndex: null,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
    })
  }, [])

  return {
    dragState,
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}
