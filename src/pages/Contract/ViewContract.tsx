import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack, BiCheck, BiX } from 'react-icons/bi';
import type { Contract } from '../../types/contracts.types';
import type { Blueprint } from '../../types/blueprint.types';
import * as contractApi from '../../apis/contract';
import * as blueprintApi from '../../apis/blueprint';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

const ViewContract = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [contract, setContract] = useState<Contract | null>(null);
    const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
    const [revokeModal, setRevokeModal] = useState(false);

    useEffect(() => {
        if (id) {
            loadContract(id);
        }
    }, [id]);

    const loadContract = async (contractId: string) => {
        try {
            const contractData = await contractApi.getById(contractId);
            setContract(contractData);

            // Load the blueprint
            const blueprintData = await blueprintApi.getById(contractData.blueprintId);
            setBlueprint(blueprintData);
        } catch (error) {
            console.error('Failed to load contract:', error);
            toast.error('Failed to load contract');
            navigate('/contracts');
        }
    };

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

    const updateStatus = async (newStatus: Contract['status']) => {
        if (contract && id) {
            try {
                const updatedContract = await contractApi.update(id, { status: newStatus });
                setContract(updatedContract);
                toast.success(`Contract status updated to ${newStatus}`);
            } catch (error) {
                console.error('Failed to update contract status:', error);
                toast.error('Failed to update contract status');
            }
        }
    };

    const getNextStatus = (): Contract['status'] | null => {
        const workflow: Contract['status'][] = ['created', 'approved', 'sent', 'signed', 'locked'];
        const currentIndex = workflow.indexOf(contract.status);
        if (currentIndex >= 0 && currentIndex < workflow.length - 1) {
            return workflow[currentIndex + 1];
        }
        return null;
    };

    const canRevoke = () => {
        return contract.status === 'created' || contract.status === 'sent';
    };

    const getStepStatus = (step: Contract['status']) => {
        const workflow: Contract['status'][] = ['created', 'approved', 'sent', 'signed', 'locked'];
        const currentIndex = workflow.indexOf(contract.status);
        const stepIndex = workflow.indexOf(step);
        
        if (contract.status === 'revoked') {
            return 'revoked';
        }
        
        if (stepIndex <= currentIndex) {
            return 'completed';
        }
        if (stepIndex === currentIndex + 1) {
            return 'current';
        }
        return 'pending';
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

                {/* Status Tracker */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Contract Status</h2>
                    
                    {/* Progress Steps */}
                    <div className="relative mb-8">
                        <div className="flex items-center justify-between">
                            {/* Created */}
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                    getStepStatus('created') === 'completed' || getStepStatus('created') === 'current'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-400'
                                }`}>
                                    {getStepStatus('created') === 'completed' ? (
                                        <BiCheck className="w-6 h-6" />
                                    ) : (
                                        <span className="text-sm font-semibold">1</span>
                                    )}
                                </div>
                                <span className="text-sm font-medium text-gray-700">Created</span>
                            </div>

                            {/* Connector */}
                            <div className={`flex-1 h-1 -mt-10 ${
                                getStepStatus('approved') === 'completed' || getStepStatus('approved') === 'current'
                                    ? 'bg-blue-600'
                                    : 'bg-gray-200'
                            }`}></div>

                            {/* Approved */}
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                    getStepStatus('approved') === 'completed'
                                        ? 'bg-blue-600 text-white'
                                        : getStepStatus('approved') === 'current'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-400'
                                }`}>
                                    {getStepStatus('approved') === 'completed' ? (
                                        <BiCheck className="w-6 h-6" />
                                    ) : (
                                        <span className="text-sm font-semibold">2</span>
                                    )}
                                </div>
                                <span className="text-sm font-medium text-gray-700">Approved</span>
                            </div>

                            {/* Connector */}
                            <div className={`flex-1 h-1 -mt-10 ${
                                getStepStatus('sent') === 'completed' || getStepStatus('sent') === 'current'
                                    ? 'bg-blue-600'
                                    : 'bg-gray-200'
                            }`}></div>

                            {/* Sent */}
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                    getStepStatus('sent') === 'completed'
                                        ? 'bg-blue-600 text-white'
                                        : getStepStatus('sent') === 'current'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-400'
                                }`}>
                                    {getStepStatus('sent') === 'completed' ? (
                                        <BiCheck className="w-6 h-6" />
                                    ) : (
                                        <span className="text-sm font-semibold">3</span>
                                    )}
                                </div>
                                <span className="text-sm font-medium text-gray-700">Sent</span>
                            </div>

                            {/* Connector */}
                            <div className={`flex-1 h-1 -mt-10 ${
                                getStepStatus('signed') === 'completed' || getStepStatus('signed') === 'current'
                                    ? 'bg-blue-600'
                                    : 'bg-gray-200'
                            }`}></div>

                            {/* Signed */}
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                    getStepStatus('signed') === 'completed'
                                        ? 'bg-blue-600 text-white'
                                        : getStepStatus('signed') === 'current'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-400'
                                }`}>
                                    {getStepStatus('signed') === 'completed' ? (
                                        <BiCheck className="w-6 h-6" />
                                    ) : (
                                        <span className="text-sm font-semibold">4</span>
                                    )}
                                </div>
                                <span className="text-sm font-medium text-gray-700">Signed</span>
                            </div>

                            {/* Connector */}
                            <div className={`flex-1 h-1 -mt-10 ${
                                getStepStatus('locked') === 'completed' || getStepStatus('locked') === 'current'
                                    ? 'bg-blue-600'
                                    : 'bg-gray-200'
                            }`}></div>

                            {/* Locked */}
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                    getStepStatus('locked') === 'completed'
                                        ? 'bg-blue-600 text-white'
                                        : getStepStatus('locked') === 'current'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-400'
                                }`}>
                                    {getStepStatus('locked') === 'completed' ? (
                                        <BiCheck className="w-6 h-6" />
                                    ) : (
                                        <span className="text-sm font-semibold">5</span>
                                    )}
                                </div>
                                <span className="text-sm font-medium text-gray-700">Locked</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {contract.status !== 'locked' && contract.status !== 'revoked' && (
                        <div className="flex items-center justify-center gap-4">
                            {getNextStatus() && (
                                <button
                                    onClick={() => updateStatus(getNextStatus()!)}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                                >
                                    Update to {getStatusLabel(getNextStatus()!)}
                                </button>
                            )}
                            {canRevoke() && (
                                <button
                                    onClick={() => setRevokeModal(true)}
                                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors shadow-sm font-medium"
                                >
                                    <BiX className="w-5 h-5" />
                                    Revoke Contract
                                </button>
                            )}
                        </div>
                    )}

                    {contract.status === 'revoked' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800 text-center font-medium">
                                This contract has been revoked and cannot be updated.
                            </p>
                        </div>
                    )}

                    {contract.status === 'locked' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-yellow-800 text-center font-medium">
                                This contract is locked and cannot be modified.
                            </p>
                        </div>
                    )}
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
                                        {field.type === 'fixed' && (
                                            <div className="text-sm font-medium text-gray-900 break-words whitespace-normal inline-block" style={{ maxWidth: '754px' }}>
                                                {field.value}
                                            </div>
                                        )}

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

            <ConfirmModal
                isOpen={revokeModal}
                onClose={() => setRevokeModal(false)}
                onConfirm={() => updateStatus('revoked')}
                title="Revoke Contract"
                message="Are you sure you want to revoke this contract? This action will mark the contract as revoked and it cannot be modified afterward."
                confirmText="Revoke"
                confirmButtonClass="bg-red-600 hover:bg-red-700"
            />
        </div>
    );
};

export default ViewContract;
