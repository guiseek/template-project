import { AbstractDto } from '../dtos/abstract.dto';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { UtilsService } from '../services/utils.service';

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at'
  })
  updatedAt: Date;

  abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

  toDto(options?: any) {
    return UtilsService.toDto(this.dtoClass, this, options);
  }
}
