package com.example;

import io.github.jiangood.openadmin.util.VersionTool;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        // 测试探针：验证 VersionTool 后可删除（--version-probe 仅打印版本不启动应用）
        System.out.println("[VersionProbe] framework=" + VersionTool.getFrameworkVersion()
                + " buildTime=" + VersionTool.getFrameworkBuildTime()
                + ", application=" + VersionTool.getApplicationVersion()
                + " buildTime=" + VersionTool.getApplicationBuildTime());
        if (args.length > 0 && args[0].equals("--version-probe")) {
            return;
        }
        SpringApplication.run(Application.class, args);
    }

}