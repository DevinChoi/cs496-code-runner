import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CodeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    level: string;

    @Column({ type: 'varchar', length: 50 })
    language: string;

    @Column({ type: 'text' })
    code_text: string;
}