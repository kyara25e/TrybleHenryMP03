import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Status } from '../Interface/Appointment.Interface';
import { User } from './User.entity';

@Entity("appointments")
export class Appointment{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: false })
    date: Date;

    @Column({ type: 'varchar', length: 5, nullable: false })
    time: string;

    @ManyToOne(() => User, user => user.appointments)
    @JoinColumn()
    user: User;

    @Column({ type: 'varchar', length: 10, nullable: false, default: Status.active })
    status: Status;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}