import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => (
  <footer
    className="bg-primary border-t border-primary py-6 mt-12"
    aria-labelledby="footerHeading"
  >
    <h2 id="footerHeading" className="sr-only">
      Footer
    </h2>

    <span className="text-footer-icon px-4 lg:px-8 py-8 text-sm">
      Heavily inspired by{` `}
      <a href="https://braydoncoyer.dev">Braydon Coyer&apos;s website</a>
    </span>

    <div className="mt-2  px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
      <div className="flex space-x-6 md:order-2">
        <a
          href="https://twitter.com/IoJcde"
          className="text-footer-icon hover:text-footer-icon-hover"
        >
          <FaTwitter className="h-5 w-5" />
        </a>

        <a
          href="https://github.com/JcdeA"
          className="text-footer-icon hover:text-footer-icon-hover"
        >
          <span className="sr-only">GitHub</span>
          <FaGithub className="h-5 w-5" />
        </a>

        <a
          href="https://www.linkedin.com/in/jeeho-ahn/"
          className="text-footer-icon hover:text-footer-icon-hover"
        >
          <span className="sr-only">LinkedIn</span>
          <FaLinkedin className="h-5 w-5" />
        </a>
      </div>
      <p className="mt-8 text-base text-footer-icon md:mt-0 md:order-1">
        &copy; {new Date().getFullYear()} Jeeho Ahn. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
