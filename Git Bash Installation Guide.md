# Git Bash Installation and Configuration Guide

This guide will walk you through installing Git Bash and configuring it to work with VS Code for the Hustle Locator Web App project.

## Step 1: Download Git for Windows

1. Go to the official Git for Windows website: https://git-scm.com/download/win
2. The download should start automatically for the latest version
3. If it doesn't start automatically, click on the download link for Windows

## Step 2: Install Git for Windows

1. Run the downloaded installer
2. Click "Next" on the license screen
3. Choose the installation location (default is fine) and click "Next"
4. On the component selection screen, ensure these options are checked:
   - Git Bash
   - Git GUI
   - Git LFS (Large File Support)
   - Associate .git* files with default editor
   - Associate .sh files to be run with Bash
   - Add a Git Bash Profile to Windows Terminal
   - Check daily for Git for Windows updates
5. Click "Next"

6. Select "Git from the command line and also from 3rd-party software" and click "Next"
   - This ensures Git is available from both Git Bash and PowerShell

7. For the SSH executable, select "Use bundled OpenSSH" and click "Next"

8. For HTTPS transport backend, select "Use the native Windows Secure Channel library" and click "Next"

9. For line ending conversions, select "Checkout as-is, commit as-is" and click "Next"
   - This prevents line ending issues between different operating systems

10. For the terminal emulator, select "Use MinTTY" and click "Next"
    - MinTTY provides a better terminal experience on Windows

11. For the default behavior of `git pull`, select "Default" and click "Next"

12. For credential helper, select "Git Credential Manager" and click "Next"

13. For extra options, ensure "Enable file system caching" is checked and click "Next"

14. For experimental options, you can leave them unchecked and click "Install"

15. Wait for the installation to complete and click "Finish"

## Step 3: Configure Git Bash

1. Open Git Bash from the Start menu

2. Set your Git user information (replace with your actual information):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. Configure Git to handle line endings properly:
   ```bash
   git config --global core.autocrlf false
   ```

4. Configure Git to use VS Code as the default editor:
   ```bash
   git config --global core.editor "code --wait"
   ```

5. Configure Git to use VS Code for diff and merge operations:
   ```bash
   git config --global diff.tool vscode
   git config --global difftool.vscode.cmd "code --wait --diff \$LOCAL \$REMOTE"
   git config --global merge.tool vscode
   git config --global mergetool.vscode.cmd "code --wait \$MERGED"
   ```

## Step 4: Configure VS Code to Use Git Bash

1. Open VS Code

2. Press `Ctrl + ,` to open Settings

3. Search for "terminal.integrated.defaultProfile.windows"

4. Click "Edit in settings.json"

5. Add or modify the setting to use Git Bash:
   ```json
   {
     "terminal.integrated.defaultProfile.windows": "Git Bash"
   }
   ```

6. Save the file and close it

7. Restart VS Code

## Step 5: Test Git Bash with the Hustle Locator Web App

1. Open VS Code

2. Open the Hustle Locator Web App project folder

3. Press `` Ctrl + ` `` to open the integrated terminal (it should now be Git Bash)

4. Navigate to the project directory:
   ```bash
   cd hustle-platform
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. You should now be able to use command chaining with `&&`:
   ```bash
   cd hustle-platform && npm run dev
   ```

## Troubleshooting

### If Git Bash doesn't appear in VS Code terminal options:

1. Open VS Code Settings
2. Search for "terminal.integrated.profiles.windows"
3. Click "Edit in settings.json"
4. Add Git Bash to the profiles:
   ```json
   "terminal.integrated.profiles.windows": {
     "Git Bash": {
       "path": "C:\\Program Files\\Git\\bin\\bash.exe",
       "args": []
     }
   }
   ```
   Note: Your Git installation path might be different. Adjust accordingly.

### If npm commands don't work in Git Bash:

1. Ensure Node.js is installed properly
2. Try running:
   ```bash
   npm config set script-shell "C:\\Program Files\\Git\\bin\\bash.exe"
   ```

### If you encounter permission issues:

1. Try running Git Bash as administrator
2. Check file permissions in your project directory

## Additional Tips

1. **Customize Git Bash appearance**:
   - Right-click on the Git Bash title bar
   - Select "Options"
   - Customize colors, fonts, and behavior

2. **Learn Bash shortcuts**:
   - Tab completion: Press Tab to auto-complete commands and file names
   - Command history: Press Up/Down arrows to navigate through previous commands
   - Ctrl+R: Search command history

3. **Add aliases for common commands**:
   Open `~/.bashrc` in Git Bash and add:
   ```bash
   alias gs='git status'
   alias gp='git pull'
   alias nrd='npm run dev'
   ```
   Then run `source ~/.bashrc` to apply changes

4. **Enable Git Bash context menu**:
   If you didn't enable it during installation, you can add "Git Bash Here" to your context menu by running the Git installer again and selecting this option.
