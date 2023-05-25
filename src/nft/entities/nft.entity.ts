import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { IpfsEntity } from 'src/ipfs/entities/ipfs.entity';
import { MintedNftEntity } from './minted-nft.entity';

@Entity({
    name: 'nfts',
    database: 'db',
})
export class NftEntity {
    @PrimaryGeneratedColumn('uuid')
    nft_id: string;

    @Column('uuid')
    owner_id: string;

    @Column()
    created_at: Date;

    @Column({ default: 0 })
    price: number;

    @Column({ default: false })
    isMinted: boolean;

    @Column('uuid')
    ipfs_id: string;

    @Column('uuid', {default: null})
    minted_nft_id: string;

    @ManyToOne(() => IpfsEntity, ipfs => ipfs.lazyNftEntity, {})
    @JoinColumn({ name: 'ipfs_id' })
    ipfsEntity: IpfsEntity;

    @OneToOne(() => MintedNftEntity, mintedNftEntity => mintedNftEntity.lazyNftEntity, { nullable: true })
    @JoinColumn({ name: 'minted_nft_id' })
    mintedNftEntity: MintedNftEntity;
}