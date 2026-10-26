Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "assets\profileS.jpeg"
$destPng = Join-Path $PSScriptRoot "assets\favicon.png"
$icoPath = Join-Path $PSScriptRoot "favicon.ico"

$src = [System.Drawing.Image]::FromFile($srcPath)
Write-Host "Source image size: $($src.Width) x $($src.Height)"

$size = 256
$bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Circular mask only - transparent outside, no added background color
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(0, 0, $size, $size)
$g.SetClip($path)

# Draw full image inside the circle
$srcRect = New-Object System.Drawing.Rectangle(0, 0, $src.Width, $src.Height)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
$g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$g.ResetClip()
$path.Dispose()
$g.Dispose()
$src.Dispose()

$bmp.Save($destPng, [System.Drawing.Imaging.ImageFormat]::Png)

$hIcon = $bmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fileStream = New-Object System.IO.FileStream($icoPath, [System.IO.FileMode]::Create)
$icon.Save($fileStream)
$fileStream.Close()
$icon.Dispose()
$bmp.Dispose()
Write-Host "Saved circular favicon from user image successfully."
