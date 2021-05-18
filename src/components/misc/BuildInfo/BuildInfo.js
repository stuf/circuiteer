export function BuildInfo() {
  const appName = process.env.REACT_APP_appName;
  const branch = process.env.REACT_APP_branch;
  const commit = process.env.REACT_APP_commit;

  const hasAny = [appName, branch, commit].some(a => a);

  return hasAny ? (
    <div className="absolute left-0 bottom-0 px-4 py-2 text-xs text-gray-500 flex space-x-1">
      {appName && <span>{appName}</span>}
      {branch && <span>{branch}</span>}
      {commit && <span>{commit.slice(0, 8)}</span>}
    </div>
  ) : null;
}
