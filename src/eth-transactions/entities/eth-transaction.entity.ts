import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity({ 
    name: 'ethtransactions',
    database: 'db',
})
export class EthTransactionEntity {
    @PrimaryGeneratedColumn()
    transaction_id: number;

    @Column()
    from_user_id: string;

    @Column()
    to_user_id: string;

    @Column()
    nft_id: string;

    @Column()
    amount: number;

    @Column()
    created_at: Date;
 }
