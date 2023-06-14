import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { IpfsEntity } from 'src/ipfs/entities/ipfs.entity';
import { EthereumAccountEntity } from 'src/ethereum/entities/ethereum-account.entity';

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

    /*@ManyToOne(() => EthereumAccountEntity, EthereumAccountEntity => EthereumAccountEntity.lazyNftEntity, {})
    @JoinColumn({ name: 'user_id' })
    ethereumAccountEntity: EthereumAccountEntity;*/

    @Column({nullable: true, default: null})
    token_id: string;
}