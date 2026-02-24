import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { IStorageService } from "../domain/storage.service.interface";
import { ConfigService } from "@nestjs/config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MinioStorageService implements IStorageService {
    private s3Client: S3Client;
    private bucketName: string;

    constructor(
        private configService: ConfigService
    ) {
        this.s3Client = new S3Client({
            endpoint: this.configService.getOrThrow('S3_ENDPOINT'),
            region: this.configService.getOrThrow('S3_REGION'),
            credentials: {
                accessKeyId: this.configService.getOrThrow('S3_ACCESS_KEY'),
                secretAccessKey: this.configService.getOrThrow('S3_SECRET_KEY'),
            },
            forcePathStyle: true
        });
        this.bucketName = this.configService.getOrThrow('S3_BUCKET_NAME')
    }

    async upload(key: string, file: Buffer, mimeType: string): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file,
            ContentType: mimeType
        });
        await this.s3Client.send(command);
        return key;
    }

    async download(key: string): Promise<Buffer> {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key
        })
        const response = await this.s3Client.send(command)
        const stream = response.Body as NodeJS.ReadableStream
        const chunks: Buffer[] = [];
        for await (const chunk of stream) {
            chunks.push(Buffer.from(chunk));
        }
        return Buffer.concat(chunks)
    }

    async delete(key: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key
        });
        await this.s3Client.send(command)
    }

    async getPresignedUrl(key: string, expiresIn?: number): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key
        })
        return getSignedUrl(this.s3Client, command, { expiresIn: expiresIn ?? 3600 })
    }
}