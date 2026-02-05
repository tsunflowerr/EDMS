import { Injectable } from "@nestjs/common";
import { IFolderRepository } from "../../domain/repositories/folder.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Folder } from "../../domain/entities/folder.entity";
import { IsNull, Repository } from "typeorm";

@Injectable()
export class FolderRepository implements IFolderRepository {
    constructor(
        @InjectRepository(Folder)
        private readonly repo: Repository<Folder>
    ) { }

    async findById(id: string): Promise<Folder | null> {
        return this.repo.findOne({ where: { id } })
    }

    async findByParentId(parentId: string | null): Promise<Folder[]> {
        const whereCondition = parentId === null
            ? { parent: IsNull() }
            : { parent: { id: parentId } };
        return this.repo.find({ where: whereCondition, relations: ['children', 'createdBy'] })
    }

    async findRootFolders(userId: string): Promise<Folder[]> {
        const whereCondition = { parent: IsNull(), createdBy: { id: userId } }
        return this.repo.find({ where: whereCondition, relations: ['children', 'createdBy'] })
    }

    async save(folder: Folder): Promise<Folder> {
        return this.repo.save(folder)
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id)
    }
}