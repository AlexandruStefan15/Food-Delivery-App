import React, { useContext, createContext, useState } from "react";

interface SidebarProviderProps {
	children: React.ReactNode;
}

interface SidebarContextType {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>;
};

export const useSidebarContext = () => {
	const ctx = useContext(SidebarContext);
	if (!ctx) throw new Error("useSidebarContext must be used inside SidebarProvider");
	return ctx;
};
