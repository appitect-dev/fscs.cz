import Image from "next/image";
import { services } from "@/app/lib/site";
import { serviceIcons } from "@/app/components/icons";

export function Services() {
  return (
    <section id="sluzby" className="relative z-10 bg-surface lg:-mt-32">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-0">
        {/* Ilustrační obrázek – zarovnaný k levému okraji obrazovky, jen na větších displejích */}
        <div className="hidden self-end lg:block">
          <Image
            src="/images/banner/banner-feature.png"
            alt="Požární zabezpečení stavby – únikové značení a hlásič požáru"
            width={591}
            height={700}
            sizes="(min-width: 1024px) 591px, 0px"
            className="h-auto w-full max-w-[591px]"
          />
        </div>

        {/* Karty služeb – pravý okraj zarovnaný k centrálnímu kontejneru */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:py-24 lg:pl-16 lg:pr-[max(1.5rem,calc((100vw-80rem)/2))]">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article key={service.abbr} className="text-center sm:text-left">
                <Icon
                  strokeWidth={1.75}
                  className="mx-auto h-11 w-11 text-brand sm:mx-0"
                />
                <div className="mt-5 flex items-center justify-center gap-2 sm:justify-start">
                  <h3 className="text-2xl font-bold text-ink">{service.title}</h3>
                  <span className="rounded-chip bg-brand/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-brand">
                    {service.abbr}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-body">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
