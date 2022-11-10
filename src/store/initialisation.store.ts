import create from 'zustand';

interface IntitialisationStore {
  initialAnimationDone: boolean;
  confirmInitialAnimationDone?: () => void;
}

export const useInitialisationStore = create<IntitialisationStore>(
  (set, get) => {
    return {
      initialAnimationDone: false,
      confirmInitialAnimationDone() {
        set({ initialAnimationDone: true });
      },
    };
  }
);
