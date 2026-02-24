import { Body, Controller, Post, UseGuards, Get, Param, Patch, Delete, Request, UseInterceptors, UploadedFile } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/infrastructure/guards/jwt-auth.guard";
import { DocumentService } from "../../application/service/document.service";
import { CreateDocumentDto } from "../../application/dto/create-document.dto";
import { UpdateDocumentDto } from "../../application/dto/update-document.dto";
import { FileInterceptor } from "@nestjs/platform-express";
@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentController {
    constructor(
        private readonly documentService: DocumentService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateDocumentDto, @Request() req: any) {
        return this.documentService.create(dto, file, req.user.userId)
    }

    @Get('/:id')
    findDocumentDetail(@Param('id') documentId: string) {
        return this.documentService.findById(documentId)
    }

    @Get('/folder/:folderId')
    findDocumentsByFolder(@Param('folderId') folderId: string) {
        return this.documentService.findByFolder(folderId)
    }

    @Patch('/:id')
    updateDocument(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
        return this.documentService.update(id, dto);
    }

    @Delete('/:id')
    deleteDocument(@Param('id') documentId: string) {
        return this.documentService.delete(documentId)
    }

}