import * as vscode from 'vscode';

class MyDebugConfigurationProvider implements vscode.DebugConfigurationProvider {

	 resolveDebugConfiguration(folder: vscode.WorkspaceFolder | undefined, config: vscode.DebugConfiguration, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.DebugConfiguration> {
		return (async () => {
			const launch_args: Object[] | undefined = vscode.workspace.getConfiguration('ppgame').get('launch_args');
			if (launch_args !== undefined) {
				for (let i = 0; i < launch_args.length; ++i) {
					const launch_arg: Object = launch_args[i];
					if (launch_arg !== undefined && 'launchs' in launch_arg && 'args' in launch_arg) {
						const launchs: string[] = launch_arg['launchs'] as any as string[];
						if (launchs?.includes(config.name)) {
							const args: string[] = launch_arg['args'] as any as string[];
							if (args?.length > 0) {
								const options: vscode.QuickPickOptions & { canPickMany: true; } = { title: "args", canPickMany: true };
								const selectedItems: string[] | undefined = await vscode.window.showQuickPick(args, options);
								if (selectedItems) {
									const args: string[] = config.args ?? [];
									args.push(...selectedItems);
								}

								return config;
							}
						}
					}
				}
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
