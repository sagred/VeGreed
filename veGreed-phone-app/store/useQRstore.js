import { create } from 'zustand'

export const useQRStore = create((set) => ({
    qrData: null,
    setQRData: (data) => set({ qrData: data }),
}))

export const useProductStore = create((set) => ({
    product: null,
    setProduct: (data) => set({ product: data }),
}))