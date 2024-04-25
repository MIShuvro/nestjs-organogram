import { AppBaseEntity } from '../../../common/database/entity/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm';
import { DesignationEntity } from '../../employee-designation/entity/designation.entity';


@Entity({
  name: 'employees'
})
@Tree('closure-table')
export class EmployeeEntity extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({
    type: 'varchar',
    nullable: false
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  password: string;

  @ManyToOne(() => DesignationEntity, (designation) => designation.employee)
  @JoinColumn({ name: 'designation_id' })
  designation: DesignationEntity;

  @Column()
  @Index()
  designation_id: number;

  @Column({
    nullable: true
  })
  @Index()
  parentId: number;

  @TreeChildren()
  children: EmployeeEntity[];

  @TreeParent()
  parent: EmployeeEntity;

}
