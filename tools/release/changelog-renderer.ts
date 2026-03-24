import { default as ChangelogRenderer } from 'nx/release/changelog-renderer';
import * as semver from 'semver';
import { readNxJson } from 'nx/src/config/nx-json';
import { findWorkspaceRoot } from 'nx/src/utils/find-workspace-root';
import { interpolate } from 'nx/src/tasks-runner/utils';
import { resolve, join } from 'node:path';
import { readFileSync } from 'node:fs';

const ReleaseStrMap = {
  null: 'Release',
  alpha: 'Alpha',
  beta: 'Beta',
  rc: 'Release Candidate'
} as const;

type ChangelogRendererConfig = ConstructorParameters<typeof ChangelogRenderer>[0];

export default class WorkspaceChangelogRenderer extends ChangelogRenderer {
  protected toRef: string;
  protected fromRef: string;

  constructor(config: ChangelogRendererConfig) {
    super(config);

    const changelog = readFileSync(resolve(__dirname, '../../CHANGELOG.md')).toString();

    this.toRef = this.changelogEntryVersion;
    this.fromRef = changelog.match(/<a name="([^"]+)"><\/a>/)?.[1];
  }

  override renderVersionTitle(): string {
    const prerelease = semver.prerelease(this.changelogEntryVersion)?.[0] ?? null;
    const releaseStr = ReleaseStrMap[prerelease] ?? ReleaseStrMap['rc'];
    const dateStr = new Date().toISOString().slice(0, 10);
    const diffUrl = `https://github.com/briebug/ngrx-auto-entity/compare/${this.fromRef}...${this.toRef}`;
    return `<a name="${this.changelogEntryVersion}"></a>\n\n# [${this.changelogEntryVersion}](${diffUrl}) ${releaseStr} (${dateStr})`;
  }

  override renderBreakingChanges(): string[] {
    const lines = super.renderBreakingChanges();
    lines.splice(0, 1, '### Breaking Changes !!');
    return lines;
  }

  override renderDependencyBumps(): string[] {
    const lines = super.renderDependencyBumps();
    lines.splice(1, 1, '### Package');
    return lines;
  }

  override async renderAuthors(): Promise<string[]> {
    const lines = await super.renderAuthors();
    lines.splice(0, 1, '### Thank You');
    return lines;
  }
}
