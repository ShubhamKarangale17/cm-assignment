import { BiListUl, BiSearch, BiPlus, BiTrash, BiShow, BiRefresh } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import type { Contract } from '../../types/contracts.types';
import type { Blueprint } from '../../types/blueprint.types';
import { useEffect, useState } from 'react';
import { contractApi } from '../../services/contract.service';
import { blueprintApi } from '../../services/blueprint.service';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

const AllContracts = () => {
    const navigate = useNavigate();
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; contractId: string | null }>({ isOpen: false, contractId: null });

    useEffect(() => {
        loadContracts();
        loadBlueprints();
    }, []);

    const loadContracts = async () => {
        try {
            const data = await contractApi.getAll();
            setContracts(data);
        } catch (error) {
            console.error('Failed to load contracts:', error);
            toast.error('Failed to load contracts');
        }
    };

    const loadBlueprints = async () => {
        try {
            const data = await blueprintApi.getAll();
            setBlueprints(data);
        } catch (error) {
            console.error('Failed to load blueprints:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await contractApi.delete(id);
            loadContracts();
            toast.success('Contract deleted successfully');
        } catch (error) {
            console.error('Failed to delete contract:', error);
            toast.error('Failed to delete contract');
        }
    };

    const handleView = (contract: Contract) => {
        navigate(`/contracts/view/${contract.id}`);
    };

    const getBlueprintName = (blueprintId: string) => {
        const blueprint = blueprints.find(bp => bp.id === blueprintId);
        return blueprint ? blueprint.name : 'Unknown';
    };

    const getSimplifiedStatus = (status: Contract['status']): 'Active' | 'Pending' | 'Signed' | 'Revoked' => {
        if (status === 'created' || status === 'approved') return 'Active';
        if (status === 'sent') return 'Pending';
        if (status === 'signed' || status === 'locked') return 'Signed';
        return 'Revoked';
    };

    const getSimplifiedStatusColor = (simplifiedStatus: string) => {
        const colors = {
            'Active': 'bg-blue-100 text-blue-800',
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Signed': 'bg-green-100 text-green-800',
            'Revoked': 'bg-red-100 text-red-800',
        };
        return colors[simplifiedStatus as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
        });
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
                                    CONTRACT NAME
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    BLUEPRINT NAME
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    STATUS
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    CREATED DATE
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
                                filteredContracts.map((contract) => {
                                    const simplifiedStatus = getSimplifiedStatus(contract.status);
                                    return (
                                    <tr 
                                        key={contract.id} 
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{contract.name}</div>
                                            {contract.description && (
                                                <div className="text-sm text-gray-600 max-w-xs truncate">{contract.description}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-700">{getBlueprintName(contract.blueprintId)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSimplifiedStatusColor(simplifiedStatus)}`}>
                                                {simplifiedStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{formatDate(contract.createdAt)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleView(contract)}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                                                    title="View contract"
                                                >
                                                    <BiShow className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleView(contract)}
                                                    className="text-green-600 hover:text-green-800 transition-colors p-2"
                                                    title="Change status"
                                                >
                                                    <BiRefresh className="w-5 h-5" />
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
                                    );
                                })
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