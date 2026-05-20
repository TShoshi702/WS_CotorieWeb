Write-Host "=== HTTPS Test ==="
try {
    $r = Invoke-WebRequest -Uri 'https://cotorie.com' -TimeoutSec 15 -UseBasicParsing
    Write-Host "HTTPS OK:" $r.StatusCode
} catch { Write-Host "HTTPS FAIL:" $_.Exception.Message }

Write-Host ""
Write-Host "=== HTTPS WC API ==="
try {
    $r = Invoke-WebRequest -Uri 'https://cotorie.com/wp-json/wc/store/v1/products?per_page=2' -TimeoutSec 15 -UseBasicParsing
    Write-Host "API Status:" $r.StatusCode
    Write-Host "Origin:" $r.Headers['Access-Control-Allow-Origin']
    $json = $r.Content | ConvertFrom-Json
    Write-Host "Products:" $json.Count
} catch { Write-Host "API FAIL:" $_.Exception.Message }
