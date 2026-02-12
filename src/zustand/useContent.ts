import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useContent: any = create(persist((set) => ({
    content: "",
    setContent: (content: string) => set(() => ({ content: content }))
}), {
    name: "content"
}))