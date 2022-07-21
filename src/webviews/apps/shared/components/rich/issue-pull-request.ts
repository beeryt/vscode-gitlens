import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../formatted-date';
import '../codicon';

@customElement('issue-pull-request')
export class IssuePullRequest extends LitElement {
	static override styles = css`
		.issue-pull-request {
			display: grid;
			gap: 0.25rem 0.5rem;
			justify-content: start;
		}

		a {
			color: var(--color-link-foreground);
		}

		.issue-pull-request__icon {
			grid-column: 1;
			grid-row: 1 / 3;
			color: var(--vscode-gitlens-mergedPullRequestIconColor);
		}

		.issue-pull-request__title {
			grid-column: 2;
			grid-row: 1;
			margin: 0;
			font-size: 1.5rem;
		}

		.issue-pull-request__date {
			grid-column: 2;
			grid-row: 2;
			margin: 0;
			font-size: 1.2rem;
		}
	`;

	@property()
	url = '';

	@property()
	name = '';

	@property()
	date = '';

	@property()
	status = 'merged';

	@property()
	key = '#1999';

	override render() {
		return html`
			<div class="issue-pull-request">
				<span class="issue-pull-request__icon"><code-icon icon="git-merge"></span></span>
				<p class="issue-pull-request__title">
					<a href="${this.url}">${this.name}</a>
				</p>
				<p class="issue-pull-request__date">
					${this.key} ${this.status}
					<formatted-date date="${this.date}"></formatted-date>
				</p>
			</div>
		`;
	}
}
