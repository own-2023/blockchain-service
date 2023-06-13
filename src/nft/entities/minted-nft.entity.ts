
import { Entity, Column, OneToOne, PrimaryColumn } from 'typeorm';
import { NftEntity } from './nft.entity';

@Entity({
    name: 'minted_nfts',
    database: 'db',
})
export class MintedNftEntity {

    @PrimaryColumn('uuid')
    nft_id: string;

    @Column()
    token_id: string;

    @OneToOne(() => NftEntity, nftEntity => nftEntity.mintedNftEntity)
    lazyNftEntity: NftEntity;

}