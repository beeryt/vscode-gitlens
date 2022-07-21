import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../codicon';

// TODO: use the model version
const statusTextMap: Record<string, string> = {
	'.': 'Unchanged',
	'!': 'Ignored',
	'?': 'Untracked',
	A: 'Added',
	D: 'Deleted',
	M: 'Modified',
	R: 'Renamed',
	C: 'Copied',
	AA: 'Conflict',
	AU: 'Conflict',
	UA: 'Conflict',
	DD: 'Conflict',
	DU: 'Conflict',
	UD: 'Conflict',
	UU: 'Conflict',
	T: 'Modified',
	U: 'Updated but Unmerged',
};

// TODO: use the model version
const statusCodiconsMap: Record<string, string | undefined> = {
	'.': undefined,
	'!': 'diff-ignored',
	'?': 'diff-added',
	A: 'diff-added',
	D: 'diff-removed',
	M: 'diff-modified',
	R: 'diff-renamed',
	C: 'diff-added',
	AA: 'warning',
	AU: 'warning',
	UA: 'warning',
	DD: 'warning',
	DU: 'warning',
	UD: 'warning',
	UU: 'warning',
	T: 'diff-modified',
	U: 'diff-modified',
};

@customElement('file-change-item')
export class FileChangeItem extends LitElement {
	static override styles = css`
		:host {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
		.change-list__link {
			width: 100%;
			color: inherit;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			text-decoration: none;
		}
		.change-list__path {
			color: var(--color-background--lighten-50);
		}
		.change-list__actions {
			flex: none;
		}
		.change-list__action {
			color: var(--color-link-foreground);
		}
	`;

	@property()
	status = '';

	@property()
	path = '';

	@property()
	repoPath = '';

	override render() {
		const statusName = this.status !== '' ? statusTextMap[this.status] : '';
		const statusIcon = (this.status !== '' && statusCodiconsMap[this.status]) ?? 'file';
		const pathIndex = this.path.lastIndexOf('/');
		const fileName = pathIndex > -1 ? this.path.substring(pathIndex + 1) : this.path;
		const filePath = pathIndex > -1 ? this.path.substring(0, pathIndex) : this.path;

		return html`
			<a class="change-list__link" href="#">
				<span class="change-list__type" aria-label="${statusName}"
					><code-icon icon="${statusIcon}"></code-icon
				></span>
				<span class="change-list__filename">${fileName}</span>
				<small class="change-list__path">${filePath}</small>
			</a>
			<nav class="change-list__actions">
				<a class="change-list__action" href="#" title="Open file" aria-label="Open file"
					><code-icon icon="go-to-file"></code-icon
				></a>
				<a class="change-list__action" href="#" title="Compare" aria-label="Compare"
					><code-icon icon="git-compare"></code-icon
				></a>
				<a class="change-list__action" href="#" title="Open on remote" aria-label="Open on remote"
					><code-icon icon="globe"></code-icon
				></a>
			</nav>
		`;
	}
}
