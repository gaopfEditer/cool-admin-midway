-- 导入任务计划数据
-- 使用MySQL变量自动处理ID映射，避免手动调整planId

-- 清空现有数据（可选，执行前请确认）
-- DELETE FROM task_plan_sub;
-- DELETE FROM task_plan;

-- 设置变量用于存储插入的ID
SET @plan_id_1 = 0;
SET @plan_id_2 = 0;
SET @plan_id_3 = 0;
SET @plan_id_4 = 0;
SET @plan_id_5 = 0;
SET @plan_id_6 = 0;

-- 插入主任务数据并获取ID
-- 任务1: 整理信息来源
INSERT INTO task_plan (
  moduleCategory, name, description, subCategory, progress,
  plannedStartDate, plannedEndDate, actualStartDate, actualEndDate,
  plannedTime, actualTime, priority, tags, status,
  createTime, updateTime, tenantId
) VALUES (
  'info', '整理信息来源', '发现社区或平台，之后前期以实用为主，后续是拓展。整理信息来源：投资类、国外类、技术类、运营类', '', 0,
  '2026-01-09', '2026-12-09', '2026-01-10', NULL,
  '100', '', '中', '[]', '待开始',
  '2026-01-09 14:05:03', '2026-01-10 02:57:22', NULL
);
SET @plan_id_1 = LAST_INSERT_ID();

-- 任务2: 运营易币（前期）
INSERT INTO task_plan (
  moduleCategory, name, description, subCategory, progress,
  plannedStartDate, plannedEndDate, actualStartDate, actualEndDate,
  plannedTime, actualTime, priority, tags, status,
  createTime, updateTime, tenantId
) VALUES (
  'operate', '运营易币（前期）', '社交账号搭建，内容模板到启动，推广易币，维护币安、推特账号发内容，先了解大v发的内容，建立几类内容模板', '阶段计划', 0,
  '2026-01-09', '2026-12-09', NULL, NULL,
  '', '', '中', '[]', '待开始',
  '2026-01-09 14:06:59', '2026-01-10 03:07:16', NULL
);
SET @plan_id_2 = LAST_INSERT_ID();

-- 任务3: 虚拟货币交易
INSERT INTO task_plan (
  moduleCategory, name, description, subCategory, progress,
  plannedStartDate, plannedEndDate, actualStartDate, actualEndDate,
  plannedTime, actualTime, priority, tags, status,
  createTime, updateTime, tenantId
) VALUES (
  'invest', '虚拟货币交易', '每日跟单复盘，刷手续费，好点位进场，技术体系整理', '', 16,
  '2026-01-09', '2026-12-09', NULL, NULL,
  '', '', '中', '[]', '进行中',
  '2026-01-09 14:08:16', '2026-01-12 13:52:59', NULL
);
SET @plan_id_3 = LAST_INSERT_ID();

-- 任务4: 日常的一些感想
INSERT INTO task_plan (
  moduleCategory, name, description, subCategory, progress,
  plannedStartDate, plannedEndDate, actualStartDate, actualEndDate,
  plannedTime, actualTime, priority, tags, status,
  createTime, updateTime, tenantId
) VALUES (
  'blog', '日常的一些感想', '实用主义的思维模型，一些关联性的深度思考', '', 47,
  '2026-01-09', '2026-12-09', NULL, NULL,
  '', '', '中', '[]', '进行中',
  '2026-01-09 14:20:06', '2026-01-12 13:53:09', NULL
);
SET @plan_id_4 = LAST_INSERT_ID();

-- 任务5: 项目案例详解和演示
INSERT INTO task_plan (
  moduleCategory, name, description, subCategory, progress,
  plannedStartDate, plannedEndDate, actualStartDate, actualEndDate,
  plannedTime, actualTime, priority, tags, status,
  createTime, updateTime, tenantId
) VALUES (
  'project', '项目案例详解和演示', '项目案例详解和演示', '', 0,
  '2026-01-09', '2026-12-09', NULL, NULL,
  '', '', '中', '[]', '待开始',
  '2026-01-09 14:20:52', '2026-01-10 02:31:42', NULL
);
SET @plan_id_5 = LAST_INSERT_ID();

-- 任务6: 人生运营
INSERT INTO task_plan (
  moduleCategory, name, description, subCategory, progress,
  plannedStartDate, plannedEndDate, actualStartDate, actualEndDate,
  plannedTime, actualTime, priority, tags, status,
  createTime, updateTime, tenantId
) VALUES (
  'operate', '人生运营', '每日复盘，写日记，看计划，用于不至于浪费时间，迷失方向。', '运营', 0,
  '2026-01-25', '2026-12-31', '2026-01-25', '2026-12-31',
  '40', '40', '中', '[]', '进行中',
  '2026-01-25 15:23:18', '2026-01-25 15:26:45', NULL
);
SET @plan_id_6 = LAST_INSERT_ID();

-- 插入子任务数据（使用变量引用主任务ID）
-- 任务1的子任务
INSERT INTO task_plan_sub (planId, content, completed, `order`, createTime, updateTime, tenantId) VALUES
(@plan_id_1, '技术博客-主要找产品运营创意方向，把中文博客过一遍，深度过一遍就行，后续继续找新的社区，这些博客本身也链接了很多', 0, 0, NOW(), NOW(), NULL),
(@plan_id_1, 'tg群组-技术资源、运营资源等', 0, 1, NOW(), NOW(), NULL),
(@plan_id_1, '新资讯或者社区，比如tradingview', 0, 2, NOW(), NOW(), NULL);

-- 任务2的子任务
INSERT INTO task_plan_sub (planId, content, completed, `order`, createTime, updateTime, tenantId) VALUES
(@plan_id_2, '币安账号，运营流程模板，哪些雷区', 0, 0, NOW(), NOW(), NULL),
(@plan_id_2, '推特账号，矩阵账号，找找同行，关注用户', 0, 1, NOW(), NOW(), NULL),
(@plan_id_2, '前期日更，专门抽时间计划内容', 0, 2, NOW(), NOW(), NULL),
(@plan_id_2, '运营模式-前期人头重要，后期稳定变现重要，类似于产品的首月体验优惠', 0, 3, NOW(), NOW(), NULL),
(@plan_id_2, '工具查找：视频处理工具等', 0, 4, NOW(), NOW(), NULL),
(@plan_id_2, 'typecho内容产出，两天产出一篇', 0, 5, NOW(), NOW(), NULL),
(@plan_id_2, '信号通知服务，带单聊天室，付费接入', 0, 6, NOW(), NOW(), NULL);

-- 任务3的子任务
INSERT INTO task_plan_sub (planId, content, completed, `order`, createTime, updateTime, tenantId) VALUES
(@plan_id_3, '每日跟单，15分钟短线，其他信号看到可小仓位试', 0, 0, NOW(), NOW(), NULL),
(@plan_id_3, '找BK社区，汇盈其他社区老师的后位进入，关注其偏好和走向', 0, 1, NOW(), NOW(), NULL),
(@plan_id_3, '币安广场找一些准确的', 0, 2, NOW(), NOW(), NULL),
(@plan_id_3, '币安空投规则等，可以搞10w搞理财和现货', 0, 3, NOW(), NOW(), NULL);

-- 任务4的子任务
INSERT INTO task_plan_sub (planId, content, completed, `order`, createTime, updateTime, tenantId) VALUES
(@plan_id_4, '思维模型', 0, 0, NOW(), NOW(), NULL),
(@plan_id_4, '从表层信息、深度信息 之后是学习、修复、创造阶段；结合实用角度来看这些阶段需要什么思维模型，借助运营一个社区、或者一个软件产品角度来谈谈', 0, 1, NOW(), NOW(), NULL),
(@plan_id_4, '一个应用从计划、实施、优化阶段分别对应什么思维模型，这三个阶段的意义是什么，相关的案例是什么？', 0, 2, NOW(), NOW(), NULL),
(@plan_id_4, '计划的意义是什么，用什么模型比较合适  实施比较有用的模型是mvp这样尽可能快的看到全貌 查找信息 有什么模型比较利于整体思考', 0, 3, NOW(), NOW(), NULL);

-- 任务5的子任务
INSERT INTO task_plan_sub (planId, content, completed, `order`, createTime, updateTime, tenantId) VALUES
(@plan_id_5, '博客-计划模块', 1, 0, NOW(), NOW(), NULL),
(@plan_id_5, '博客-投资技术方向和输出模板', 0, 1, NOW(), NOW(), NULL),
(@plan_id_5, 'TradingView信号预警（上下插针、多个插针）', 0, 2, NOW(), NOW(), NULL),
(@plan_id_5, 'whisprrt-会议信息预警', 0, 3, NOW(), NOW(), NULL),
(@plan_id_5, 'trendradar-运营币圈', 0, 4, NOW(), NOW(), NULL),
(@plan_id_5, '支付', 0, 5, NOW(), NOW(), NULL),
(@plan_id_5, '国外云服务器域名一套', 0, 6, NOW(), NOW(), NULL);

-- 任务6的子任务
INSERT INTO task_plan_sub (planId, content, completed, `order`, createTime, updateTime, tenantId) VALUES
(@plan_id_6, '每日复盘', 0, 0, NOW(), NOW(), NULL),
(@plan_id_6, '养成写案例的习惯，三天写一个大日记，后续也可以基于日记中的灵感去创造', 0, 1, NOW(), NOW(), NULL);

