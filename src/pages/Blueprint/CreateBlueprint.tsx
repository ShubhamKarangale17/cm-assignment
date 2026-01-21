import { useState } from 'react'
import { BiPlus, BiX } from 'react-icons/bi'
import type { FormField, Blueprint } from '../../types/blueprint.types'
import { useDraggable } from '../../hooks/useDraggable'
import { DraggableField } from '../../components/DraggableField'
import * as blueprintApi from '../../apis/blueprint'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


const A4_WIDTH = 794
const A4_HEIGHT = 1123

const DEFAULT_SIZE: Record<FormField['type'], { w: number; h: number }> = {
  text: { w: 200, h: 35 },
  date: { w: 160, h: 35 },
  checkbox: { w: 140, h: 35 },
  signature: { w: 240, h: 50 },
  fixed: { w: 100, h: 30 },
}

const FIELD_COLORS: Record<FormField['type'], { bg: string; border: string; hover: string }> = {
  text: { bg: 'bg-blue-50', border: 'border-blue-300', hover: 'hover:border-blue-500' },
  date: { bg: 'bg-green-50', border: 'border-green-300', hover: 'hover:border-green-500' },
  checkbox: { bg: 'bg-purple-50', border: 'border-purple-300', hover: 'hover:border-purple-500' },
  signature: { bg: 'bg-orange-50', border: 'border-orange-300', hover: 'hover:border-orange-500' },
  fixed: { bg: 'bg-gray-50', border: 'border-gray-300', hover: 'hover:border-gray-500' },
}

const CreateBlueprint = () => {
  const [fields, setFields] = useState<FormField[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [blueprintName, setBlueprintName] = useState('')
  const [blueprintDescription, setBlueprintDescription] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const navigate = useNavigate()

  const { dragState, canvasRef, handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable<FormField>({
    canvasWidth: A4_WIDTH,
    canvasHeight: A4_HEIGHT,
  })

  const [newField, setNewField] = useState<{
    label: string
    type: FormField['type']
  }>({
    label: '',
    type: 'text',
  })

  const handleAddField = () => {
    if (newField.type !== 'fixed' && !newField.label.trim()) return
    if (newField.type === 'fixed' && !newField.label.trim()) {
      toast.error('Please enter the text to display')
      return
    }

    const size = DEFAULT_SIZE[newField.type]

    setFields((prev) => [
      ...prev,
      {
        label: newField.type === 'fixed' ? undefined : newField.label,
        type: newField.type,
        position: {
          x: 40,
          y: 40,
          w: size.w,
          h: size.h,
        },
        value: newField.type === 'fixed' ? newField.label : null,
      },
    ])

    setNewField({ label: '', type: 'text' })
    setIsModalOpen(false)
  }

  const updatePosition = (index: number, x: number, y: number) => {
    setFields((prev) =>
      prev.map((f, i) =>
        i === index ? { ...f, position: { ...f.position, x, y } } : f
      )
    )
  }

  const removeField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSaveBlueprint = async () => {
    if (!blueprintName.trim()) {
      toast.error('Please enter a blueprint name')
      return
    }

    if (fields.length === 0) {
      toast.error('Please add at least one field to the blueprint')
      return
    }

    setIsSaving(true)
    try {
      await blueprintApi.create({
        name: blueprintName,
        description: blueprintDescription || undefined,
        totalFields: fields.length,
        fields: fields,
      });

      toast.success('Blueprint saved successfully!')
      setIsSaveModalOpen(false)
      setBlueprintName('')
      setBlueprintDescription('')
      
      // Navigate to blueprints list
      navigate('/blueprints')
    } catch (error) {
      console.error('Failed to save blueprint:', error)
      toast.error('Failed to save blueprint')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-8 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create Blueprint
          </h1>
          <p className="text-gray-600 mt-1">Design your contract template on an A4 canvas</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium flex items-center gap-2"
          >
            <BiPlus className="w-5 h-5" />
            Add Field
          </button>
          <button 
            onClick={() => setIsSaveModalOpen(true)}
            disabled={fields.length === 0}
            className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Blueprint
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-8">
        <div
          ref={canvasRef}
          className="relative bg-white border-2 border-gray-300"
          style={{ width: A4_WIDTH, height: A4_HEIGHT }}
          onMouseMove={(e) => handleMouseMove(e, fields, updatePosition)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* A4 Label */}
          <div className="absolute top-4 left-4 text-xs text-gray-300 pointer-events-none select-none">
            A4 Canvas (794 x 1123 px) - Drag fields to position
          </div>

          {fields.map((field, index) => (
            <DraggableField
              key={index}
              field={field}
              index={index}
              isDragging={dragState.isDragging && dragState.fieldIndex === index}
              onMouseDown={handleMouseDown}
              onRemove={removeField}
              fields={fields}
              colors={FIELD_COLORS[field.type] || FIELD_COLORS.text}
            />
          ))}

          {/* Empty State */}
          {fields.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <BiPlus className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 font-medium">No fields added yet</p>
                <p className="text-sm text-gray-400">Click "Add Field" to start designing</p>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex-shrink-0">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm">
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
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
                <span className="text-xs text-gray-600">Static Text</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Add New Field
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <BiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {newField.type === 'fixed' ? 'Static Text' : 'Label'}
                </label>
                <input
                  type="text"
                  placeholder={newField.type === 'fixed' ? 'e.g., Respected Sir, To Whom It May Concern' : 'e.g., Full Name, Email, Date of Birth'}
                  value={newField.label}
                  onChange={(e) =>
                    setNewField({ ...newField, label: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newField.type}
                  onChange={(e) =>
                    setNewField({
                      ...newField,
                      type: e.target.value as FormField['type'],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="signature">Signature</option>
                  <option value="fixed">Static Text</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddField}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Field
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Blueprint Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Save Blueprint
              </h2>
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <BiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blueprint Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Employment Contract, NDA Template"
                  value={blueprintName}
                  onChange={(e) => setBlueprintName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  placeholder="Brief description of this blueprint..."
                  value={blueprintDescription}
                  onChange={(e) => setBlueprintDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <p className="font-medium mb-1">Blueprint Summary:</p>
                <p>• Total Fields: {fields.length}</p>
                <p>• Text: {fields.filter(f => f.type === 'text').length}</p>
                <p>• Date: {fields.filter(f => f.type === 'date').length}</p>
                <p>• Checkbox: {fields.filter(f => f.type === 'checkbox').length}</p>
                <p>• Signature: {fields.filter(f => f.type === 'signature').length}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsSaveModalOpen(false)}
                disabled={isSaving}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBlueprint}
                disabled={isSaving}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Blueprint'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateBlueprint
