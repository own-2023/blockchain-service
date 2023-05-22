import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'user_lazy_nfts',
    database: 'db',
})
export class UserLazyNftEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    cid: number;

    @Column()
    name: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}