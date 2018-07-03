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

    @Column()
    gender: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    birthdate: Date;

    @Column()
    status: number;

    @Column()
    tel: string;

    @Column()
    university:string
    
    @Column()
    faculty: string;

    @Column()
    major: string;

    @Column()
    facebook: string;

    @Column()
    education_status: boolean;

    @Column()
    edu_year: string;

    @Column()
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
