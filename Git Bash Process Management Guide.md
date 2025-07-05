# Git Bash Process Management Guide

## Understanding the Issue

You're encountering a common challenge when using Git Bash on Windows. Here's what's happening:

1. **Mixed Environment**: Git Bash provides a Unix-like shell environment on Windows, but it's running on top of Windows, not replacing it.

2. **Process Isolation**: Windows processes started outside of Git Bash (like your Node.js server) are managed by the Windows process manager, not directly by Git Bash.

3. **Permission Boundaries**: Git Bash doesn't automatically have the same permissions to manage Windows processes as native Windows tools.

## Best Practices for Managing Servers in Git Bash

### Method 1: Use Ctrl+C in the Original Terminal (Recommended)

The cleanest way to stop a server is to use Ctrl+C in the same terminal where you started it:

1. Keep your development server running in a dedicated terminal
2. When you want to stop it, go to that terminal and press Ctrl+C
3. This sends the proper termination signal to the process

### Method 2: Create Bash Aliases for Common Tasks

Add these lines to your `~/.bashrc` file in Git Bash:

```bash
# Open ~/.bashrc in an editor
nano ~/.bashrc

# Add these lines
alias killnode="taskkill //F //IM node.exe"
alias killport="function _kp() { netstat -ano | grep \$1 | awk '{print \$5}' | xargs taskkill //F //PID; }; _kp"

# Save and exit (Ctrl+O, Enter, Ctrl+X)
# Then reload your bashrc
source ~/.bashrc
```

Now you can use:
- `killnode` to kill all Node.js processes
- `killport 3000` to kill whatever is using port 3000

### Method 3: Create a Process Management Script

Create a file called `process-manager.sh` in your project:

```bash
#!/bin/bash

# Kill process by port number
kill_port() {
  local port=$1
  local pid=$(netstat -ano | grep ":$port" | grep "LISTENING" | awk '{print $5}')
  if [ -z "$pid" ]; then
    echo "No process found using port $port"
  else
    echo "Killing process $pid using port $port"
    taskkill //F //PID $pid
  fi
}

# Kill all Node.js processes
kill_node() {
  echo "Killing all Node.js processes"
  taskkill //F //IM node.exe
}

# Show all running Node.js processes
show_node() {
  echo "Running Node.js processes:"
  ps aux | grep node | grep -v grep
}

# Show all listening ports
show_ports() {
  echo "Listening ports:"
  netstat -ano | grep LISTEN
}

# Main command handler
case "$1" in
  "kill-port")
    kill_port $2
    ;;
  "kill-node")
    kill_node
    ;;
  "show-node")
    show_node
    ;;
  "show-ports")
    show_ports
    ;;
  *)
    echo "Usage:"
    echo "  ./process-manager.sh kill-port [PORT]  - Kill process using specific port"
    echo "  ./process-manager.sh kill-node         - Kill all Node.js processes"
    echo "  ./process-manager.sh show-node         - Show all Node.js processes"
    echo "  ./process-manager.sh show-ports        - Show all listening ports"
    ;;
esac
```

Make it executable:
```bash
chmod +x process-manager.sh
```

Then use it:
```bash
./process-manager.sh kill-port 3002
```

## Why Git Bash Doesn't Fully Resolve Syntax Issues

Git Bash provides Unix-like commands on Windows, but:

1. **It's Not a Full Linux Environment**: It's an emulation layer with limitations

2. **Windows-Specific Commands**: Commands like `taskkill` are Windows-specific and need special handling in Git Bash

3. **Process Management Differences**: Windows and Unix have fundamentally different approaches to process management

## Recommended Approach for Your Project

For the Hustle Locator Web App, I recommend:

1. **Use Dedicated Terminals**: Keep your development server in its own terminal tab and use Ctrl+C to stop it

2. **Create Simple Aliases**: Add the aliases mentioned above to your `~/.bashrc` file

3. **Consider Using VS Code's Terminal Integration**: VS Code handles terminal management well and makes it easy to start/stop processes

4. **For Complex Projects**: Consider using a task runner like npm scripts to manage starting and stopping services

## Example npm Scripts for Your Project

Add these to your `package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "kill-dev": "taskkill //F //IM node.exe"
}
```

Then you can use:
```bash
npm run dev     # Start the server
npm run kill-dev # Kill all Node.js processes
