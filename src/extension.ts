import * as vscode from 'vscode';

class MyDebugConfigurationProvider implements vscode.DebugConfigurationProvider {

	 resolveDebugConfiguration(folder: vscode.WorkspaceFolder | undefined, config: vscode.DebugConfiguration, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.DebugConfiguration> {
		return (async () => {
			const launch_args: string[] | undefined = vscode.workspace.getConfiguration('ppgame').get('launch_args');
			const items = launch_args ?? [];
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

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "ppgame" is now active!');

	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('cppvsdbg', new MyDebugConfigurationProvider()));
}

// This method is called when your extension is deactivated
export function deactivate() {}
