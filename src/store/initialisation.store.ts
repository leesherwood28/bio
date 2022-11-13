import create from 'zustand';

interface IntitialisationStore {
  loadingDone: boolean;
  showWelcome: boolean;
  confirmLoadingDone: () => void;
  stopShowingWelcome: () => void;
}

export const useInitialisationStore = create<IntitialisationStore>(
  (set, get) => {
    return {
      loadingDone: false,
      showWelcome: true,
      confirmLoadingDone() {
        set({ loadingDone: true });
      },
      stopShowingWelcome() {
        set({ showWelcome: false });
      },
    };
  }
);
