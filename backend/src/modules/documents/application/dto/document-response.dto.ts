import { Folder } from "src/modules/folders/domain/entities/folder.entity"
import { User } from "src/modules/users/domain/entities/user.entity"

export class DocumentResponseDto {
    id: string

    name: string

    mimeType: string

    size: number

    storageKey: string

    folder?: {
        id: string
        name: string
    }

    uploadedBy: User

    createdAt: Date

    updatedAt: Date
}