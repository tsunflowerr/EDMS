import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileValidationPipe implements PipeTransform {
    private readonly maxSize: number;
    private readonly allowedMimeTypes: string[];

    constructor(options?: { maxSize?: number; allowedMimeTypes?: string[] }) {
        this.maxSize = options?.maxSize ?? 10 * 1024 * 1024;
        this.allowedMimeTypes = options?.allowedMimeTypes ?? [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'image/gif',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain',
        ];
    }

    transform(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        if (file.size > this.maxSize) {
            throw new BadRequestException(`File too large. Max size: ${this.maxSize / (1024 * 1024)}MB`)
        }

        if (!this.allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException(`File type '${file.mimetype}' is not allowed`)
        }

        return file;
    }
}