import { Client } from '@/lib/types/yjs/awareness';
import { create } from 'zustand';

interface LayoutState {
  clients: Client[];
}

export const useLayoutStore = create<LayoutState>((set, get) => ({
  clients: [],
}));