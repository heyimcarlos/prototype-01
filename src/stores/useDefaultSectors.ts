import create from "zustand";

export type DefaultSectors = {
  sectors: string[];
};

export const useDefaultSectors = create<DefaultSectors>(() => ({
  sectors: ["Bella Vista", "Evaristo Morales", "La Julia", "El Manguito"],
}));
