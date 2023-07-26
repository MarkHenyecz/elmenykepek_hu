import { File as IFile } from "../interfaces/file.interface"
import network from "./network"


const GET_URL = 'file/{id}'
const UPLOAD = 'file/upload'

export const fileService = {
    getFileUrl: (id: number) => network.get<{url: string}>(GET_URL),

    uploadFile: (file: File) => network.post<IFile>(UPLOAD, {file}, {headers: { "Content-Type": "multipart/form-data" }}),
}