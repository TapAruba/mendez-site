import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Image
              src="images/logo-white.png"
              alt="Méndez Estates Aruba"
              width={120}
              height={36}
              className="h-8 w-auto object-contain"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Two private luxury villas in Aruba — hosted personally by Ana Méndez.
            </p>
          </div>

          <div>
            <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/40">
              Pages
            </div>
            <ul className="mt-4 space-y-2">
              {[
                ["Properties", "/the-property"],
                ["Car Rental", "/car-rental"],
                ["Experiences", "/experiences"],
                ["About Ana", "/about"],
                ["Book Now", "/book-now"],
                ["Policies", "/policies"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/40">
              Contact
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:mendezestatesaruba@gmail.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  mendezestatesaruba@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2975924433"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  WhatsApp: +297 592 4433
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center font-sans text-[10px] uppercase tracking-[0.16em] text-white/30">
          © Méndez Estates Aruba · Aruba
        </div>
      </div>
    </footer>
  );
}
