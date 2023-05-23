import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { IpfsEntity } from 'src/ipfs/entities/ipfs.entity';
import { MintedNftEntity } from './minted-nft.entity';

@Entity({
    name: 'user_lazy_nfts',
    database: 'db',
})
export class NftEntity {
    @PrimaryGeneratedColumn()
    nft_id: number;

    @Column()
    owner_id: number;

    @Column()
    created_at: Date;

    @Column({ default: false })
    isMinted: boolean;

    @ManyToOne(() => IpfsEntity, ipfs => ipfs.lazyNftEntity, {})
    @JoinColumn()
    ipfsEntity: IpfsEntity;

    @OneToOne(() => MintedNftEntity, mintedNftEntity => mintedNftEntity.lazyNftEntity, { nullable: true })
    @JoinColumn({ name: 'ipfs_id' })
    mintedNftEntity: MintedNftEntity[];
}