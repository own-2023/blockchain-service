
import { Entity, Column, OneToOne, PrimaryColumn, JoinTable } from 'typeorm';
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

    @OneToOne(() => NftEntity, nftEntity => nftEntity.mintedNftEntity, {cascade: true})
    @JoinTable({name: 'nft_id'})
    lazyNftEntity: NftEntity;

}