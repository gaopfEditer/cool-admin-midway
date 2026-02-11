import { CoolController, BaseController } from '@cool-midway/core';
import { BaseArticleEntity } from '../../entity/biz/article';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';
import { BaseCategoryEntity } from '../../entity/biz/category';

/**
 * 文章
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: BaseArticleEntity,
  pageQueryOp: {
    keyWordLikeFields: ['a.title', 'a.summary', 'a.description'],
    fieldEq: ['a.status', 'a.categoryId', 'a.authorId', 'a.isTop', 'a.isRecommend'],
    fieldLike: ['a.title'],
    select: [
      'a.*',
      'b.name as authorName',
      'b.nickName as authorNickName',
      'c.name as categoryName',
    ],
    join: [
      {
        entity: BaseSysUserEntity,
        alias: 'b',
        condition: 'a.authorId = b.id',
        type: 'leftJoin',
      },
      {
        entity: BaseCategoryEntity,
        alias: 'c',
        condition: 'a.categoryId = c.id',
        type: 'leftJoin',
      },
    ],
    addOrderBy: {
      sort: 'desc',
      publishTime: 'desc',
      createTime: 'desc',
    },
  },
  listQueryOp: {
    keyWordLikeFields: ['a.title'],
    fieldEq: ['a.status', 'a.categoryId'],
    select: [
      'a.id',
      'a.title',
      'a.summary',
      'a.coverImage',
      'a.publishTime',
      'a.viewCount',
      'a.likeCount',
      'a.status',
      'c.name as categoryName',
    ],
    join: [
      {
        entity: BaseCategoryEntity,
        alias: 'c',
        condition: 'a.categoryId = c.id',
        type: 'leftJoin',
      },
    ],
    addOrderBy: {
      sort: 'desc',
      publishTime: 'desc',
    },
  },
})
export class AdminBusinessArticleController extends BaseController {}

