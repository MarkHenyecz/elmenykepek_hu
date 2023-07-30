import { LikeRequest } from "../interfaces/like.interface"
import network from "./network"


const GET_LIKES = 'like/{id}?liked_type={type}'
const POST_LIKE = 'like/{id}?liked_type={type}'

export const likeService = {
    getLikes: (id: number, type: string) => network.get<LikeRequest>(GET_LIKES.replace('{id}', id.toString()).replace('{type}', type)),
    postLike: (id: number, type: string) => network.post(POST_LIKE.replace('{id}', id.toString()).replace('{type}', type)),
}