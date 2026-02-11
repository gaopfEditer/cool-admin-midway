import { BaseEntity, transformerJson } from '../base';
import { Column, Index, Entity } from 'typeorm';

/**
 * 文章
 */
@Entity('business_article')
export class BaseArticleEntity extends BaseEntity {
  @Index()
  @Column({ comment: '标题', length: 200 })
  title: string;

  @Column({ comment: '内容', type: 'text' })
  content: string;

  @Index()
  @Column({ comment: '作者ID', nullable: true })
  authorId: number;

  @Index()
  @Column({ comment: '分类ID', nullable: true })
  categoryId: number;

  @Column({
    comment: '标签',
    nullable: true,
    type: 'json',
    transformer: transformerJson,
  })
  tags: string[];

  @Column({ comment: '摘要', nullable: true, length: 500 })
  summary: string;

  @Column({ comment: '描述', nullable: true, length: 1000 })
  description: string;

  @Column({
    comment: '状态',
    dict: ['草稿', '已发布', '已下架'],
    default: 0,
  })
  status: number;

  @Column({ comment: '封面图', nullable: true })
  coverImage: string;

  @Index()
  @Column({
    comment: '发布时间',
    nullable: true,
    type: 'varchar',
  })
  publishTime: Date;

  @Column({ comment: '阅读量', default: 0 })
  viewCount: number;

  @Column({ comment: '点赞数', default: 0 })
  likeCount: number;

  @Column({ comment: '评论数', default: 0 })
  commentCount: number;

  @Column({ comment: 'SEO关键词', nullable: true, length: 200 })
  seoKeywords: string;

  @Column({ comment: 'SEO描述', nullable: true, length: 500 })
  seoDescription: string;

  @Column({ comment: '是否置顶', default: 0 })
  isTop: number;

  @Column({ comment: '是否推荐', default: 0 })
  isRecommend: number;

  @Column({ comment: '排序', default: 0 })
  sort: number;

  @Column({ comment: '来源', nullable: true, length: 100 })
  source: string;

  @Column({ comment: '来源链接', nullable: true })
  sourceUrl: string;

  @Column({ comment: '是否允许评论', default: 1 })
  allowComment: number;

  @Column({ comment: '密码', nullable: true })
  password: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;
}
