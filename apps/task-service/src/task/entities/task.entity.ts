import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ default: false })
  isCompleted: boolean

  @Column()
  @Exclude()
  userId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
