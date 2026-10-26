Add-Type -AssemblyName System.Drawing
foreach ($name in @('profileS.jpeg', 'profilebg.jpeg', 'profile.jpeg', 'profile1.jpeg', 'profileNew.png')) {
    $p = Join-Path $PSScriptRoot ("assets\" + $name)
    if (Test-Path $p) {
        $img = [System.Drawing.Image]::FromFile($p)
        Write-Host "$name : $($img.Width) x $($img.Height)"
        $img.Dispose()
    }
}
