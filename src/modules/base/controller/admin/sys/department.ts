import { ALL, Body, Inject, Post, Provide, Get } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  CoolUrlTag,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
import { BaseSysDepartmentEntity } from '../../../entity/sys/department';
import { BaseSysDepartmentService } from '../../../service/sys/department';

/**
 * 部门
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'list'],
  entity: BaseSysDepartmentEntity,
  service: BaseSysDepartmentService,
  insertParam: ctx => {
    return {
      userId: ctx.admin.userId,
    };
  },
})
@CoolUrlTag() // 必须添加这个装饰器，@CoolTag 才能生效
export class BaseDepartmentController extends BaseController {
  @Inject()
  baseDepartmentService: BaseSysDepartmentService;

  /**
   * 部门排序
   */
  @Post('/order', { summary: '排序' })
  async order(@Body(ALL) params: any) {
    await this.baseDepartmentService.order(params);
    return this.ok();
  }

  /**
   * 测试接口 - 不需要token验证
   */
  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/test', { summary: '测试接口' })
  async test() {
    return this.ok({
      message: '这是一个不需要token验证的测试接口',
      timestamp: new Date().toISOString(),
    });
  }
}
