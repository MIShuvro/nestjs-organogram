import { AppBaseEntity } from '../../../common/database/entity/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeEntity } from '../../employee/entity/employee.entity';


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

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  identifier: string;


  @OneToMany(() => EmployeeEntity, (employee) => employee.designation)
  employee: EmployeeEntity;
}
