package com.example;

import io.github.jiangood.openadmin.util.VersionTool;

/**
 * 测试探针：仅打印版本后退出，不启动 Spring。
 * 验证 VersionTool 后可删除。
 */
public class VersionProbe {

    public static void main(String[] args) {
        System.out.println("[VersionProbe] framework=" + VersionTool.getFrameworkVersion()
                + " buildTime=" + VersionTool.getFrameworkBuildTime());
        System.out.println("[VersionProbe] application=" + VersionTool.getApplicationVersion()
                + " buildTime=" + VersionTool.getApplicationBuildTime());
    }
}
