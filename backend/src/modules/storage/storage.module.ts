import { Module } from "@nestjs/common";
import { MinioStorageService } from "./infrastructure/minio-storage.service";

@Module({
    providers: [
        {
            provide: 'IStorageService',
            useClass: MinioStorageService
        }
    ],
    exports: ['IStorageService']
})
export class StorageModule { }