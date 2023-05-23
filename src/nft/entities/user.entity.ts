import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'users',
    database: 'db',
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

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
