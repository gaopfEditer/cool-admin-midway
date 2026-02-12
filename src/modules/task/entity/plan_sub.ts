import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 任务计划子任务
 */
@Entity('task_plan_sub')
export class TaskPlanSubEntity extends BaseEntity {
  @Index()
  @Column({ comment: '任务计划ID' })
  planId: number;

  @Column({ comment: '内容', type: 'text' })
  content: string;

  @Column({ comment: '是否完成', default: 0 })
  completed: number;

  @Column({ comment: '排序', default: 0 })
  order: number;
}

