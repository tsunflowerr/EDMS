import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateDocumentDto {
    @IsString()
    name: string

    @IsString()
    mimeType: string

    @IsNumber()
    size: number

    @IsString()
    storageKey: string

    @IsUUID()
    @IsOptional()
    folderId?: string

}