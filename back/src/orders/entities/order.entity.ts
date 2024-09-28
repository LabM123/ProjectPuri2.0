import { User } from "src/users/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { format } from '@formkit/tempo'

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

    @Column({nullable: true})
    created_at: string;

    @Column({nullable: true})
    updated_at: string;

    @BeforeUpdate()
    adjustTimeZoneUpdate() {
        const nowInMexico = format({
            date: new Date,
            tz: 'America/Mexico_City',
            format: 'YYYY-MM-DDTHH:mm:ss'
        })
        this.updated_at = nowInMexico
    }
    
    @BeforeInsert()
    adjustTimeZoneCreated() {
        const nowInMexico = format({
            date: new Date,
            tz: 'America/Mexico_City',
            format: 'YYYY-MM-DDTHH:mm:ss'
        })
        this.created_at = nowInMexico
    }
}