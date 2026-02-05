import { IsDate, IsObject, IsString, IsUUID } from "class-validator";

export class FolderResponseDto {
    id: string
    name: string
    parentId: string
    createdBy: {
        id: string
        email: string
        fullname?: string
    }
    createdAt: Date
    children?: FolderResponseDto[]
}