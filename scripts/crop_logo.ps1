Add-Type -AssemblyName System.Drawing
$rawPath = Join-Path $PSScriptRoot "..\public\as-logo-raw.png"
$srcPath = Join-Path $PSScriptRoot "..\public\as-logo.png"

if (-not (Test-Path $rawPath)) {
    Copy-Item $srcPath $rawPath
}

$src = [System.Drawing.Bitmap]::new($rawPath)
$rect = [System.Drawing.Rectangle]::new(24, 57, 720, 438)
$cropped = $src.Clone($rect, $src.PixelFormat)
$src.Dispose()

$cropped.Save($srcPath, [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
Write-Host "Logo successfully cropped and centered!"
