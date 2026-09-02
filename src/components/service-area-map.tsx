"use client";

import dynamic from "next/dynamic";

const ServiceAreaMapInner = dynamic(() => import("./service-area-map-inner"), {
  ssr: false,
  loading: () => <div className="service-area-map__canvas" aria-hidden />,
});

export function ServiceAreaMap() {
  return (
    <figure className="service-area-map">
      <ServiceAreaMapInner />
      <figcaption className="service-area-map__caption">
        Twin Cities metro service area, including Minneapolis, St. Paul, the north and east metro, and Chisago County.
      </figcaption>
    </figure>
  );
}
