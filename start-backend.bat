@echo off
echo ========================================
echo  Start Backend - open-admin-example
echo ========================================
echo.

cd /d "%~dp0"

echo [INFO] Compiling and starting Spring Boot backend...
echo [INFO] Port: 8080  context-path: /example
echo.

mvnw spring-boot:run

pause
