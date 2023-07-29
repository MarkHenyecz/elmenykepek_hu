import { create } from 'zustand'
import { userService } from '../api/userService'



interface AuthStore {
    userId: number
    token: string
    isLoggedIn: boolean
    setState: (userId: number, isLoggedIn: boolean, token: string) => void
    validate: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    userId: 0,
    token: '',
    isLoggedIn: false,

    setState: (userId: number, isLoggedIn: boolean, token: string) => set(() => ({ userId: userId, isLoggedIn: isLoggedIn, token: token })),

    validate: async () => {
        const cacheToken = localStorage.getItem('token')

        if(cacheToken && cacheToken != '') {
            try {
                const userData = userService.getMyProfile();

                const userId =(await userData).data.id;
                if(userId) {
                    set({ userId: userId, isLoggedIn: true, token: cacheToken })
                }
            } catch {
                localStorage.setItem('token', '')
            }
        }
    }
}))