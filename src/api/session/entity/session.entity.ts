import { AppBaseEntity } from '../../../common/database/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'sessions'
})
export class SessionEntity extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  subscriber: number;

  @Column({
    type: 'varchar',
    nullable: false
  })
  token: string;


}
