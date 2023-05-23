import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LazyNftEntity } from 'src/nft/entities/lazy-nft';


@Entity({
    name: 'ipfs',
    database: 'db',
})
export class IpfsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creator_id: string;

    @Column()
    cid: string;

    @Column()
    nft_name: string;

    @Column()
    created_at: Date;

    @OneToMany(() => LazyNftEntity, lazyNftEntity => lazyNftEntity.ipfsEntity, {})
    lazyNftEntity: LazyNftEntity;

}
