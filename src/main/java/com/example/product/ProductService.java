package com.example.product;

import io.github.jiangood.openadmin.framework.data.BaseService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends BaseService<Product> {

    public ProductService(ProductRepository repository, EntityManager entityManager) {
        super(repository, entityManager);
    }
}
