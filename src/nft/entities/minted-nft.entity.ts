
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { LazyNftEntity } from './lazy-nft';

@Entity({
    name: 'user_nfts',
    database: 'db',
})
export class MintedNftEntity {

    @Column()
    nft_id: number;

    @Column()
    token_id: number;

    @OneToOne(()=> LazyNftEntity, lazyNftEntity => lazyNftEntity.mintedNftEntity)
    lazyNftEntity: LazyNftEntity;

}