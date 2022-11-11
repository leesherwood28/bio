import create from 'zustand';

interface IntitialisationStore {
  loadingDone: boolean;
  confirmLoadingDone?: () => void;
}

export const useInitialisationStore = create<IntitialisationStore>(
  (set, get) => {
    return {
      loadingDone: false,
      confirmLoadingDone() {
        set({ loadingDone: true });
      },
    };
  }
);
