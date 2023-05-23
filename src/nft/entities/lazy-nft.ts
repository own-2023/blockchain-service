import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { IpfsEntity } from 'src/ipfs/entities/ipfs.entity';
import { MintedNftEntity } from './minted-nft.entity';

@Entity({
    name: 'user_lazy_nfts',
    database: 'db',
})
export class LazyNftEntity {
    @PrimaryGeneratedColumn()
    nft_id: number;

    @Column()
    owner_id: number;

    @Column()
    created_at: Date;

    @Column({ default: false })
    isMinted: boolean;

    @ManyToOne(() => IpfsEntity, ipfs => ipfs.lazyNftEntity, {})
    ipfsEntity: IpfsEntity;

    @OneToOne(() => MintedNftEntity, mintedNftEntity => mintedNftEntity.lazyNftEntity, {})
    mintedNftEntity: MintedNftEntity[];
}