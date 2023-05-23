import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'user_lazy_nfts',
    database: 'db',
})
export class LazyNftEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    cid: string;

    @Column()
    name: string;

    @Column()
    created_at: Date;

    @Column({default: false})
    isMinted: boolean;
}