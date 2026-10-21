# Read additional_settings.json
$configPath = Join-Path $PSScriptRoot "additional_settings.json"

if (-Not (Test-Path $configPath)) {
    Write-Host "Error: additional_settings.json not found at $configPath" -ForegroundColor Red
    exit 1
}

Write-Host "Reading configuration from additional_settings.json..." -ForegroundColor Cyan

$config = Get-Content $configPath -Raw | ConvertFrom-Json

# Get template root directory (parent of .aimfire)
$templatePath = Split-Path $PSScriptRoot -Parent

if (-Not (Test-Path $templatePath)) {
    Write-Host "Error: Template directory not found at $templatePath" -ForegroundColor Red
    exit 1
}

# Create .env file in template root
$envPath = Join-Path $templatePath ".env"

Write-Host "Creating .env file at $envPath..." -ForegroundColor Cyan

# Write project environment variables
$envContent = @()
if ($config.'project-env') {
    foreach ($key in $config.'project-env'.PSObject.Properties.Name) {
        $value = $config.'project-env'.$key
        $envContent += "$key=$value"
    }
}

$envContent -join "`n" | Out-File -FilePath $envPath -Encoding utf8 -NoNewline

Write-Host ".env file created successfully!" -ForegroundColor Green
Write-Host "Environment variables configured:" -ForegroundColor Yellow
Get-Content $envPath
