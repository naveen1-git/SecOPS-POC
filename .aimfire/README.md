# Empty Project - Run Template

This directory contains the setup scripts for the empty project template.

## Files

- **additional_settings.json** - Environment configuration
- **setup_env.ps1** - PowerShell script to generate .env file
- **compile.bat** - Setup script (creates .env file)
- **deploy.bat** - Placeholder deployment script
- **.env.example** - Example environment variables

## Usage

### Setup Environment

```bash
compile.bat
```

This will:
- Read configuration from `additional_settings.json`
- Generate `.env` file in the project root
- Display setup completion message

### Deploy (Placeholder)

```bash
deploy.bat
```

This is a placeholder script that reminds you to create your own deployment process.

## Configuration

Edit `additional_settings.json` to customize your project environment variables:

```json
{
  "project-env": {
    "PROJECT_NAME": "empty-project",
    "ENVIRONMENT": "development",
    "DEBUG": "true"
  }
}
```

## Structure

```
empty-project/               (template root)
    ├── .aimfire/            (this directory)
    │   ├── compile.bat
    │   ├── deploy.bat
    │   ├── setup_env.ps1
    │   ├── additional_settings.json
    │   └── README.md
    ├── .env                 (generated)
    └── README.md
```

## Next Steps

1. Add your application files to the project root
2. Install dependencies for your chosen tech stack
3. Create custom build scripts as needed
4. Implement deployment logic in deploy.bat or create new scripts
