import { Folder } from "src/modules/folders/domain/entities/folder.entity";
import { User } from "src/modules/users/domain/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('documents')
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    mimeType: string

    @Column()
    size: number

    @Column()
    storageKey: string

    @ManyToOne(() => Folder, { nullable: true })
    @JoinColumn({ name: 'folderId' })
    folder?: Folder

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    uploadedBy: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}