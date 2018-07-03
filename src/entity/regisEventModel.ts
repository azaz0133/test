import {Entity, PrimaryGeneratedColumn, Column,ManyToMany,JoinTable, OneToMany,CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()

export class regisEvent{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    tfirstname:string;
    @Column()
    tlastname:string;
    @Column()
    efirstname:string;
    @Column()
    elastname:string;
    @Column()
    nick_name:string;
    @Column()
    birthdate: Date;
    @Column()
    tel:string;
    @Column()
    email:string;
    @Column()
    status_student:string;
    @Column("text")
    university:string;
    @Column("text")
    faculty:string;
    @Column()
    level_study:string;
    @Column("text")
    address:string;
    @Column("text")
    facebook:string;
    @Column("text")
    line:string;
    @CreateDateColumn({type: "timestamp"})
    created_at: Date;
    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}