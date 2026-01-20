import { BiListUl, BiSearch, BiPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import type { Blueprint } from '../../types/blueprint.types';

const Blueprints = () => {
    const navigate = useNavigate();
    const blueprints: Blueprint[] = [
        {
            id: '597b74df...',
            name: 'Standard NDA',
            description: 'Mutual non-disclosure agreement for vendors.',
            totalFields: 8,
            createdAt: new Date('2026-01-18'),
            updatedAt: new Date('2026-01-18'),
            fields: []
        },
        {
            id: '22fb4016...',
            name: 'SaaS Service Agreement',
            description: 'Standard terms for enterprise clients.',
            totalFields: 12,
            createdAt: new Date('2026-01-15'),
            updatedAt: new Date('2026-01-15'),
            fields: []
        },
        {
            id: '2f834579...',
            name: 'Freelance Contract',
            description: 'Work for hire agreement with IP transfer.',
            totalFields: 6,
            createdAt: new Date('2026-01-13'),
            updatedAt: new Date('2026-01-13'),
            fields: []
        },
    ];

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
                            placeholder="Search templates..."
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
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {blueprints.map((blueprint, index) => (
                                <tr key={blueprint.id} className="hover:bg-gray-50 transition-colors">
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

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Blueprints