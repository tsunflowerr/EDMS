import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IFolderRepository } from "../../domain/repositories/folder.repository.interface";
import { CreateFolderDto } from "../dto/create-folder.dto";
import { Folder } from "../../domain/entities/folder.entity";
import { UpdateFolderDto } from "../dto/update-folder.dto";

@Injectable()
export class FolderService {
    constructor(
        @Inject('IFolderRepository')
        private readonly folderRepository: IFolderRepository
    ) { }

    async create(dto: CreateFolderDto, userId: string): Promise<Folder> {
        const folder = new Folder();
        folder.name = dto.name;
        if (dto.parentId) {
            const parentFolder = await this.folderRepository.findById(dto.parentId)
            if (!parentFolder) {
                throw new NotFoundException('Parent folder not found');
            }
            folder.parent = parentFolder;
        }
        folder.createdBy = { id: userId } as any
        return this.folderRepository.save(folder)
    }

    async findById(id: string): Promise<Folder> {
        const folder = await this.folderRepository.findById(id)
        if (!folder) {
            throw new NotFoundException('Folder not found')
        }
        return folder
    }

    async findRootFolders(userId: string): Promise<Folder[]> {
        const folders = await this.folderRepository.findRootFolders(userId);
        return folders
    }

    async findChildren(folderId: string): Promise<Folder[]> {
        const childrenfolders = await this.folderRepository.findByParentId(folderId)
        return childrenfolders;
    }

    async update(id: string, dto: UpdateFolderDto): Promise<Folder> {
        const folder = await this.findById(id);
        if (!dto.name) {
            return folder
        }
        folder.name = dto.name
        await this.folderRepository.save(folder);
        return folder;
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.folderRepository.delete(id);
    }

}