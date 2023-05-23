import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
    name: 'user_accounts',
    database: 'db',
})
export class UserAccountEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    public_key: string;

    @Column()
    private_key: string;

    @Column()
    balance: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}