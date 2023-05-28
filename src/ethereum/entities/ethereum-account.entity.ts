import { Column, PrimaryColumn } from "typeorm";

export class EthereumAccountEntity{
    @PrimaryColumn()
    address: string;

    @Column('uuid')
    user_id: string;

    @Column()
    private_key: string;
}