import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity({ 
    name: 'ipfs',
    database: 'db',
})
export class IpfsEntity {
    @PrimaryGeneratedColumn()
    ipfs_id: number;

    @Column()
    user_id: string;

    @Column()
    cid: string;

    @Column()
    filename: string;

    @Column()
    created_at: Date;

 }
