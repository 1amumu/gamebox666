param(
  [string]$Root = (Resolve-Path ".").Path,
  [string]$OutputDir = "codex-workspace"
)

$ErrorActionPreference = "Stop"

function Get-PageGroup {
  param([string]$Name)

  if ($Name -in @("index.html", "index111.html", "start.html", "start_c_1.html", "start_with_pages.html", "page_1.html")) {
    return "entry"
  }

  if ($Name -match "_1\.html$") { return "merchant-backend" }
  if ($Name -match "^.{2}-.+\.html$") { return "merchant-backend" }

  return "axure-pages"
}

function Get-PageTitle {
  param([string]$Path, [string]$Fallback)

  $content = [IO.File]::ReadAllText($Path, [Text.Encoding]::UTF8)
  if ($content -match "<title>(.*?)</title>") {
    return [System.Net.WebUtility]::HtmlDecode($matches[1]).Trim()
  }

  return [IO.Path]::GetFileNameWithoutExtension($Fallback)
}

$outputPath = Join-Path $Root $OutputDir
$dataPath = Join-Path $outputPath "data"
New-Item -ItemType Directory -Path $dataPath -Force | Out-Null

$pages = Get-ChildItem -Path $Root -Filter "*.html" -File |
  Sort-Object Name |
  ForEach-Object {
    $title = Get-PageTitle -Path $_.FullName -Fallback $_.Name
    [pscustomobject]@{
      title = $title
      file = $_.Name
      group = Get-PageGroup -Name $_.Name
      source = "../$($_.Name)"
      size = $_.Length
      lastModified = $_.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss")
      status = "axure-source"
    }
  }

$summary = [pscustomobject]@{
  generatedAt = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
  sourceRoot = $Root
  pageCount = $pages.Count
  groups = ($pages | Group-Object group | Sort-Object Name | ForEach-Object {
    [pscustomobject]@{
      name = $_.Name
      count = $_.Count
    }
  })
  pages = $pages
}

$json = $summary | ConvertTo-Json -Depth 6
Set-Content -Path (Join-Path $dataPath "pages.json") -Value $json -Encoding UTF8

Write-Output "Generated $($pages.Count) pages at $OutputDir/data/pages.json"
