import { useState } from 'react';
import { BiPlus, BiX } from 'react-icons/bi';
import type { FormField } from '../types/blueprint.types';

const CreateBlueprint = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newField, setNewField] = useState<FormField>({
    label: '',
    type: 'text',
    position: { x: 0, y: 0, w: 200, h: 40 },
    value: null
  });

  const handleAddField = () => {
    if (newField.label.trim()) {
      setFields([...fields, { ...newField }]);
      setNewField({
        label: '',
        type: 'text',
        position: { x: 0, y: 0, w: 200, h: 40 },
        value: null
      });
      setIsModalOpen(false);
    }
  };

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 bg-gray-50 h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Blueprint</h1>
            <p className="text-gray-600 mt-1">Design your contract template</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium flex items-center gap-2"
            >
              <BiPlus className="w-5 h-5" />
              Add Field
            </button>
            <button className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium">
              Save Blueprint
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 min-h-[600px] relative">
          <div className="text-center text-gray-400 mb-4">
            <p className="text-sm">Canvas Area - Add fields to design your blueprint</p>
          </div>
          
          {/* Display Fields */}
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:border-blue-500 transition-colors relative group"
                style={{
                  width: `${field.position.w}px`,
                  minHeight: `${field.position.h}px`
                }}
              >
                <button
                  onClick={() => handleRemoveField(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <BiX className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 uppercase">{field.type}</span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-xs text-gray-500">x:{field.position.x} y:{field.position.y}</span>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <div className="border border-gray-300 rounded px-3 py-2 bg-white text-sm text-gray-400">
                    {field.type === 'checkbox' ? '☐ Checkbox' : 
                     field.type === 'signature' ? '✎ Signature' :
                     field.type === 'date' ? 'MM/DD/YYYY' :
                     `Enter ${field.type}...`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {fields.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <BiPlus className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400">No fields added yet</p>
                <p className="text-sm text-gray-400">Click "Add Field" to start designing</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Field</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <BiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Label */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Full Name"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newField.type}
                  onChange={(e) => setNewField({ ...newField, type: e.target.value as FormField['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="signature">Signature</option>
                </select>
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">X</label>
                    <input
                      type="number"
                      value={newField.position.x}
                      onChange={(e) => setNewField({
                        ...newField,
                        position: { ...newField.position, x: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Y</label>
                    <input
                      type="number"
                      value={newField.position.y}
                      onChange={(e) => setNewField({
                        ...newField,
                        position: { ...newField.position, y: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Width</label>
                    <input
                      type="number"
                      value={newField.position.w}
                      onChange={(e) => setNewField({
                        ...newField,
                        position: { ...newField.position, w: parseInt(e.target.value) || 200 }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Height</label>
                    <input
                      type="number"
                      value={newField.position.h}
                      onChange={(e) => setNewField({
                        ...newField,
                        position: { ...newField.position, h: parseInt(e.target.value) || 40 }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
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
    </div>
  );
};

export default CreateBlueprint;
