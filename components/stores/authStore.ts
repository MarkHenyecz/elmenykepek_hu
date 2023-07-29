import { create } from 'zustand'
import { userService } from '../api/userService'



interface AuthStore {
    token: string
    isLoggedIn: boolean
    setState: (isLoggedIn: boolean, token: string) => void
    validate: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: '',
    isLoggedIn: false,

    setState: (isLoggedIn: boolean, token: string) => set(() => ({ isLoggedIn: isLoggedIn, token: token })),

    validate: async () => {
        const cacheToken = localStorage.getItem('token')

        if(cacheToken && cacheToken != '') {
            try {
                const userData = userService.getMyProfile();

                if((await userData).data.id) {
                    set({ isLoggedIn: true, token: cacheToken })
                }
            } catch {
                localStorage.setItem('token', '')
            }
        }
    }
}))