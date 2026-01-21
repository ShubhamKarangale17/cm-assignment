import { API_BASE_URL } from '../constants/api';
import type { Blueprint } from '../types/blueprint.types';

export const blueprintApi = {
  // Get all blueprints
  getAll: async (): Promise<Blueprint[]> => {
    const response = await fetch(`${API_BASE_URL}/blueprints`);
    if (!response.ok) {
      throw new Error('Failed to fetch blueprints');
    }
    const data = await response.json();
    // Convert date strings to Date objects
    return data.map((bp: any) => ({
      ...bp,
      id: bp._id,
      createdAt: new Date(bp.createdAt),
      updatedAt: new Date(bp.updatedAt),
    }));
  },

  // Get blueprint by ID
  getById: async (id: string): Promise<Blueprint> => {
    const response = await fetch(`${API_BASE_URL}/blueprints/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blueprint');
    }
    const data = await response.json();
    return {
      ...data,
      id: data._id,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  },

  // Create a new blueprint
  create: async (blueprint: Omit<Blueprint, 'id' | 'createdAt' | 'updatedAt'>): Promise<Blueprint> => {
    const response = await fetch(`${API_BASE_URL}/blueprints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blueprint),
    });
    if (!response.ok) {
      throw new Error('Failed to create blueprint');
    }
    const data = await response.json();
    return {
      ...data,
      id: data._id,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  },

  // Update a blueprint
  update: async (id: string, blueprint: Partial<Blueprint>): Promise<Blueprint> => {
    const response = await fetch(`${API_BASE_URL}/blueprints/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blueprint),
    });
    if (!response.ok) {
      throw new Error('Failed to update blueprint');
    }
    const data = await response.json();
    return {
      ...data,
      id: data._id,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  },

  // Delete a blueprint
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/blueprints/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete blueprint');
    }
  },
};
