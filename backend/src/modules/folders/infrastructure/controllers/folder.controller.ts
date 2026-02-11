import { Body, Controller, Post, Get, Request, UseGuards, Param, Patch, Delete } from "@nestjs/common";
import { FolderService } from "../../application/services/folder.service";
import { CreateFolderDto } from "../../application/dto/create-folder.dto";
import { JwtAuthGuard } from "src/modules/auth/infrastructure/guards/jwt-auth.guard";
import { UpdateFolderDto } from "../../application/dto/update-folder.dto";

@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FolderController {
    constructor(
        private readonly folderService: FolderService
    ) { }

    @Post()
    create(@Body() dto: CreateFolderDto, @Request() req: any) {
        return this.folderService.create(dto, req.user.userId)
    }

    @Get()
    findRootFolders(@Request() req: any) {
        return this.folderService.findRootFolders(req.user.userId)
    }

    @Get('/:id')
    findFolderDetail(@Param('id') id: string) {
        return this.folderService.findById(id)
    }

    @Get('/:id/children')
    findChildrenFolders(@Param('id') id: string) {
        return this.folderService.findChildren(id)
    }

    @Patch('/:id')
    updateFolder(@Param('id') id: string, @Body() dto: UpdateFolderDto) {
        return this.folderService.update(id, dto)
    }

    @Delete('/:id')
    deleteFolder(@Param('id') id: string) {
        return this.folderService.delete(id);
    }

}