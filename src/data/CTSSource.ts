import DocsSource from './DocsSource';

const branchBlacklist = new Set(['docs', 'webpack', 'v8']);
export default new DocsSource({
	id: 'command.ts',
	name: 'Command.TS',
	global: 'Command.TS',
	docsRepo: 'pikokr/docs',
	repo: 'pikokr/command.ts',
	defaultTag: 'stable',
	branchFilter: (branch: string) => !branchBlacklist.has(branch) && !branch.startsWith('dependabot/'),
});
