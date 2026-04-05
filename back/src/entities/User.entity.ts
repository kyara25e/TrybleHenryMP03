import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { Appointment } from './Appointment.entity';
import { Credential } from './Credentials.entity';


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar', length: 100, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 100, nullable: false, unique: true})
    email: string;

    @Column({type: 'date', nullable: false})
    birthdate: Date;

    @Column({type: 'integer', nullable: false, unique: true})
    nDni: number;

    @OneToOne( () => Credential)
    @JoinColumn()
    credentials: Credential;


    @OneToMany( () => Appointment, appointment => appointment.user )
    appointments: Appointment[];


    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}