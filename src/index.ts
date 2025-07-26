import { createTool, ToolCategory, ToolCapability } from '@ziggler/clanker';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Tool state
let currentDirectory: string = process.cwd();

export default createTool()
  .id('bash')
  .name('Bash Command Executor')
  .description('Execute a bash command')
  .category(ToolCategory.System)
  .capabilities(ToolCapability.SystemExecute, ToolCapability.UserConfirmation)
  .tags('bash', 'shell', 'command', 'system')
  
  // Arguments
  .stringArg('command', 'The bash command to execute', { required: true })
  .numberArg('timeout', 'Command timeout in milliseconds', {
    default: 30000,
    validate: (value) => value > 0 || 'Timeout must be positive'
  })
  
  // Initialize
  .onInitialize(async (context) => {
    currentDirectory = context.workingDirectory || process.cwd();
  })
  
  // Execute
  .execute(async (args, context) => {
    const { command, timeout } = args;
    
    context.logger?.debug(`Executing bash command: ${command}`);
    context.logger?.debug(`Working directory: ${currentDirectory}`);
    context.logger?.debug(`Timeout: ${timeout}ms`);
    
    try {
      // Handle cd command specially
      if (command.startsWith('cd ')) {
        const newDir = command.substring(3).trim();
        try {
          process.chdir(newDir);
          currentDirectory = process.cwd();
          
          context.logger?.info(`Changed directory to: ${currentDirectory}`);
          return {
            success: true,
            output: `Changed directory to: ${currentDirectory}`
          };
        } catch (error) {
          context.logger?.error(`Failed to change directory: ${error instanceof Error ? error.message : String(error)}`);
          return {
            success: false,
            error: `Cannot change directory: ${error instanceof Error ? error.message : String(error)}`
          };
        }
      }
      
      // Execute command
      const { stdout, stderr } = await execAsync(command, {
        cwd: currentDirectory,
        timeout,
        maxBuffer: 1024 * 1024
      });
      
      const output = stdout + (stderr ? `\nSTDERR: ${stderr}` : '');
      
      if (stderr) {
        context.logger?.warn(`Command produced stderr output: ${stderr}`);
      }
      
      context.logger?.info(`Command executed successfully`);
      context.logger?.debug(`Output: ${output.substring(0, 200)}${output.length > 200 ? '...' : ''}`);
      
      return {
        success: true,
        output: output.trim() || 'Command executed successfully (no output)'
      };
    } catch (error) {
      context.logger?.error(`Command failed: ${error instanceof Error ? error.message : String(error)}`);
      return {
        success: false,
        error: `Command failed: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  })
  
  // Examples
  .examples([
    {
      description: 'List files in current directory',
      arguments: {
        command: 'ls -la'
      }
    },
    {
      description: 'Run command with custom timeout',
      arguments: {
        command: 'sleep 5 && echo "Done"',
        timeout: 10000
      }
    }
  ])
  
  .build();

// Export utility functions for backward compatibility
export const getCurrentDirectory = (): string => currentDirectory;