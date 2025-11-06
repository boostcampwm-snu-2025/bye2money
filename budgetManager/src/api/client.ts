import type { Transaction } from '../components/InputBar';

const API_BASE_URL = 'http://localhost:3000/api';

// Transaction API
export const transactionApi = {
  getAll: async (): Promise<Transaction[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`);
      if (!response.ok) throw new Error('Failed to fetch transactions');
      return response.json();
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  create: async (transaction: Transaction): Promise<Transaction> => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
      });
      if (!response.ok) throw new Error('Failed to create transaction');
      return response.json();
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  update: async (id: number, transaction: Transaction): Promise<Transaction> => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
      });
      if (!response.ok) throw new Error('Failed to update transaction');
      return response.json();
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete transaction');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }
};

// Payment API
export const paymentApi = {
  getAll: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments`);
      if (!response.ok) throw new Error('Failed to fetch payments');
      return response.json();
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  },

  create: async (name: string): Promise<{ name: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (!response.ok) throw new Error('Failed to create payment');
      return response.json();
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },

  delete: async (name: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/${name}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete payment');
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
    }
  }
};
