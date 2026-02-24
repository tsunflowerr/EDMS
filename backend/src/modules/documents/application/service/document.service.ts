import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IDocumentRepository } from "../../domain/repositories/document.repository.interface";
import { CreateDocumentDto } from "../dto/create-document.dto";
import { Document } from "../../domain/entities/document.entity";
import { FolderService } from "src/modules/folders/application/services/folder.service";
import { UpdateDocumentDto } from "../dto/update-document.dto";
import type { IStorageService } from "src/modules/storage/domain/storage.service.interface";


@Injectable()
export class DocumentService {
    constructor(
        @Inject('IDocumentRepository')
        private readonly documentRepository: IDocumentRepository,

        @Inject('IStorageService')
        private readonly storageService: IStorageService,

        private readonly folderService: FolderService
    ) { }
    async create(dto: CreateDocumentDto, file: Express.Multer.File, userId: string): Promise<Document> {
        const key = `documents/${Date.now()}-${file.originalname}`
        await this.storageService.upload(key, file.buffer, file.mimetype)

        const document = new Document();
        if (dto.folderId) {
            const folder = await this.folderService.findById(dto.folderId);
            document.folder = folder
        }
        document.name = file.originalname
        document.mimeType = file.mimetype
        document.size = file.size
        document.storageKey = key
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