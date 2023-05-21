import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
