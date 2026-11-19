import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProfileTab = "resumen" | "propuestas" | "antecedentes";

type UiState = {
  menuOpen: boolean;
  notificationsOpen: boolean;
  profileTab: ProfileTab;
  lastTheme: string | null;
  setMenuOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  setProfileTab: (tab: ProfileTab) => void;
  setLastTheme: (slug: string) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      menuOpen: false,
      notificationsOpen: false,
      profileTab: "resumen",
      lastTheme: null,
      setMenuOpen: (menuOpen) =>
        set((state) => ({
          menuOpen,
          notificationsOpen: menuOpen ? false : state.notificationsOpen,
        })),
      setNotificationsOpen: (notificationsOpen) =>
        set((state) => ({
          notificationsOpen,
          menuOpen: notificationsOpen ? false : state.menuOpen,
        })),
      setProfileTab: (profileTab) => set({ profileTab }),
      setLastTheme: (lastTheme) => set({ lastTheme }),
    }),
    {
      name: "sibic-ui",
      partialize: (state) => ({
        profileTab: state.profileTab,
        lastTheme: state.lastTheme,
      }),
    },
  ),
);
