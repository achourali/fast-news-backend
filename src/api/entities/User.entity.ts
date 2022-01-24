import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;


    @Column({ nullable: false, unique: true })
    email: string;


    @Column()
    password: string;


    constructor(
        username: string,
        email: string,
        password: string,
    ) {
        super();
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
