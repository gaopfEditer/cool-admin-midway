import { CoolController, BaseController } from '@cool-midway/core';
import { BaseCategoryEntity } from '../../entity/biz/category';

/**
 * 文章类别
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: BaseCategoryEntity,
  pageQueryOp: {
    keyWordLikeFields: ['a.name', 'a.description'],
    fieldEq: ['a.status', 'a.parentId'],
    fieldLike: ['a.name'],
    select: ['a.*', 'b.name as parentName'],
    join: [
      {
        entity: BaseCategoryEntity,
        alias: 'b',
        condition: 'a.parentId = b.id',
        type: 'leftJoin',
      },
    ],
    addOrderBy: {
      orderNum: 'asc',
      createTime: 'desc',
    },
  },
  listQueryOp: {
    fieldEq: ['a.status'],
    select: ['a.id', 'a.name', 'a.parentId', 'a.orderNum', 'a.icon', 'a.status'],
    addOrderBy: {
      orderNum: 'asc',
    },
  },
})
export class AdminBusinessCategoryController extends BaseController {}

