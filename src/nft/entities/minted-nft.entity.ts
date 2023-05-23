
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { NftEntity } from './nft.entity';

@Entity({
    name: 'user_nfts',
    database: 'db',
})
export class MintedNftEntity {

    @Column()
    nft_id: number;

    @Column()
    token_id: number;

    @OneToOne(()=> NftEntity, nftEntity => nftEntity.mintedNftEntity)
    lazyNftEntity: NftEntity;

}