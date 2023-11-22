// audit.decorator.ts
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { AuditEntity } from './audit.entity';
import { PerformanceEvaluation } from '../../modules/performance-evaluation/entities/performance-evaluation.entity';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface<PerformanceEvaluation> {
  listenTo() {
    return PerformanceEvaluation;
  }

  afterInsert(event: InsertEvent<PerformanceEvaluation>) {
    this.handleEvent(event, 'CREATE');
  }

  beforeUpdate(event: UpdateEvent<PerformanceEvaluation>) {
    throw new Error('No se permiten actualizaciones en las informaciòn de la evaluacòn de rendimiento.');
  }

  beforeRemove(event: RemoveEvent<PerformanceEvaluation>) {
    this.handleEvent(event, 'DELETE');
  }

  private handleEvent(
    event: InsertEvent<PerformanceEvaluation> | UpdateEvent<PerformanceEvaluation> | RemoveEvent<PerformanceEvaluation>,
    action: string,
  ) {
    const auditEntry = new AuditEntity();
    auditEntry.action = action;
    auditEntry.entityId = event.entity.id;
    auditEntry.entity = event.metadata.tableName;
    auditEntry.data = event.entity;
    event.manager.save(auditEntry); // Guardar entrada de auditoría
  }
}
