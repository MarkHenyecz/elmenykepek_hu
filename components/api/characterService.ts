import { Character } from "../interfaces/character.interface"
import network from "./network"


const GET_MY_CHARACTERS = 'character'
const GET_CHARACTER = 'character/{id}'
const CREATE_CHARACTER = 'character'

export const characterService = {
    getMyCharacters: () => network.get<Character[]>(GET_MY_CHARACTERS),
    getCharacter: (id: number) => network.get<Character>(GET_CHARACTER.replace('{id}', id.toString())),

    createCharacter: (name: string, picture_id?: number) => network.post(CREATE_CHARACTER, {name, picture_id})
}