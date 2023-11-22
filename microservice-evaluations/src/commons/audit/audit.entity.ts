import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('audit')
export class AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string; // Acción realizada (ej. CREATE, UPDATE, DELETE)

  @Column()
  entity: string; // Nombre de la entidad (tabla)

  @Column()
  entityId: number; // Nombre de la entidad (tabla)

  @Column({ type: 'text', nullable: true })
  data: Record<string, any>; // Datos de la entidad

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
