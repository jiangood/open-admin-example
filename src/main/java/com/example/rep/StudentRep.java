package com.example.rep;

import com.example.entity.Student;
import io.github.jiangood.openadmin.framework.data.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRep extends BaseRepository<Student, String> {
}
