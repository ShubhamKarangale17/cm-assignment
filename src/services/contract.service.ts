import { API_BASE_URL } from '../constants/api';
import type { Contract } from '../types/contracts.types';

export const contractApi = {
  // Get all contracts
  getAll: async (): Promise<Contract[]> => {
    const response = await fetch(`${API_BASE_URL}/contracts`);
    if (!response.ok) {
      throw new Error('Failed to fetch contracts');
    }
    const data = await response.json();
    // Convert date strings to Date objects
    return data.map((contract: any) => ({
      ...contract,
      id: contract._id,
      createdAt: new Date(contract.createdAt),
      updatedAt: new Date(contract.updatedAt),
    }));
  },

  // Get contract by ID
  getById: async (id: string): Promise<Contract> => {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch contract');
    }
    const data = await response.json();
    return {
      ...data,
      id: data._id,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  },

  // Create a new contract
  create: async (contract: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contract> => {
    const response = await fetch(`${API_BASE_URL}/contracts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contract),
    });
    if (!response.ok) {
      throw new Error('Failed to create contract');
    }
    const data = await response.json();
    return {
      ...data,
      id: data._id,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  },

  // Update a contract
  update: async (id: string, contract: Partial<Contract>): Promise<Contract> => {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contract),
    });
    if (!response.ok) {
      throw new Error('Failed to update contract');
    }
    const data = await response.json();
    return {
      ...data,
      id: data._id,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  },

  // Delete a contract
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete contract');
    }
  },
};
