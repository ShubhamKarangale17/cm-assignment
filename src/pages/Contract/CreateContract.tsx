import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import type { Blueprint, FormField } from '../../types/blueprint.types'
import type { Contract } from '../../types/contracts.types'
import * as db from '../../storage/db'
import toast from 'react-hot-toast'

const FIELD_COLORS: Record<FormField['type'], { bg: string; border: string }> = {
    text: { bg: 'bg-blue-50', border: 'border-blue-200' },
    date: { bg: 'bg-green-50', border: 'border-green-200' },
    checkbox: { bg: 'bg-purple-50', border: 'border-purple-200' },
    signature: { bg: 'bg-orange-50', border: 'border-orange-200' },
    fixed: { bg: 'bg-gray-50', border: 'border-gray-200' },
}

const CreateContract = () => {
    const navigate = useNavigate()

    const [blueprints, setBlueprints] = useState<Blueprint[]>([])
    const [selectedBlueprintId, setSelectedBlueprintId] = useState('')
    const [contractName, setContractName] = useState('')
    const [contractDescription, setContractDescription] = useState('')
    const [fieldsWithValues, setFieldsWithValues] = useState<FormField[]>([])

    useEffect(() => {
        const loaded: Blueprint[] = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key && key.startsWith('blueprint_')) {
                const value = localStorage.getItem(key)
                if (value) {
                    try {
                        const bp = JSON.parse(value)
                        bp.createdAt = new Date(bp.createdAt)
                        bp.updatedAt = new Date(bp.updatedAt)
                        loaded.push(bp)
                    } catch (e) {
                        console.error('Failed to parse blueprint', e)
                    }
                }
            }
        }
        loaded.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        setBlueprints(loaded)
    }, [])

    const selectedBlueprint = useMemo(
        () => blueprints.find((bp) => bp.id === selectedBlueprintId) || null,
        [blueprints, selectedBlueprintId]
    )

    useEffect(() => {
        if (selectedBlueprint) {
            setContractName(`${selectedBlueprint.name} Contract`)
            setContractDescription(selectedBlueprint.description || '')
            setFieldsWithValues(
                selectedBlueprint.fields.map((f) => ({ ...f, value: f.value ?? '' }))
            )
        } else {
            setContractName('')
            setContractDescription('')
            setFieldsWithValues([])
        }
    }, [selectedBlueprint])

    const handleFieldChange = (index: number, value: any) => {
        setFieldsWithValues((prev) =>
            prev.map((f, i) => (i === index ? { ...f, value } : f))
        )
    }

    const handleSignatureUpload = (index: number, file: File) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = reader.result as string
            handleFieldChange(index, base64String)
        }
        reader.readAsDataURL(file)
    }

    const handleSave = () => {
        if (!selectedBlueprint) {
            toast.error('Please select a blueprint')
            return
        }

        if (!contractName.trim()) {
            toast.error('Please enter a contract name')
            return
        }

        const contract: Contract = {
            id: crypto.randomUUID(),
            blueprintId: selectedBlueprint.id,
            name: contractName,
            description: contractDescription || undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'created',
            fields: fieldsWithValues,
        }

        db.set(`contract_${contract.id}`, JSON.stringify(contract))
        toast.success('Contract saved successfully!')
        navigate('/contracts')
    }

    return (
        <div className="flex-1 bg-gray-100 min-h-screen p-8 overflow-auto">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/contracts')}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <BiArrowBack className="w-6 h-6" />
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">Create Contract</h1>
                    </div>
                </div>

                {/* Blueprint selection */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Blueprint</label>
                    <select
                        value={selectedBlueprintId}
                        onChange={(e) => setSelectedBlueprintId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Choose a blueprint...</option>
                        {blueprints.map((bp) => (
                            <option key={bp.id} value={bp.id}>
                                {bp.name}
                            </option>
                        ))}
                    </select>
                    {blueprints.length === 0 && (
                        <p className="text-sm text-gray-500 mt-2">
                            No blueprints found. Please create a blueprint first.
                        </p>
                    )}
                </div>

                {/* Contract info */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contract Name *</label>
                            <input
                                type="text"
                                value={contractName}
                                onChange={(e) => setContractName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                                type="text"
                                value={contractDescription}
                                onChange={(e) => setContractDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Fields */}
                {selectedBlueprint && (
                    <div className="flex gap-6">
                        {/* Left side - Form inputs */}
                        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-h-[1200px] overflow-y-auto">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold text-gray-900">Fill Fields</h2>
                                <span className="text-sm text-gray-500">{fieldsWithValues.length} fields</span>
                            </div>
                            <div className="space-y-4">
                                {fieldsWithValues.map((field, index) => (
                                    field.type === 'fixed' ? null : (
                                    <div
                                        key={index}
                                        className={`border rounded-lg p-3 ${FIELD_COLORS[field.type].bg} ${FIELD_COLORS[field.type].border}`}
                                    >
                                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                                            {field.label}
                                        </label>
                                        {field.type === 'text' && (
                                            <input
                                                type="text"
                                                value={field.value ?? ''}
                                                onChange={(e) => handleFieldChange(index, e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder={`Enter ${field.label}`}
                                            />
                                        )}
                                        {field.type === 'date' && (
                                            <input
                                                type="date"
                                                value={field.value ?? ''}
                                                onChange={(e) => handleFieldChange(index, e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        )}
                                        {field.type === 'checkbox' && (
                                            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={Boolean(field.value)}
                                                    onChange={(e) => handleFieldChange(index, e.target.checked)}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                />
                                                <span>Checked</span>
                                            </label>
                                        )}
                                        {field.type === 'signature' && (
                                            <div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0]
                                                        if (file) handleSignatureUpload(index, file)
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                />
                                                {field.value && (
                                                    <div className="mt-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
                                                        <p className="text-xs text-gray-600 mb-1">Preview (1.5cm × 3cm):</p>
                                                        <img
                                                            src={field.value}
                                                            alt="Signature"
                                                            className="border border-gray-300"
                                                            style={{ width: '113px', height: '57px', objectFit: 'contain' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="flex-shrink-0">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Preview (A4 Document)</h2>
                            <div
                                className="relative bg-white border-2 border-gray-400 shadow-2xl overflow-hidden"
                                style={{
                                    width: '794px',
                                    height: '1123px'
                                }}
                            >
                                {fieldsWithValues.map((field, index) => (
                                    <div
                                        key={index}
                                        className="absolute text-sm text-black"
                                        style={{
                                            left: `${field.position.x}px`,
                                            top: `${field.position.y}px`,
                                            maxWidth: `${794 - field.position.x}px`,
                                        }}
                                    >
                                        {field.type === 'fixed' ? (
                                            <div className="font-medium text-gray-900 break-words whitespace-normal inline-block" style={{ maxWidth: '754px' }}>{field.value}</div>
                                        ) : field.type === 'signature' && field.value ? (
                                            <div>
                                                <div className="font-semibold mb-1">{field.label}</div>
                                                <img
                                                    src={field.value}
                                                    alt="Signature"
                                                    style={{ width: '113px', height: '57px', objectFit: 'contain' }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="break-words whitespace-normal">
                                                <span className='font-semibold'>{field.label}</span>: {field.type === 'checkbox'
                                                    ? field.value ? '☑' : '☐'
                                                    : String(field.value || '___________')}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {fieldsWithValues.length === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                                        Select a blueprint to see preview
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={() => navigate('/contracts')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!selectedBlueprint}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Save Contract
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateContract
