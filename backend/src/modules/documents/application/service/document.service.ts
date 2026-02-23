import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IDocumentRepository } from "../../domain/repositories/document.repository.interface";
import { CreateDocumentDto } from "../dto/create-document.dto";
import { Document } from "../../domain/entities/document.entity";
import { FolderService } from "src/modules/folders/application/services/folder.service";
import { UpdateDocumentDto } from "../dto/update-document.dto";

@Injectable()
export class DocumentService {
    constructor(
        @Inject('IDocumentRepository')
        private readonly documentRepository: IDocumentRepository,

        private readonly folderService: FolderService
    ) { }
    async create(dto: CreateDocumentDto, userId: string): Promise<Document> {
        const document = new Document();
        if (dto.folderId) {
            const folder = await this.folderService.findById(dto.folderId);
            document.folder = folder
        }
        document.name = dto.name
        document.mimeType = dto.mimeType
        document.size = dto.size
        document.storageKey = dto.storageKey
        document.uploadedBy = { id: userId } as any
        return this.documentRepository.save(document)
    }

    async findById(id: string): Promise<Document> {
        const document = await this.documentRepository.findById(id);
        if (!document) {
            throw new NotFoundException('Document not found')
        }
        return document
    }

    async findByFolder(folderId: string): Promise<Document[]> {
        const documents = await this.documentRepository.findByFolder(folderId)
        return documents
    }

    async update(id: string, dto: UpdateDocumentDto): Promise<Document> {
        const document = await this.findById(id);
        if (dto.name) {
            document.name = dto.name
        }
        await this.documentRepository.save(document)
        return document
    }

    async delete(id: string): Promise<void> {
        await this.findById(id)
        await this.documentRepository.delete(id)
    }
}