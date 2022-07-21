export type CommitSummary = {
	sha: string;
	summary: string;
	message?: string;
	author: Record<string, any>;
	shortSha: string;
	avatar?: string;
};

export type CommitDetails = {
	committer: Record<string, any>;
	files?: Record<string, any>[];
	stats?: Record<string, any>;
} & CommitSummary;

export type State = {
	commits: CommitSummary[];
} & Record<string, any>;

export type ShowCommitDetailsPageCommandArgs = string[];
