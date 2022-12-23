import create from "zustand";

export type DefaultSectors = {
  sectors: string[];
};

export const useDefaultSectors = create<DefaultSectors>((set) => ({
  sectors: ["Bella Vista", "Evaristo Morales", "La Julia", "El Manguito"],
}));
