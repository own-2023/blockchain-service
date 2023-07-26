import { Column, PrimaryColumn, Entity, OneToMany } from "typeorm";
import { NftEntity } from "src/nft/entities/nft.entity";

@Entity({
    name: 'ethereum_accounts',
    database: 'db',
})
export class EthereumAccountEntity{
    @PrimaryColumn()
    address: string;

    @Column('uuid')
    user_id: string;

    @Column()
    private_key: string;

    @Column({default: 0})
    nonce: number;

    /*@OneToMany((type) => NftEntity, lazyNftEntity => lazyNftEntity.ethereumAccountEntity, {})
    lazyNftEntity: NftEntity;*/

}