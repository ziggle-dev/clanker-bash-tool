# Bash Tool for Clanker

Execute bash commands with user confirmation in Clanker.

## Installation

```bash
clanker install ziggler/bash
```

## Usage

### Basic Example

```bash
clanker -p "use bash to list files in the current directory"
```

### Advanced Example

```bash
clanker -p "use bash to run 'find . -name *.ts | head -5' with a 10 second timeout"
```

## Arguments

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| command | string | Yes | - | The bash command to execute |
| timeout | number | No | 30000 | Command timeout in milliseconds |

## Examples

### Example 1: List Files

```bash
clanker -p "use bash to run 'ls -la'"
```

Expected output:
```
total 16
drwxr-xr-x  5 user  staff   160 Jan  1 12:00 .
drwxr-xr-x 10 user  staff   320 Jan  1 11:00 ..
-rw-r--r--  1 user  staff  1234 Jan  1 12:00 file1.txt
-rw-r--r--  1 user  staff  5678 Jan  1 12:00 file2.txt
drwxr-xr-x  3 user  staff    96 Jan  1 12:00 src
```

### Example 2: Run with Custom Timeout

```bash
clanker -p "use bash to run 'sleep 5 && echo Done' with a 10 second timeout"
```

Expected output:
```
Done
```

### Example 3: Change Directory

```bash
clanker -p "use bash to change to the parent directory"
```

Expected output:
```
Changed directory to: /Users/username/parent
```

## Capabilities

This tool requires the following capabilities:
- SystemExecute: Execute system commands
- UserConfirmation: Request user confirmation before executing commands

## Security

The bash tool will always request user confirmation before executing commands unless:
- The user has approved all bash commands for the session
- The user has approved all operations for the session

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/ziggle-dev/clanker-bash-tool

# Install dependencies
cd clanker-bash-tool
npm install

# Build
npm run build
```

### Testing Locally

```bash
# Test the tool before submission
npm test
```

## Contributing

To contribute to this tool:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

For adding this tool to the official Clanker registry, please open an issue at:
https://github.com/ziggle-dev/clanker-tools

## License

MIT - See LICENSE file for details

## Author

Ziggler ([@ziggle-dev](https://github.com/ziggle-dev))