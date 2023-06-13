import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { IpfsEntity } from 'src/ipfs/entities/ipfs.entity';

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

    @Column({default: false})
    isOnSale: boolean;

    @Column({ default: false })
    isMinted: boolean;

    @Column('uuid')
    ipfs_id: string;

    @ManyToOne(() => IpfsEntity, ipfs => ipfs.lazyNftEntity, {})
    @JoinColumn({ name: 'ipfs_id' })
    ipfsEntity: IpfsEntity;

    @Column()
    token_id: string;
}