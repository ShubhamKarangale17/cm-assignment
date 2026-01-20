import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import type { Blueprint } from '../../types/blueprint.types'
import * as db from '../../storage/db'

const A4_WIDTH = 794
const A4_HEIGHT = 1123

const FIELD_COLORS: Record<Blueprint['fields'][0]['type'], { bg: string; border: string; hover: string }> = {
  text: { bg: 'bg-blue-50', border: 'border-blue-300', hover: 'hover:border-blue-500' },
  date: { bg: 'bg-green-50', border: 'border-green-300', hover: 'hover:border-green-500' },
  checkbox: { bg: 'bg-purple-50', border: 'border-purple-300', hover: 'hover:border-purple-500' },
  signature: { bg: 'bg-orange-50', border: 'border-orange-300', hover: 'hover:border-orange-500' },
}

const ViewBlueprint = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null)

  useEffect(() => {
    if (id) {
      const data = db.get(`blueprint_${id}`)
      if (data) {
        try {
          const parsed = JSON.parse(data)
          parsed.createdAt = new Date(parsed.createdAt)
          parsed.updatedAt = new Date(parsed.updatedAt)
          setBlueprint(parsed)
        } catch (e) {
          console.error('Failed to load blueprint:', e)
          navigate('/blueprints')
        }
      } else {
        navigate('/blueprints')
      }
    }
  }, [id, navigate])

  if (!blueprint) {
    return (
      <div className="flex-1 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-8 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/blueprints')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <BiArrowBack className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{blueprint.name}</h1>
            {blueprint.description && (
              <p className="text-gray-600 mt-1">{blueprint.description}</p>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <p>Created: {blueprint.createdAt.toLocaleDateString()}</p>
          <p>Updated: {blueprint.updatedAt.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex justify-center gap-8">
        <div
          className="relative bg-white border-2 border-gray-300 shadow-2xl"
          style={{ width: A4_WIDTH, height: A4_HEIGHT }}
        >
          {/* A4 Label */}
          <div className="absolute top-4 left-4 text-xs text-gray-400 pointer-events-none select-none">
            A4 Canvas (794 x 1123 px) - Read Only View
          </div>

          {blueprint.fields.map((field, index) => (
            <div
              key={index}
              className={`absolute border-2 rounded-lg p-2 ${FIELD_COLORS[field.type].bg} ${FIELD_COLORS[field.type].border}`}
              style={{
                left: field.position.x,
                top: field.position.y,
                width: field.position.w,
                minHeight: field.position.h,
              }}
            >
              <label className="block text-xs font-semibold text-gray-800 mb-1 pointer-events-none">
                {field.label}
              </label>

              {/* <div className="border border-gray-300 rounded px-2 py-1 bg-white text-xs text-gray-400 pointer-events-none">
                {field.type === 'checkbox'
                  ? '☐ Checkbox'
                  : field.type === 'signature'
                  ? '✎ Signature area'
                  : field.type === 'date'
                  ? 'MM/DD/YYYY'
                  : `Enter ${field.type}...`}
              </div> */}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex-shrink-0">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Field Types</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
                <span className="text-xs text-gray-600">Text</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
                <span className="text-xs text-gray-600">Date</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 border-2 border-purple-300 rounded"></div>
                <span className="text-xs text-gray-600">Checkbox</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-100 border-2 border-orange-300 rounded"></div>
                <span className="text-xs text-gray-600">Signature</span>
              </div>
            </div>
          </div>

          {/* Blueprint Stats */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Blueprint Stats</h3>
            <div className="space-y-1 text-xs text-gray-600">
              <p>Total Fields: {blueprint.totalFields}</p>
              <p>Text: {blueprint.fields.filter(f => f.type === 'text').length}</p>
              <p>Date: {blueprint.fields.filter(f => f.type === 'date').length}</p>
              <p>Checkbox: {blueprint.fields.filter(f => f.type === 'checkbox').length}</p>
              <p>Signature: {blueprint.fields.filter(f => f.type === 'signature').length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBlueprint
