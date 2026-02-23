import { UUID } from "crypto";
import { FolderResponseDto } from "../../application/dto/folder-response.dto";
import { Folder } from "../entities/folder.entity";

export interface IFolderRepository {
    findById(id: string): Promise<Folder | null>
    findByParentId(parentId: string): Promise<Folder[]>
    findRootFolders(userId: string): Promise<Folder[]>
    save(folder: Folder): Promise<Folder>
    delete(id: string): Promise<void>
}