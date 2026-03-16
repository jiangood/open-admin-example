package com.example.entity;

import io.github.jiangood.openadmin.framework.data.BaseEntity;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Student extends BaseEntity {

    private String name;


}
