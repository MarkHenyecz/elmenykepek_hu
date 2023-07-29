import { User } from "../interfaces/user.interface"
import network from "./network"


const GET_MY_PROFILE = 'user'
const GET_PROFILE = 'user/{slug}'

const LOGIN = 'user/login'
const REGISTER = 'user/register'

export const userService = {
    tryLogin: (username: string, password: string) => network.post<{token: string}>(LOGIN, {name: username, password: password}),
    tryRegister: (email:string, username: string, password: string) => network.post<string>(REGISTER, {email: email, name: username, password: password}),

    getMyProfile: () => network.get<User>(GET_MY_PROFILE),
    getProfile: (slug: string) => network.get<User>(GET_PROFILE.replace('{slug}', slug)),
}