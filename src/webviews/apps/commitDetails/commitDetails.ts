/*global*/
import { CommitSummary, State } from '../../commitDetails/protocol';
import { App } from '../shared/appBase';
import './commitDetails.scss';
import '../shared/components/codicon';
import '../shared/components/commit/commit-identity';
import '../shared/components/formatted-date';
import '../shared/components/commit/file-change-item';
import '../shared/components/rich/issue-pull-request';
import '../shared/components/skeleton-loader';

export class CommitDetailsApp extends App<State> {
	constructor() {
		super('CommitDetailsApp');
		console.log('CommitDetailsApp', this.state);
	}

	override onInitialize() {
		console.log('CommitDetailsApp onInitialize', this.state);
		this.renderContent(false);
	}

	renderContent(init = false) {
		this.renderTitle();
		this.renderMessage();
		this.renderCommitter();
		this.renderAuthor();
		this.renderFiles();
		this.renderChoices();

		if (!init) {
			this.renderPullRequest();
			this.renderIssues();
		}
	}

	renderChoices() {
		const $el = document.querySelector<HTMLElement>('[data-region="choices"]');
		if ($el == null) {
			return;
		}

		if (this.state.commits.length > 1) {
			const $count = $el.querySelector<HTMLElement>('[data-region="choices-count"]');
			if ($count != null) {
				$count.innerHTML = `${this.state.commits.length}`;
			}

			const $list = $el.querySelector<HTMLElement>('[data-region="choices-list"]');
			if ($list != null) {
				$list.innerHTML = this.state.commits
					.map(
						(item: CommitSummary) => `
							<li class="commit-detail-panel__commit">
								<button class="commit-detail-panel__commit-button" type="button" ${
									item.sha === this.state.selected.sha ? 'aria-current="true"' : ''
								}>
									<img src="${item.avatar}" alt="${item.author.name}" />
									<span>${item.message}</span>
									<span>${item.shortSha}</span>
								</button>
							</li>
						`,
					)
					.join('');
			}
			$el.setAttribute('aria-hidden', 'false');
		} else {
			$el.setAttribute('aria-hidden', 'true');
		}
	}

	renderFiles() {
		const $el = document.querySelector<HTMLElement>('[data-region="files"]');
		if ($el == null) {
			return;
		}

		if (this.state.selected.files?.length > 0) {
			$el.innerHTML = this.state.selected.files
				.map(
					(file: Record<string, any>) => `
						<li class="change-list__item">
							<file-change-item status="${file.status}" path="${file.path}"></file-change-item>
						</li>
					`,
				)
				.join('');
			$el.setAttribute('aria-hidden', 'false');
		} else {
			$el.innerHTML = '';
		}
	}

	renderAuthor() {
		const $el = document.querySelector<HTMLElement>('[data-region="author"]');
		if ($el == null) {
			return;
		}

		if (this.state.selected.author != null) {
			$el.innerHTML = `
				<commit-identity
					name="${this.state.selected.author.name}"
					email="${this.state.selected.author.email}"
					date="${this.state.selected.author.date}"
					avatar="${this.state.selected.author.avatar}"
				></commit-identity>
			`;
			$el.setAttribute('aria-hidden', 'false');
		} else {
			$el.innerHTML = '';
			$el.setAttribute('aria-hidden', 'true');
		}
	}

	renderCommitter() {
		const $el = document.querySelector<HTMLElement>('[data-region="committer"]');
		if ($el == null) {
			return;
		}

		if (this.state.selected.committer != null) {
			$el.innerHTML = `
				<commit-identity
					name="${this.state.selected.committer.name}"
					email="${this.state.selected.committer.email}"
					date="${this.state.selected.committer.date}"
					avatar="${this.state.selected.committer.avatar}"
					committer
				></commit-identity>
			`;
			$el.setAttribute('aria-hidden', 'false');
		} else {
			$el.innerHTML = '';
			$el.setAttribute('aria-hidden', 'true');
		}
	}

	renderTitle() {
		const $el = document.querySelector<HTMLElement>('[data-region="commit-title"]');
		if ($el != null) {
			$el.innerHTML = this.state.selected.shortSha;
		}
	}

	renderMessage() {
		const $el = document.querySelector<HTMLElement>('[data-region="message"]');
		if ($el != null) {
			$el.innerHTML = this.state.selected.message;
		}
	}

	renderPullRequest() {
		const $el = document.querySelector<HTMLElement>('[data-region="pull-request"]');
		if ($el == null) {
			return;
		}

		if (this.state.pullRequest != null) {
			$el.innerHTML = `
				<issue-pull-request
					name="${this.state.pullRequest.title}"
					url="${this.state.pullRequest.url}"
					key="${this.state.pullRequest.id}"
					status="${this.state.pullRequest.state}"
					date="${this.state.pullRequest.date}"
				></issue-pull-request>
			`;
			$el.setAttribute('aria-hidden', 'false');
		} else {
			$el.innerHTML = '';
			$el.setAttribute('aria-hidden', 'true');
		}
	}

	renderIssues() {
		const $el = document.querySelector<HTMLElement>('[data-region="issue"]');
		if ($el == null) {
			return;
		}
		if (this.state.issues?.length > 0) {
			$el.innerHTML = this.state.issues
				.map(
					(issue: Record<string, any>) => `
						<issue-pull-request
							name="${issue.title}"
							url="${issue.url}"
							key="${issue.id}"
							status="${(issue.closed as boolean) ? 'closed' : 'opened'}"
							date="${(issue.closed as boolean) ? issue.closedDate : issue.date}"
						></issue-pull-request>
					`,
				)
				.join('');
			$el.setAttribute('aria-hidden', 'false');
		} else {
			$el.innerHTML = '';
			$el.setAttribute('aria-hidden', 'true');
		}
	}

	override onBind() {
		return [];
	}
}

new CommitDetailsApp();
