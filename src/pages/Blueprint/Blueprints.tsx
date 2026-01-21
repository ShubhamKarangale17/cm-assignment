import { BiListUl, BiSearch, BiPlus, BiTrash } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import type { Blueprint } from '../../types/blueprint.types';
import { useEffect, useState } from 'react';
import * as blueprintApi from '../../apis/blueprint';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

const Blueprints = () => {
    const navigate = useNavigate();
    const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; blueprintId: string | null }>({ isOpen: false, blueprintId: null });

    useEffect(() => {
        loadBlueprints();
    }, []);

    const loadBlueprints = async () => {
        try {
            const data = await blueprintApi.getAll();
            setBlueprints(data);
        } catch (error) {
            console.error('Failed to load blueprints:', error);
            toast.error('Failed to load blueprints');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await blueprintApi.deleteBlueprint(id);
            loadBlueprints();
            toast.success('Blueprint deleted successfully');
        } catch (error) {
            console.error('Failed to delete blueprint:', error);
            toast.error('Failed to delete blueprint');
        }
    };

    const handleView = (blueprint: Blueprint) => {
        // Store for viewing/editing
        navigate(`/blueprints/view/${blueprint.id}`);
    };

    const filteredBlueprints = blueprints.filter(bp =>
        bp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bp.description?.toLowerCase().includes(searchQuery.toLowerCase())
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


    return (
        <div className="flex-1 bg-gray-50 h-screen overflow-y-auto">
            <div className="max-w-7xl mx-auto p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Blueprints</h1>
                    <button 
                        onClick={() => navigate('/blueprints/create')}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium flex items-center gap-2"
                    >
                        <BiPlus className="w-5 h-5" />
                        New Blueprint
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search blueprints..."
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
                            {filteredBlueprints.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="text-gray-400">
                                            <BiListUl className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">
                                                {searchQuery ? 'No blueprints found' : 'No blueprints yet. Create your first blueprint!'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredBlueprints.map((blueprint) => (
                                    <tr 
                                        key={blueprint.id} 
                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => handleView(blueprint)}
                                    >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">

                                            <div>
                                                <div className="font-medium text-gray-900">{blueprint.name}</div>
                                                <div className="text-sm text-gray-600 max-w-xs">{blueprint.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <BiListUl className="w-4 h-4" />
                                            <span>{blueprint.totalFields}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{formatDate(blueprint.updatedAt)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeleteModal({ isOpen: true, blueprintId: blueprint.id });
                                            }}
                                            className="text-red-600 hover:text-red-800 transition-colors p-2"
                                            title="Delete blueprint"
                                        >
                                            <BiTrash className="w-5 h-5" />
                                        </button>
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
                onClose={() => setDeleteModal({ isOpen: false, blueprintId: null })}
                onConfirm={() => {
                    if (deleteModal.blueprintId) {
                        handleDelete(deleteModal.blueprintId);
                    }
                }}
                title="Delete Blueprint"
                message="Are you sure you want to delete this blueprint? This action cannot be undone."
                confirmText="Delete"
                confirmButtonClass="bg-red-600 hover:bg-red-700"
            />
        </div>
    );
}

export default Blueprints