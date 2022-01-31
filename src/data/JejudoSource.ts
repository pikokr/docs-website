import DocsSource from './DocsSource';

const branchBlacklist = new Set(['docs', 'webpack', 'v8']);
export default new DocsSource({
	id: 'jejudo',
	name: 'Jejudo',
	global: 'Jejudo',
	docsRepo: 'pikokr/docs',
	repo: 'pikokr/jejudo',
	defaultTag: 'stable',
	branchFilter: (branch: string) => !branchBlacklist.has(branch) && !branch.startsWith('dependabot/'),
});
