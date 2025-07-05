#!/bin/bash

# Kill process by port number
kill_port() {
  local port=$1
  local pid=$(netstat -ano | grep ":$port" | grep "LISTENING" | awk '{print $5}')
  if [ -z "$pid" ]; then
    echo "No process found using port $port"
  else
    echo "Killing process $pid using port $port"
    cmd.exe /c "taskkill /F /PID $pid"
  fi
}

# Kill all Node.js processes
kill_node() {
  echo "Killing all Node.js processes"
  cmd.exe /c "taskkill /F /IM node.exe"
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
