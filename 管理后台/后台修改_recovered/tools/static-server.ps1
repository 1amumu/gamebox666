param(
  [string]$Root = (Get-Location).Path,
  [int]$Port = 8000
)

$rootFull = [IO.Path]::GetFullPath($Root).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $Port)
$listener.Start()

$types = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".svg" = "image/svg+xml"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif" = "image/gif"
}

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $stream = $client.GetStream()
    $buffer = New-Object byte[] 8192
    $count = $stream.Read($buffer, 0, $buffer.Length)
    $request = [Text.Encoding]::ASCII.GetString($buffer, 0, $count)
    $line = ($request -split "`r?`n")[0]
    $parts = $line -split " "
    $urlPath = if ($parts.Length -ge 2) { $parts[1] } else { "/" }
    $urlPath = ($urlPath -split "\?")[0]
    $raw = [Uri]::UnescapeDataString($urlPath.TrimStart("/"))

    if ([string]::IsNullOrWhiteSpace($raw)) {
      $raw = "index.html"
    }

    $relative = $raw.Replace("/", [IO.Path]::DirectorySeparatorChar)
    $full = [IO.Path]::GetFullPath([IO.Path]::Combine($Root, $relative))

    if (-not $full.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase) -or -not [IO.File]::Exists($full)) {
      $body = [Text.Encoding]::UTF8.GetBytes("Not found")
      $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
    } else {
      $body = [IO.File]::ReadAllBytes($full)
      $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
      $type = if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" }
      $header = "HTTP/1.1 200 OK`r`nContent-Type: $type`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
    }

    $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
    $stream.Write($headerBytes, 0, $headerBytes.Length)
    $stream.Write($body, 0, $body.Length)
  } catch {
  } finally {
    $client.Close()
  }
}
