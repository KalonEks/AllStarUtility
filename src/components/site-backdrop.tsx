export function SiteBackdrop() {
  return (
    <div aria-hidden className="site-backdrop pointer-events-none fixed inset-0 -z-10">
      <div className="site-backdrop__orb site-backdrop__orb--red" />
      <div className="site-backdrop__orb site-backdrop__orb--blue" />
      <div className="site-backdrop__orb site-backdrop__orb--white" />
    </div>
  );
}
