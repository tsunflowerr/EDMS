export interface IStorageService {
    upload(key: string, file: Buffer, mimeType: string): Promise<string>
    download(key: string): Promise<Buffer>;
    delete(key: string): Promise<void>;
    getPresignedUrl(key: string, expiresIn?: number): Promise<string>
}