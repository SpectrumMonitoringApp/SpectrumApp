import { create } from 'zustand';

const useWorkspaceStore = create((set) => ({
  workspace: null,
  isLoading: false,
  actions: {
    setWorkspace: (workspace) => set(() => ({ workspace })),
    setIsLoading: (isLoading) => set(() => ({ isLoading }))
  }
}));

export const useWorkspace = () => useWorkspaceStore((state) => state.workspace);
export const useWorkspaceIsLoading = () => useWorkspaceStore((state) => state.isLoading);
export const useWorkspaceActions = () =>
  useWorkspaceStore((state) => state.actions);
