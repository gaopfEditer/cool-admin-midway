import { BaseEntity, transformerJson } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 任务计划
 */
@Entity('task_plan')
export class TaskPlanEntity extends BaseEntity {
  @Column({ comment: '模块分类', nullable: true, length: 50 })
  moduleCategory: string;

  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '描述', type: 'text', nullable: true })
  description: string;

  @Column({ comment: '子分类', nullable: true, length: 50 })
  subCategory: string;

  @Column({ comment: '进度 0-100', default: 0 })
  progress: number;

  @Index()
  @Column({ comment: '计划开始日期', nullable: true, type: 'date' })
  plannedStartDate: Date;

  @Index()
  @Column({ comment: '计划结束日期', nullable: true, type: 'date' })
  plannedEndDate: Date;

  @Index()
  @Column({ comment: '实际开始日期', nullable: true, type: 'date' })
  actualStartDate: Date;

  @Index()
  @Column({ comment: '实际结束日期', nullable: true, type: 'date' })
  actualEndDate: Date;

  @Column({ comment: '计划时间（小时）', nullable: true, length: 50 })
  plannedTime: string;

  @Column({ comment: '实际时间（小时）', nullable: true, length: 50 })
  actualTime: string;

  @Column({
    comment: '优先级',
    dict: ['低', '中', '高'],
    default: 1,
    length: 20,
  })
  priority: string;

  @Column({
    comment: '标签',
    nullable: true,
    type: 'json',
    transformer: transformerJson,
  })
  tags: string[];

  @Column({
    comment: '状态',
    dict: ['待开始', '进行中', '已完成', '已暂停', '已取消'],
    default: 0,
    length: 20,
  })
  status: string;
}
