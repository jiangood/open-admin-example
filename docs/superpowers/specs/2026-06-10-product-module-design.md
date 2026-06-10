# Product Module Design

## Objective

为 open-admin-example 项目添加一个商品管理示例模块，演示如何基于 open-admin 框架快速搭建业务 CRUD。

## Data Model

```java
Product extends BaseEntity
├── name: String        // 商品名称
├── price: BigDecimal   // 价格
├── description: String // 描述 (TEXT)
├── status: String      // 状态 (字典: product_status)
└── image: String       // 图片 (文件 ID)
```

## Architecture

### Backend (4 files)

| Layer | File | Pattern |
|-------|------|---------|
| Entity | `com.example.product.Product` | extends `BaseEntity`, `@FieldNameConstants` |
| Repository | `com.example.product.ProductRepository` | extends `BaseRepository<Product, String>` |
| Service | `com.example.product.ProductService` | extends `BaseService<Product>` |
| Controller | `com.example.product.ProductController` | RESTful + `@HasPermission("product:xxx")` |

### Menu

`src/main/resources/data/menu-product.yml` — 商品管理 → 商品列表 (path: /product, permission: product)

### Frontend (1 page)

`web/src/pages/product/index.jsx` — 标准的 ProTable + ProModal CRUD 页面

## Framework Features Demonstrated

1. BaseEntity (UUIDv7 ID + 审计字段)
2. BaseRepository / BaseService (零代码 CRUD)
3. @HasPermission (按钮级权限)
4. 字典 (FieldDictSelect) — status 字段
5. 文件上传 (FieldUploadFile) — image 字段
6. ProTable (分页搜索) + ProModal (弹窗表单)
7. 菜单 YAML 自动注册
