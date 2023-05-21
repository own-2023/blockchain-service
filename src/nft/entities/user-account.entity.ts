import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
    name: 'user_accounts',
    database: 'db',
})
export class UserAccountEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

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