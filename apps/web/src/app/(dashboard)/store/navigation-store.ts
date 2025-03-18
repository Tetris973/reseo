import { create } from 'zustand';
import { TokenGroupType } from '@web/app/(dashboard)/services';

export type TabType = 'stop-words' | 'custom-filters' | 'tokens';

interface NavigationState {
  activeGroup: TokenGroupType;
  activeTab: TabType;
  actions: {
    setActiveGroup: (group: TokenGroupType) => void;
    setActiveTab: (tab: TabType) => void;
    navigateTo: (tab: TabType, group: TokenGroupType) => void;
  };
}

// Map routes to their default tabs
const defaultTabsByRoute: Record<string, TabType> = {
  filters: 'stop-words',
  tokens: 'tokens',
  'text-input': 'tokens',
};

const createNavigationStore = (initialTab: TabType = 'tokens') =>
  create<NavigationState>((set) => ({
    activeGroup: 'single',
    activeTab: initialTab,
    actions: {
      setActiveGroup: (group) => set({ activeGroup: group }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      navigateTo: (tab, group) => {
        set({ activeTab: tab, activeGroup: group });
      },
    },
  }));

// Create store instance with URL params
export function initializeNavigationStore(tab?: string, route?: string) {
  const validTab = (tab?: string): tab is TabType => {
    return tab === 'stop-words' || tab === 'custom-filters' || tab === 'tokens';
  };

  // If no tab is provided, use the default tab for the current route
  if (!tab && route && route in defaultTabsByRoute) {
    return createNavigationStore(defaultTabsByRoute[route]);
  }

  const initialTab = validTab(tab) ? tab : 'tokens';
  return createNavigationStore(initialTab);
}

// Export a default instance for cases where URL params aren't available
export const useNavigationStore = createNavigationStore();

// Selector hooks for convenience
export const useActiveGroup = () => useNavigationStore((state) => state.activeGroup);
export const useActiveTab = () => useNavigationStore((state) => state.activeTab);
export const useNavigationActions = () => useNavigationStore((state) => state.actions);
