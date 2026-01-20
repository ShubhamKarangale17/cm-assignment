import { BiX } from 'react-icons/bi'
import type { FormField } from '../types/blueprint.types'

interface DraggableFieldProps {
  field: FormField
  index: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent, index: number, fields: FormField[]) => void
  onRemove: (index: number) => void
  fields: FormField[]
  colors: { bg: string; border: string; hover: string }
}

export const DraggableField = ({
  field,
  index,
  isDragging,
  onMouseDown,
  onRemove,
  fields,
  colors,
}: DraggableFieldProps) => {
  return (
    <div
      className={`absolute border-2 rounded-lg p-2 hover:shadow-lg transition-all group ${
        colors.bg
      } ${
        isDragging
          ? `cursor-grabbing ${colors.border} shadow-xl z-50`
          : `cursor-grab ${colors.border} ${colors.hover}`
      }`}
      style={{
        left: field.position.x,
        top: field.position.y,
        width: field.position.w,
        minHeight: field.position.h,
      }}
      onMouseDown={(e) => onMouseDown(e, index, fields)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove(index)
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
      >
        <BiX className="w-3 h-3" />
      </button>

      {field.type === 'fixed' ? (
        <div className="text-sm font-medium text-gray-900 pointer-events-none">
          {field.value}
        </div>
      ) : (
        <>
          <label className="block text-xs font-semibold text-gray-800 mb-1 pointer-events-none">
            {field.label}
          </label>
        </>
      )}
{/* 
      <div className="border border-gray-300 rounded px-2 py-1 bg-white text-xs text-gray-400 pointer-events-none">
        {field.type === 'checkbox'
          ? '☐ Checkbox'
          : field.type === 'signature'
          ? '✎ Signature area'
          : field.type === 'date'
          ? 'MM/DD/YYYY'
          : `Enter ${field.type}...`}
      </div> */}
    </div>
  )
}
