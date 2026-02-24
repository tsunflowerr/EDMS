import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentController } from "./infrastructure/controllers/document.controller";
import { DocumentService } from "./application/service/document.service";
import { DocumentRepository } from "./infrastructure/repositories/document.repository";
import { FolderModule } from "../folders/folders.module";
import { Document } from "./domain/entities/document.entity";
import { StorageModule } from "../storage/storage.module";
@Module({
    imports: [
        TypeOrmModule.forFeature([Document]),
        FolderModule,
        StorageModule
    ],
    controllers: [DocumentController],
    providers: [DocumentService, {
        provide: 'IDocumentRepository',
        useClass: DocumentRepository
    }]
})

export class DocumentModule { }