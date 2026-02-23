import { Document } from "../entities/document.entity"
export interface IDocumentRepository {
    findById(id: string): Promise<Document | null>
    findByFolder(folderId: string): Promise<Document[]>
    findByUserId(userId: string): Promise<Document[]>
    save(document: Document): Promise<Document>
    delete(id: string): Promise<void>
}