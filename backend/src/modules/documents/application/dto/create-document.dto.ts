import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateDocumentDto {
    @IsUUID()
    @IsOptional()
    folderId?: string

}