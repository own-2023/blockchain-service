import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


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
    created_at: Date;

    @Column()
    updated_at: Date;
 }


 @Entity({ 
    name: 'user_nfts',
    database: 'db',
})
export class UserNftEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    token_id: number;

    @Column()
    contract_address: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
 }

 @Entity({ 
    name: 'users',
    database: 'db',
})
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;


    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
 }

