import { AppBaseEntity } from '../../../common/database/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'designations'
})
export class DesignationEntity extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({
    type: 'varchar',
    nullable: false
  })
  name: string;
}
