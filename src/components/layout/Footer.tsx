import Link from "next/link";
import Facebook from "../svg/Facebook";
import Logo from "../svg/Logo";
import Youtube from "../svg/Youtube";
import Instagram from "../svg/Instagram";

const Footer = () => {
  return (
    <div className="relative mx-auto flex flex-col justify-between px-4 md:px-9 mt-24 mb-4">
      <div className="flex justify-between flex-wrap gap-y-8">
        <div className="flex flex-col gap-y-6">
          <Logo />
          <p className="max-w-[320px] w-full text-text-secondary  text-base">
            Premium real estate services designed for the modern lifestyle. We
            make finding your home simple and elegant.
          </p>
          <div className="flex gap-6 items-center">
            <Link
              href="https://www.facebook.com"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Facebook"
            >
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram />
            </Link>
            <Link
              href="https://www.youtube.com"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Youtube"
            >
              <Youtube />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <p className="text-text-default text-lg  font-semibold">Company</p>
          <div className="flex flex-col gap-y-4">
            <Link href="/about" className="text-lg  text-text-secondary">
              About us
            </Link>
            <Link href="/careers" className="text-lg  text-text-secondary">
              Careers
            </Link>
            <Link href="/team" className="text-lg  text-text-secondary">
              Our Team
            </Link>
            <Link href="/press" className="text-lg  text-text-secondary">
              Press
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <p className="text-text-default text-lg font-semibold">Services</p>
          <div className="flex flex-col gap-y-4">
            <Link href="/buy" className="text-lg  text-text-secondary">
              Buy a home
            </Link>
            <Link href="/sell" className="text-lg  text-text-secondary">
              Sell a property
            </Link>
            <Link href="/rentals" className="text-lg  text-text-secondary">
              Rentals
            </Link>
            <Link href="/consulting" className="text-lg  text-text-secondary">
              Consulting
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <p className="text-text-default text-lg  font-semibold">Contact</p>
          <div className="flex flex-col gap-y-4">
            <p className="text-lg  text-text-secondary">
              123 Real Estate BLVD, NY
            </p>
            <a href="tel:+1123567890" className="text-lg  text-text-secondary">
              +1 (123) 567-890
            </a>
            <a
              href="mailto:Hello@nest.com"
              className="text-lg  text-text-secondary"
            >
              Hello@nest.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
