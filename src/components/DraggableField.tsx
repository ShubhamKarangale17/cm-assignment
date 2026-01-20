import { BiX } from 'react-icons/bi'
import type { FormField } from '../types/blueprint.types'

interface DraggableFieldProps {
  field: FormField
  index: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent, index: number, fields: FormField[]) => void
  onRemove: (index: number) => void
  fields: FormField[]
}

export const DraggableField = ({
  field,
  index,
  isDragging,
  onMouseDown,
  onRemove,
  fields,
}: DraggableFieldProps) => {
  return (
    <div
      className={`absolute bg-white border-2 rounded-lg p-3 hover:border-blue-500 hover:shadow-lg transition-all group ${
        isDragging
          ? 'cursor-grabbing border-blue-500 shadow-xl z-50'
          : 'cursor-grab border-gray-300'
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
        <BiX className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 mb-2 pointer-events-none">
        <span className="text-xs font-medium text-blue-600 uppercase px-2 py-0.5 bg-blue-50 rounded">
          {field.type}
        </span>
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-1 pointer-events-none">
        {field.label}
      </label>

      <div className="border border-gray-300 rounded px-3 py-1.5 bg-gray-50 text-xs text-gray-400 pointer-events-none">
        {field.type === 'checkbox'
          ? '☐ Checkbox'
          : field.type === 'signature'
          ? '✎ Signature area'
          : field.type === 'date'
          ? 'MM/DD/YYYY'
          : `Enter ${field.type}...`}
      </div>
    </div>
  )
}
