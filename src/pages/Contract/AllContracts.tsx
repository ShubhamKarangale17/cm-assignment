import { BiListUl, BiSearch, BiPlus, BiTrash, BiShow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import type { Contract } from '../../types/contracts.types';
import { useEffect, useState } from 'react';
import * as db from '../../storage/db';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

const AllContracts = () => {
    const navigate = useNavigate();
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; contractId: string | null }>({ isOpen: false, contractId: null });

    useEffect(() => {
        loadContracts();
    }, []);

    const loadContracts = () => {
        const allContracts: Contract[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('contract_')) {
                const value = localStorage.getItem(key);
                if (value) {
                    try {
                        const contract = JSON.parse(value);
                        // Convert date strings back to Date objects
                        contract.createdAt = new Date(contract.createdAt);
                        contract.updatedAt = new Date(contract.updatedAt);
                        allContracts.push(contract);
                    } catch (e) {
                        console.error(`Failed to parse contract with key ${key}:`, e);
                    }
                }
            }
        }
        // Sort by most recently updated
        allContracts.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
        setContracts(allContracts);
    };

    const handleDelete = (id: string) => {
        db.remove(`contract_${id}`);
        loadContracts();
        toast.success('Contract deleted successfully');
    };

    const handleView = (contract: Contract) => {
        navigate(`/contracts/view/${contract.id}`);
    };

    const filteredContracts = contracts.filter(contract =>
        contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
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
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">All Contracts</h1>
                    <button 
                        onClick={() => navigate('/contracts/create')}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium flex items-center gap-2"
                    >
                        <BiPlus className="w-5 h-5" />
                        New Contract
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search contracts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    NAME
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    STATUS
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    FIELDS
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    LAST UPDATED
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredContracts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="text-gray-400">
                                            <BiListUl className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">
                                                {searchQuery ? 'No contracts found' : 'No contracts yet. Create your first contract!'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredContracts.map((contract) => (
                                    <tr 
                                        key={contract.id} 
                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => handleView(contract)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-medium text-gray-900">{contract.name}</div>
                                                    <div className="text-sm text-gray-600 max-w-xs truncate">{contract.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                                                {getStatusLabel(contract.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <BiListUl className="w-4 h-4" />
                                                <span>{contract.fields.length}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{formatDate(contract.updatedAt)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleView(contract);
                                                    }}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                                                    title="View contract"
                                                >
                                                    <BiShow className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setDeleteModal({ isOpen: true, contractId: contract.id });
                                                    }}
                                                    className="text-red-600 hover:text-red-800 transition-colors p-2"
                                                    title="Delete contract"
                                                >
                                                    <BiTrash className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, contractId: null })}
                onConfirm={() => {
                    if (deleteModal.contractId) {
                        handleDelete(deleteModal.contractId);
                    }
                }}
                title="Delete Contract"
                message="Are you sure you want to delete this contract? This action cannot be undone."
                confirmText="Delete"
                confirmButtonClass="bg-red-600 hover:bg-red-700"
            />
        </div>
    );
}

export default AllContracts