import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import type { Contract } from '../../types/contracts.types';
import type { Blueprint } from '../../types/blueprint.types';
import * as db from '../../storage/db';

const ViewContract = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [contract, setContract] = useState<Contract | null>(null);
    const [blueprint, setBlueprint] = useState<Blueprint | null>(null);

    useEffect(() => {
        if (id) {
            const contractData = db.get(`contract_${id}`);
            if (contractData) {
                try {
                    const parsedContract = JSON.parse(contractData);
                    // Convert date strings back to Date objects
                    parsedContract.createdAt = new Date(parsedContract.createdAt);
                    parsedContract.updatedAt = new Date(parsedContract.updatedAt);
                    setContract(parsedContract);

                    // Load the blueprint
                    const blueprintData = db.get(`blueprint_${parsedContract.blueprintId}`);
                    if (blueprintData) {
                        setBlueprint(JSON.parse(blueprintData));
                    }
                } catch (e) {
                    console.error('Failed to load contract:', e);
                    alert('Failed to load contract');
                    navigate('/contracts');
                }
            } else {
                alert('Contract not found');
                navigate('/contracts');
            }
        }
    }, [id, navigate]);

    if (!contract || !blueprint) {
        return (
            <div className="flex-1 bg-gray-50 h-screen flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const getStatusColor = (status: Contract['status']) => {
        const colors = {
            created: 'bg-gray-100 text-gray-800',
            approved: 'bg-blue-100 text-blue-800',
            sent: 'bg-purple-100 text-purple-800',
            signed: 'bg-green-100 text-green-800',
            locked: 'bg-yellow-100 text-yellow-800',
            revoked: 'bg-red-100 text-red-800',
        };
        return colors[status];
    };

    const getStatusLabel = (status: Contract['status']) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
        <div className="flex-1 bg-gray-50 h-screen overflow-y-auto">
            <div className="max-w-7xl mx-auto p-8">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/contracts')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <BiArrowBack className="w-5 h-5" />
                        Back to Contracts
                    </button>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{contract.name}</h1>
                            {contract.description && (
                                <p className="text-gray-600">{contract.description}</p>
                            )}
                        </div>
                        <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(contract.status)}`}>
                            {getStatusLabel(contract.status)}
                        </span>
                    </div>
                </div>

                {/* Metadata */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract Details</h2>
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Blueprint</p>
                            <p className="text-gray-900 font-medium">{blueprint.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Created</p>
                            <p className="text-gray-900">{formatDate(contract.createdAt)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                            <p className="text-gray-900">{formatDate(contract.updatedAt)}</p>
                        </div>
                    </div>
                </div>

                {/* A4 Document Preview */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Document Preview</h2>
                    <div className="flex justify-center">
                        <div
                            className="bg-white shadow-lg border border-gray-300"
                            style={{
                                width: '794px',
                                height: '1123px',
                                position: 'relative',
                            }}
                        >
                            {contract.fields.map((field, index) => {
                                const value = field.value;
                                const hasValue = value !== undefined && value !== null && value !== '';

                                return (
                                    <div
                                        key={index}
                                        style={{
                                            position: 'absolute',
                                            left: `${field.position.x}px`,
                                            top: `${field.position.y}px`,
                                            width: `${field.position.w}px`,
                                        }}
                                    >
                                        {field.type === 'text' && (
                                            <div className="text-sm">
                                                <span className="font-medium text-gray-700">{field.label}:</span>{' '}
                                                <span className="text-gray-900">{hasValue ? value : '___________'}</span>
                                            </div>
                                        )}

                                        {field.type === 'date' && (
                                            <div className="text-sm">
                                                <span className="font-medium text-gray-700">{field.label}:</span>{' '}
                                                <span className="text-gray-900">
                                                    {hasValue ? new Date(value).toLocaleDateString() : '___________'}
                                                </span>
                                            </div>
                                        )}

                                        {field.type === 'checkbox' && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <div
                                                    className="w-4 h-4 border-2 border-gray-400 rounded flex items-center justify-center"
                                                    style={{ minWidth: '16px' }}
                                                >
                                                    {value && <div className="w-2 h-2 bg-gray-900 rounded-sm"></div>}
                                                </div>
                                                <span className="text-gray-900">{field.label}</span>
                                            </div>
                                        )}

                                        {field.type === 'signature' && (
                                            <div className="text-sm">
                                                <div className="font-medium text-gray-700 mb-1">{field.label}:</div>
                                                {hasValue ? (
                                                    <img
                                                        src={value}
                                                        alt="Signature"
                                                        className="border border-gray-300"
                                                        style={{ width: '113px', height: '57px', objectFit: 'contain' }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="border-2 border-dashed border-gray-300 flex items-center justify-center"
                                                        style={{ width: '113px', height: '57px' }}
                                                    >
                                                        <span className="text-xs text-gray-400">No signature</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewContract;
