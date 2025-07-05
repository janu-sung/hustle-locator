# Shell Configuration Guide

## Shells That Support `&&` Command Chaining

The `&&` operator for command chaining is supported in several shell environments:

1. **Bash** - The most common shell on Linux and macOS
2. **Zsh** - Default shell on macOS since Catalina
3. **Git Bash** - A Bash emulation for Windows
4. **Windows Command Prompt (cmd.exe)** - Windows' traditional command line
5. **Windows Subsystem for Linux (WSL)** - Linux environment on Windows
6. **Cygwin** - UNIX-like environment for Windows

PowerShell, which is the default shell in newer Windows systems, uses a different syntax for command chaining.

## Configuring Your Windows Environment

Here are several options to use a shell that supports `&&` on Windows:

### Option 1: Use Command Prompt (cmd.exe)

The simplest option is to use the Windows Command Prompt, which already supports `&&`:

1. Press `Win + R`, type `cmd`, and press Enter
2. Or search for "Command Prompt" in the Start menu

### Option 2: Install and Use Git Bash

Git Bash provides a Bash emulation that works well on Windows:

1. Download and install Git for Windows from https://git-scm.com/download/win
2. During installation, select the option to add Git Bash to the context menu
3. After installation, you can right-click in any folder and select "Git Bash Here"

### Option 3: Configure VS Code to Use a Different Terminal

You can configure VS Code to use a different terminal by default:

1. Open VS Code
2. Press `Ctrl + ,` to open Settings
3. Search for "terminal.integrated.defaultProfile.windows"
4. Click "Edit in settings.json"
5. Add or modify the setting to use Command Prompt or Git Bash:

```json
{
  "terminal.integrated.defaultProfile.windows": "Command Prompt"
}
```

Or for Git Bash:

```json
{
  "terminal.integrated.defaultProfile.windows": "Git Bash"
}
```

### Option 4: Install Windows Subsystem for Linux (WSL)

For a full Linux experience on Windows:

1. Open PowerShell as Administrator
2. Run: `wsl --install`
3. Restart your computer
4. Complete the Linux distribution setup
5. Configure VS Code to use WSL:
   - Install the "Remote - WSL" extension in VS Code
   - Click the green remote button in the bottom-left corner
   - Select "New WSL Window"

## Using PowerShell with Command Chaining

If you prefer to continue using PowerShell, you can use these alternatives to `&&`:

1. Use semicolons to separate commands:
   ```powershell
   cd hustle-platform; npm run dev
   ```

2. Use the pipeline with ForEach-Object:
   ```powershell
   @("cd hustle-platform", "npm run dev") | ForEach-Object { Invoke-Expression $_ }
   ```

3. Create a function for command chaining:
   ```powershell
   function Invoke-Commands {
       param([string[]]$commands)
       foreach ($cmd in $commands) {
           Write-Host "> $cmd" -ForegroundColor Green
           Invoke-Expression $cmd
           if ($LASTEXITCODE -ne 0) {
               Write-Host "Command failed with exit code $LASTEXITCODE" -ForegroundColor Red
               break
           }
       }
   }
   
   # Usage:
   Invoke-Commands @("cd hustle-platform", "npm run dev")
   ```

## Recommendation

For web development on Windows, Git Bash or WSL are highly recommended as they provide a more Linux-like environment that's compatible with most web development tools and commands.
