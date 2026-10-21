@echo off
echo ========================================
echo Empty Project Template
echo ========================================
echo.

echo Setting up environment variables...
powershell -ExecutionPolicy Bypass -File "%~dp0setup_env.ps1"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to setup environment file
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete
echo ========================================
echo.
echo This is an empty project template.
echo There is nothing to compile or deploy.
echo.
echo The .env file has been created in the project root.
echo You can now start building your application!
echo.
echo Next Steps:
echo 1. Add your application code to the project root
echo 2. Install required dependencies for your tech stack
echo 3. Create custom build/deploy scripts as needed
echo 4. Update README.md with your project documentation
echo.

exit /b 0
