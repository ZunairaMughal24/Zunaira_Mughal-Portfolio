Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "assets\profileS.jpeg"
$testFullPng = Join-Path $PSScriptRoot "assets\test_full_circle.png"

$src = [System.Drawing.Image]::FromFile($srcPath)
$size = 256
$bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(0, 0, $size, $size)
$g.SetClip($path)

# Full image mapped directly to circle
$srcRect = New-Object System.Drawing.Rectangle(0, 0, $src.Width, $src.Height)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
$g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$g.ResetClip()
$path.Dispose()
$g.Dispose()
$src.Dispose()

$bmp.Save($testFullPng, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Generated test full circle"
