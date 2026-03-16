package com.example.test;

import com.example.service.StudentService;
import io.github.jiangood.openadmin.modules.system.entity.SysUser;
import io.github.jiangood.openadmin.modules.system.repository.SysUserRepository;
import jakarta.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TestRunner implements CommandLineRunner {

    @Resource
    private StudentService studentService;

    @Resource
    private SysUserRepository sysUserRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("开始测试");
        List<SysUser> all = sysUserRepository.findAll();
        for (SysUser sysUser : all) {
            System.out.println(sysUser.getName() + ": " +  sysUser.getAccount());
        }
    }
}
