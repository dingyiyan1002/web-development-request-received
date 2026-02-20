@echo off
chcp 65001 >nul
title C语言思维训练器

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║          C语言思维训练器 - 一键启动                       ║
echo ╠══════════════════════════════════════════════════════════╣
echo ║  前端: http://localhost:5173                              ║
echo ║  后端: http://localhost:3001                              ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

:: 检查 Node.js 是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js 18+
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

:: 检查依赖是否安装
if not exist "node_modules" (
    echo [信息] 首次运行，正在安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
)

:: 检查后端依赖
if not exist "server\node_modules" (
    echo [信息] 安装后端依赖...
    cd server
    call npm install
    cd ..
)

echo.
echo [启动] 正在启动服务...
echo.

:: 启动后端服务（新窗口）
start "C语言训练器-后端" cmd /k "cd server && node index.js"

:: 等待后端启动
timeout /t 2 /nobreak >nul

:: 启动前端服务（新窗口）
start "C语言训练器-前端" cmd /k "npm run dev"

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║  服务已启动！请稍等浏览器自动打开...                       ║
echo ║                                                          ║
echo ║  如未自动打开，请手动访问:                                ║
echo ║  http://localhost:5173                                   ║
echo ║                                                          ║
echo ║  关闭此窗口不会停止服务                                   ║
echo ║  要停止服务请关闭对应的命令行窗口                          ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

:: 等待前端启动后自动打开浏览器
timeout /t 5 /nobreak >nul
start http://localhost:5173

pause
