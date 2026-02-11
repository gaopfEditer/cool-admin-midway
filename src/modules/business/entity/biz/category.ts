import { BaseEntity } from '../../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 文章类别
 */
@Entity('business_category')
export class BaseCategoryEntity extends BaseEntity {
  @Column({ comment: '类别名称' })
  name: string;

  @Index()
  @Column({ comment: '父分类ID', nullable: true })
  parentId: number;

  @Column({ comment: '排序', default: 0 })
  orderNum: number;

  @Column({ comment: '描述', nullable: true, length: 500 })
  description: string;

  @Column({ comment: '图标', nullable: true })
  icon: string;

  @Column({
    comment: '状态',
    dict: ['禁用', '启用'],
    default: 1,
  })
  status: number;

  @Column({ comment: '封面图', nullable: true })
  coverImage: string;

  @Column({ comment: 'SEO关键词', nullable: true, length: 200 })
  seoKeywords: string;

  @Column({ comment: 'SEO描述', nullable: true, length: 500 })
  seoDescription: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  // 父分类名称（虚拟字段，用于显示）
  parentName: string;

  // 子分类（虚拟字段，用于树形结构）
  children: any;
}

