// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class MyDebugConfigurationProvider implements vscode.DebugConfigurationProvider {

	/**
	 * Massage a debug configuration just before a debug session is being launched,
	 * e.g. add all missing attributes to the debug configuration.
	 */
	 resolveDebugConfiguration(folder: vscode.WorkspaceFolder | undefined, config: vscode.DebugConfiguration, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.DebugConfiguration> {

		// if launch.json is missing or empty
		return (async () => {
			const items = [
				'--debug-collisions',
				'--debug-paths',
				'--debug-navigation',
				'--debug-avoidance',
				'--debug-canvas-item-redraw',
				'--debug-stringnames',
			];
			const options: vscode.QuickPickOptions & { canPickMany: true; } = { title: "args", canPickMany: true };
			const selectedItems: string[] | undefined = await vscode.window.showQuickPick(items, options);


			if(selectedItems) {
				const args: string[] = config.args ?? [];
				args.push(...selectedItems);
			}
	
			return config;
		})();
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ppgame" is now active!');
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('cppvsdbg', new MyDebugConfigurationProvider()));
}

// This method is called when your extension is deactivated
export function deactivate() {}
