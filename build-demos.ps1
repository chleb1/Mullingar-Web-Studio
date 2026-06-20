<#
  build-demos.ps1
  ----------------
  Refreshes the live demos embedded in the portfolio (demos/ folder) from their
  source projects, and rebuilds the Cosmic Discoveries single-file bundle.

  Run from anywhere:
      powershell -ExecutionPolicy Bypass -File .\build-demos.ps1

  Source projects (override with -Source if they move):
      <Source>\gym-tracker
      <Source>\cybersec-hub
      <Source>\cosmic-discoveries
#>
param(
  [string]$Source = (Join-Path $PSScriptRoot '..\Today\Claude')
)

$ErrorActionPreference = 'Stop'
$Source = (Resolve-Path $Source).Path
$Demos  = Join-Path $PSScriptRoot 'demos'

Write-Host "Source : $Source"
Write-Host "Demos  : $Demos"

if (-not (Test-Path $Demos)) { New-Item -ItemType Directory -Path $Demos | Out-Null }

# 1. Rebuild the Cosmic Discoveries self-contained file from source
$cosmic = Join-Path $Source 'cosmic-discoveries'
Write-Host "`n=== Building Cosmic Discoveries standalone ==="
if (-not (Test-Path (Join-Path $cosmic 'node_modules'))) {
  Write-Host "node_modules missing - running npm install..."
  Push-Location $cosmic; npm install; Pop-Location
}
Push-Location $cosmic
node build-standalone.mjs
Pop-Location

# 2. Copy the three demos into demos/ (replace existing copies)
function Sync-Folder($name) {
  $src = Join-Path $Source $name
  $dst = Join-Path $Demos  $name
  if (Test-Path $dst) { Remove-Item $dst -Recurse -Force }
  Copy-Item $src $dst -Recurse
  Write-Host "  copied $name"
}

Write-Host "`n=== Refreshing demos ==="
Sync-Folder 'gym-tracker'
Sync-Folder 'cybersec-hub'

# Cosmic = single self-contained file only
Copy-Item (Join-Path $cosmic 'cosmic-discoveries.html') (Join-Path $Demos 'cosmic-discoveries.html') -Force
Write-Host "  copied cosmic-discoveries.html"

Write-Host "`nDone. Demos refreshed in $Demos" -ForegroundColor Green
