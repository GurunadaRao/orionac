"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavbarVisibilityContextType {
  isNavbarVisible: boolean;
  setIsNavbarVisible: (visible: boolean) => void;
}

const NavbarVisibilityContext = createContext<NavbarVisibilityContextType | undefined>(undefined);

export function NavbarVisibilityProvider({ children }: { children: ReactNode }) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  return (
    <NavbarVisibilityContext.Provider value={{ isNavbarVisible, setIsNavbarVisible }}>
      {children}
    </NavbarVisibilityContext.Provider>
  );
}

export function useNavbarVisibility() {
  const context = useContext(NavbarVisibilityContext);
  if (context === undefined) {
    throw new Error("useNavbarVisibility must be used within a NavbarVisibilityProvider");
  }
  return context;
}
