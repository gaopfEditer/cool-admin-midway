import { Body, Inject, Post, Provide } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  CoolUrlTag,
  TagTypes,
} from '@cool-midway/core';
import { TaskPlanSubEntity } from '../../entity/plan_sub';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 任务计划子任务
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: TaskPlanSubEntity,
  pageQueryOp: {
    fieldEq: ['a.planId', 'a.completed'],
    addOrderBy: {
      order: 'asc',
      createTime: 'desc',
    },
  },
  listQueryOp: {
    fieldEq: ['a.planId'],
    addOrderBy: {
      order: 'asc',
    },
  },
})
@CoolUrlTag({
  key: TagTypes.IGNORE_TOKEN,
  value: ['add', 'delete', 'update', 'info', 'list', 'page', 'toggleComplete', 'updateOrder'],
})
export class TaskPlanSubController extends BaseController {
  @InjectEntityModel(TaskPlanSubEntity)
  taskPlanSubEntity: Repository<TaskPlanSubEntity>;

  /**
   * 更新子任务完成状态
   */
  @Post('/toggleComplete', { summary: '切换完成状态' })
  async toggleComplete(@Body('id') id: number) {
    const subTask = await this.taskPlanSubEntity.findOne({ where: { id } });
    if (!subTask) {
      return this.fail('子任务不存在');
    }

    subTask.completed = subTask.completed === 1 ? 0 : 1;
    await this.taskPlanSubEntity.save(subTask);

    return this.ok(subTask);
  }

  /**
   * 批量更新子任务排序
   */
  @Post('/updateOrder', { summary: '更新排序' })
  async updateOrder(@Body('items') items: Array<{ id: number; order: number }>) {
    if (!Array.isArray(items) || items.length === 0) {
      return this.fail('参数错误');
    }

    for (const item of items) {
      await this.taskPlanSubEntity.update({ id: item.id }, { order: item.order });
    }

    return this.ok();
  }
}

