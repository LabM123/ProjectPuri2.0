import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    bottles_amount: number;

    @Column()
    section: string;

    @Column()
    external_number: string;

    @Column()
    internal_number: string;

    @Column({
        type: 'enum',
        enum: ['Completado', 'Cancelado', 'Pendiente'],
        default: 'Pendiente'
    })
    status: string;

    @Column({nullable: true})
    latitude: string;

    @Column({nullable: true})
    longitude: string;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}