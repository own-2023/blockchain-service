
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { NftEntity } from './nft.entity';

@Entity({
    name: 'minted_nfts',
    database: 'db',
})
export class MintedNftEntity {

    @PrimaryGeneratedColumn('uuid')
    nft_id: string;

    @Column()
    token_id: string;

    @OneToOne(()=> NftEntity, nftEntity => nftEntity.mintedNftEntity)
    lazyNftEntity: NftEntity;

}