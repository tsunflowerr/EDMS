import { Inject, Injectable } from "@nestjs/common";
import type { IDocumentRepository } from "../../domain/repositories/document.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Document } from "../../domain/entities/document.entity";
import { Repository } from "typeorm";
@Injectable()
export class DocumentRepository implements IDocumentRepository {
    constructor(
        @InjectRepository(Document)
        private readonly repo: Repository<Document>
    ) { }

    async findById(id: string): Promise<Document | null> {
        return this.repo.findOne({ where: { id }, relations: ['folder', 'uploadedBy'] })
    }

    async findByFolder(folderId: string): Promise<Document[]> {
        return this.repo.find({
            where: { folder: { id: folderId } },
            relations: ['folder', 'uploadedBy']
        })
    }

    async findByUserId(userId: string): Promise<Document[]> {
        return this.repo.find({ where: { uploadedBy: { id: userId } } })
    }

    async save(document: Document): Promise<Document> {
        return this.repo.save(document)
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id)
    }


}