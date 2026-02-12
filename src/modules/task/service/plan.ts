import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, In } from 'typeorm';
import { TaskPlanEntity } from '../entity/plan';
import { TaskPlanSubEntity } from '../entity/plan_sub';

/**
 * 任务计划
 */
@Provide()
export class TaskPlanService extends BaseService {
  @InjectEntityModel(TaskPlanEntity)
  taskPlanEntity: Repository<TaskPlanEntity>;

  @InjectEntityModel(TaskPlanSubEntity)
  taskPlanSubEntity: Repository<TaskPlanSubEntity>;

  /**
   * 删除（级联删除子任务）
   */
  async delete(ids: number[]) {
    // 先删除子任务
    await this.taskPlanSubEntity.delete({ planId: In(ids) });
    // 再删除主任务
    await super.delete(ids);
  }
}

