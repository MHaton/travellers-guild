export default ({
  title,
  subtitle,
  cta,
  ctaHref,
  coverToColour,
  coverFromColour,
}: {
  title: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
  coverToColour: string;
  coverFromColour: string;
}) => (
  <div className={`relative flex flex-col rounded-md bg-gradient-to-br ${coverFromColour} ${coverToColour} p-12 not-prose text-white justify-start items-start overflow-hidden`}>
    <h2 className="text-3xl font-bold mb-4 z-10">{title}</h2>
    <p className="text-lg mb-12 z-10">{subtitle}</p>
    <a
      href={ctaHref}
      className="block bg-slate-900 rounded-md text-white shadow-md hover:shadow-lg px-3 py-2 text-lg unstyled-link font-semibold hover:bg-sky-700 transition z-10"
    >
      {cta} →
    </a>
    <div className="absolute w-[320px] h-[400px] border border-white rounded-lg left-[-80px] bottom-[-200px] transform rotate-[15deg] flex flex-col p-8 gap-4 animate-pulse opacity-40 bg-white/20 z-0">
      {Array.from(Array(20).keys()).map((k) => {
        return (
          <div
            key={k}
            className="rounded-full bg-white w-full border-b border-white"
          />
        );
      })}
    </div>
  </div>
);
