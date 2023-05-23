import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { NftEntity } from 'src/nft/entities/nft.entity';


@Entity({
    name: 'ipfs',
    database: 'db',
})
export class IpfsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    creator_id: string;

    @Column({nullable: false})
    cid: string;

    @Column({nullable: false})
    nft_name: string;

    @Column()
    created_at: Date;

    @OneToMany(() => NftEntity, lazyNftEntity => lazyNftEntity.ipfsEntity, {})
    lazyNftEntity: NftEntity;

}
