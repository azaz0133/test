import {Entity, PrimaryGeneratedColumn, Column,OneToMany,OneToOne,JoinColumn,ManyToMany,JoinTable, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Article} from './Article'
import {Gallery} from './Gallery'
import {Tag} from './Tag'
@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
      title	:string
    @Column()
      start_date:Date
    @Column()
      end_date:Date
    @Column()	
      status:Boolean
    @Column("text")	
      event_times:string
    @Column()	
      regis_start_day:Date
    @Column()	
      regis_end_day	:Date
    @Column("text")
      cover_image:string
    @Column()	
      article_id:number

    @OneToOne(type => Article)
    @JoinColumn()
    has : Article;

    @OneToMany(type => Gallery, gallery => gallery.event)
    galleries: Gallery[];

    @ManyToMany(type => Tag)
    @JoinTable()
    have: Tag[];

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;
    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
  


}
