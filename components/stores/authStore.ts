import { create } from 'zustand'



interface AuthStore {
    token: string
    isLoggedIn: boolean
    setState: (isLoggedIn: boolean, token: string) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: '',
    isLoggedIn: false,
    setState: (isLoggedIn: boolean, token: string) => set(() => ({ isLoggedIn: isLoggedIn, token: token })),
}))