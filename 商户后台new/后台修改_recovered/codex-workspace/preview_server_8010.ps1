$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$port = 8010
$log = Join-Path $env:TEMP 'codex_preview_server_8010.log'

function Write-PreviewLog($message) {
  $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
  Add-Content -LiteralPath $log -Value "$stamp $message"
}

try {
  $listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Parse('127.0.0.1'), $port)
  $listener.Start()
  Write-PreviewLog "started http://127.0.0.1:$port/ root=$root"

  while ($true) {
    $client = $listener.AcceptTcpClient()
    $client.ReceiveTimeout = 1200
    $client.SendTimeout = 1200
    try {
      $stream = $client.GetStream()
      $buffer = New-Object byte[] 8192
      $read = $stream.Read($buffer, 0, $buffer.Length)
      if ($read -le 0) {
        $client.Close()
        continue
      }

      $request = [Text.Encoding]::ASCII.GetString($buffer, 0, $read)
      $firstLine = ($request -split "`r?`n")[0]
      Write-PreviewLog "request $firstLine"
      $parts = $firstLine -split ' '
      $target = if ($parts.Length -ge 2) { $parts[1] } else { '/' }
      $target = ($target -split '\?')[0]

      if ($target -eq '/') {
        $target = '/codex-workspace/index.html'
      }

      $decoded = [Uri]::UnescapeDataString($target.TrimStart('/'))
      $relative = $decoded.Replace('/', [IO.Path]::DirectorySeparatorChar)
      $file = [IO.Path]::GetFullPath([IO.Path]::Combine($root, $relative))

      if (!$file.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or !(Test-Path -LiteralPath $file -PathType Leaf)) {
        $body = [Text.Encoding]::UTF8.GetBytes('Not found')
        $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      } else {
        $body = [IO.File]::ReadAllBytes($file)
        $ext = [IO.Path]::GetExtension($file).ToLowerInvariant()
        $type = switch ($ext) {
          '.html' { 'text/html; charset=utf-8' }
          '.js' { 'application/javascript; charset=utf-8' }
          '.css' { 'text/css; charset=utf-8' }
          '.json' { 'application/json; charset=utf-8' }
          '.svg' { 'image/svg+xml' }
          '.png' { 'image/png' }
          '.jpg' { 'image/jpeg' }
          '.jpeg' { 'image/jpeg' }
          '.gif' { 'image/gif' }
          default { 'application/octet-stream' }
        }
        $header = "HTTP/1.1 200 OK`r`nContent-Type: $type`r`nContent-Length: $($body.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
      }

      $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      $stream.Write($body, 0, $body.Length)
    } catch {
      Write-PreviewLog "request error: $($_.Exception.Message)"
    } finally {
      try { $client.Close() } catch {}
    }
  }
} catch {
  Write-PreviewLog "server error: $($_.Exception.Message)"
}
