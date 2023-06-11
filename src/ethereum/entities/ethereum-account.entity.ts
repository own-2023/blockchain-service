import { Column, PrimaryColumn, Entity } from "typeorm";


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

    @Column()
    nonce: number;

    @Column({default: 0})
    balance: number;
}