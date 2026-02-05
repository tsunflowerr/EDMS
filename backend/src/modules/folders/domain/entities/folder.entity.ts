import { User } from "src/modules/users/domain/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('folders')
export class Folder {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToOne(() => Folder, folder => folder.children, { nullable: true })
    @JoinColumn({ name: 'parentId' })
    parent: Folder

    @OneToMany(() => Folder, folder => folder.parent)
    children: Folder[];

    @ManyToOne(() => User)
    @JoinColumn({ name: 'createdBy' })
    createdBy: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}