export function PageLoading({ label }: { label: string }) {
  return (
    <main className="v2-loading" aria-busy="true" aria-label={label}>
      <div className="v2-loading-hero"><p role="status">{label}</p></div>
      <div className="site-container v2-loading-copy" aria-hidden="true">
        <div /><div /><div />
      </div>
    </main>
  );
}
