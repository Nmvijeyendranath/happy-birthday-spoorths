$url = "https://nodejs.org/dist/v20.12.2/node-v20.12.2-win-x64.zip"
$outZip = "$env:TEMP\node.zip"
$outDir = "$env:TEMP\node_portable"
if (-not (Test-Path "$outDir\node-v20.12.2-win-x64\node.exe")) {
    Write-Host "Downloading portable Node.js..."
    Invoke-WebRequest -Uri $url -OutFile $outZip
    Write-Host "Extracting..."
    Expand-Archive -Path $outZip -DestinationPath $outDir -Force
}
$env:PATH = "$outDir\node-v20.12.2-win-x64;" + $env:PATH
Write-Host "Node version: $(node -v)"
Write-Host "Installing dependencies..."
npm install
Write-Host "Starting development server..."
npm run dev
