import {Entity, PrimaryGeneratedColumn, Column,ManyToMany,JoinTable, OneToMany,CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Event} from './Event';
import  {Role} from './Role';
import {Token} from './Tokens'
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    age: number;

    @Column()
    email: string;

    @Column({ nullable: true })
    birthdate: Date;

    @Column({ nullable: true })
    status: number;

    @Column({ nullable: true })
    tel: string;

    @Column({ nullable: true })
    university:string
    
    @Column({ nullable: true })
    faculty: string;

    @Column({ nullable: true })
    major: string;

    @Column({ nullable: true })
    facebook: string;

    @Column({ nullable: true })
    education_status: boolean;

    @Column({ nullable: true })
    edu_year: string;

    @Column({ nullable: true })
    username: string;

    @Column("text")
    password: string;

    @ManyToMany(type => Event)
    @JoinTable()
    categories: Event[];

    @ManyToMany(type => Role)
    @JoinTable()
    has: Role[];

    @OneToMany(type => Token,token => token.user)
    token:Token[];
    
    @CreateDateColumn({type: "timestamp"})
    created_at: Date;
    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;


}
