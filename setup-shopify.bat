@echo off
chcp 65001 >nul
title Cotorie Shopify Setup
echo.
echo ╔════════════════════════════════════════════════╗
echo ║     Cotorie 独立站 Shopify 自动配置脚本        ║
echo ╚════════════════════════════════════════════════╝
echo.
echo [第1步] 登录 Shopify 账号
echo ─────────────────────────────────────────────
echo 请在弹出的浏览器中完成登录。
echo 如果终端让你选择账号，请选择 809560960@qq.com
echo.
shopify auth login
if %errorlevel% neq 0 (
    echo.
    echo [错误] 登录失败，请检查网络后重试。
    pause
    exit /b 1
)
echo.
echo ✅ 登录成功！
echo.
echo [第2步] 获取 Storefront Access Token
echo ─────────────────────────────────────────────
echo Shopify CLI v3.x 已不再支持 'storefront-api token create' 命令。
echo 需要通过 Shopify 后台手动获取 Token：
echo.
echo 1. 正在为你打开 Shopify 后台...
start "" "https://admin.shopify.com/store/hn1ha0-mz/settings/apps/development"
echo.
echo 2. 点击【创建应用】→ 起名如 "Cotorie Storefront"
echo 3. 点击【配置 Storefront API】
echo 4. 勾选以下权限：
echo    ☑ unauthenticated_read_product_listings
echo    ☑ unauthenticated_read_product_inventory  
echo    ☑ unauthenticated_write_checkouts
echo    ☑ unauthenticated_read_checkouts
echo 5. 保存 → 安装应用
echo 6. 复制 Storefront API access token (shpat_ 开头)
echo.
set /p TOKEN="请粘贴你的 Token (shpat_...): "
echo.
echo [第3步] 写入 .env 文件
echo ─────────────────────────────────────────────
(
echo VITE_SHOPIFY_STORE_DOMAIN=hn1ha0-mz.myshopify.com
echo VITE_SHOPIFY_STOREFRONT_TOKEN=%TOKEN%
) > "C:\Users\相美.PC\Desktop\V53\.env"
echo.
echo ✅ Token 已写入 .env 文件！
echo.
echo ╔════════════════════════════════════════════════╗
echo ║            🎉 配置完成！                       ║
echo ║  接下来我会帮你验证并部署到 Vercel             ║
echo ╚════════════════════════════════════════════════╝
echo.
pause