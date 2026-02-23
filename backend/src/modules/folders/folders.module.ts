import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Folder } from "./domain/entities/folder.entity";
import { FolderController } from "./infrastructure/controllers/folder.controller";
import { FolderService } from "./application/services/folder.service";
import { FolderRepository } from "./infrastructure/repositories/folder.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Folder])
    ],
    controllers: [FolderController],
    providers: [FolderService, {
        provide: 'IFolderRepository',
        useClass: FolderRepository
    }],
    exports: [FolderService]
})

export class FolderModule { }