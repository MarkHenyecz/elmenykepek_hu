import network from "./network"


const LOGIN = 'user/login'
const REGISTER = 'user/register'

export const userService = {
    tryLogin: (username: string, password: string) => network.post<{token: string}>(LOGIN, {name: username, password: password}),
    tryRegister: (email:string, username: string, password: string) => network.post<string>(REGISTER, {email: email, name: username, password: password}),
}