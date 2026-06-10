package com.example.product;

import io.github.jiangood.openadmin.framework.data.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldNameConstants;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "product")
@FieldNameConstants
public class Product extends BaseEntity {

    @NotNull
    @Column(nullable = false)
    private String name;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 30)
    private String status;

    @Column(length = 32)
    private String image;

    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = "draft";
        }
    }
}
