import { Body, Inject, Post, Provide } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  CoolUrlTag,
  TagTypes,
} from '@cool-midway/core';
import { TaskPlanEntity } from '../../entity/plan';
import { TaskPlanSubEntity } from '../../entity/plan_sub';
import { TaskPlanService } from '../../service/plan';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 任务计划
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: TaskPlanEntity,
  service: TaskPlanService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name', 'a.description'],
    fieldEq: ['a.status', 'a.priority', 'a.moduleCategory'],
    fieldLike: ['a.name'],
    addOrderBy: {
      createTime: 'desc',
    },
  },
  listQueryOp: {
    fieldEq: ['a.status'],
    addOrderBy: {
      createTime: 'desc',
    },
  },
})
@CoolUrlTag({
  key: TagTypes.IGNORE_TOKEN,
  value: ['add', 'delete', 'update', 'info', 'list', 'page', 'infoWithSub', 'saveWithSub'],
})
export class TaskPlanController extends BaseController {
  @InjectEntityModel(TaskPlanEntity)
  taskPlanEntity: Repository<TaskPlanEntity>;

  @InjectEntityModel(TaskPlanSubEntity)
  taskPlanSubEntity: Repository<TaskPlanSubEntity>;

  /**
   * 获取任务详情（包含子任务）
   */
  @Post('/infoWithSub', { summary: '获取任务详情（包含子任务）' })
  async infoWithSub(@Body('id') id: number) {
    const plan = await this.taskPlanEntity.findOne({ where: { id } });
    if (!plan) {
      return this.fail('任务不存在');
    }

    const subTasks = await this.taskPlanSubEntity.find({
      where: { planId: id },
      order: { order: 'ASC' },
    });

    return this.ok({
      ...plan,
      subTasks,
    });
  }

  /**
   * 保存任务（包含子任务）
   */
  @Post('/saveWithSub', { summary: '保存任务（包含子任务）' })
  async saveWithSub(@Body() params: any) {
    const { subTasks, ...planData } = params;

    let plan: TaskPlanEntity;
    if (planData.id) {
      // 更新
      plan = await this.taskPlanEntity.findOne({ where: { id: planData.id } });
      if (!plan) {
        return this.fail('任务不存在');
      }
      Object.assign(plan, planData);
      await this.taskPlanEntity.save(plan);

      // 删除旧的子任务
      await this.taskPlanSubEntity.delete({ planId: plan.id });
    } else {
      // 新增
      plan = await this.taskPlanEntity.save(planData);
    }

    // 保存子任务
    if (subTasks && Array.isArray(subTasks)) {
      const subTaskList = subTasks.map((sub: any, index: number) => ({
        planId: plan.id,
        content: sub.content,
        completed: sub.completed ? 1 : 0,
        order: sub.order !== undefined ? sub.order : index,
      }));
      await this.taskPlanSubEntity.save(subTaskList);
    }

    // 返回完整数据
    const savedSubTasks = await this.taskPlanSubEntity.find({
      where: { planId: plan.id },
      order: { order: 'ASC' },
    });

    return this.ok({
      ...plan,
      subTasks: savedSubTasks,
    });
  }
}

