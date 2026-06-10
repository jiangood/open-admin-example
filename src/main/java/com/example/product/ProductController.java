package com.example.product;

import io.github.jiangood.openadmin.framework.config.RequestBodyKeys;
import io.github.jiangood.openadmin.framework.data.specification.Spec;
import io.github.jiangood.openadmin.framework.perm.HasPermission;
import io.github.jiangood.openadmin.util.dto.AjaxResult;
import io.github.jiangood.openadmin.util.dto.IdReq;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("admin/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @HasPermission("product:read")
    @RequestMapping("page")
    public AjaxResult page(String name, String status,
                           @PageableDefault(sort = "updateTime", direction = Sort.Direction.DESC) Pageable pageable) {
        Spec<Product> q = Spec.of();
        q.like(Product.Fields.name, name);
        q.eq(Product.Fields.status, status);
        Page<Product> page = service.findAll(q, pageable);
        return AjaxResult.ok().data(page);
    }

    @HasPermission("product:create")
    @PostMapping("create")
    public AjaxResult create(@RequestBody Product input) {
        service.save(input);
        return AjaxResult.ok().msg("创建成功");
    }

    @HasPermission("product:update")
    @PostMapping("update")
    public AjaxResult update(@RequestBody Product input, RequestBodyKeys updateFields) {
        service.update(input, updateFields);
        return AjaxResult.ok().msg("更新成功");
    }

    @HasPermission("product:delete")
    @PostMapping("delete")
    public AjaxResult delete(@Valid @RequestBody IdReq idRequest) {
        service.deleteById(idRequest.getId());
        return AjaxResult.ok().msg("删除成功");
    }
}
