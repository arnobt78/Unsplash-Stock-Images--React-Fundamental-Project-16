import { MdCopyright } from "react-icons/md";

/**
 * Reusable footer component.
 * Year is generated at runtime so it stays current automatically.
 */
const Footer = () => {
  return (
    <footer className="app-footer">
      <p className="app-footer-text">
        {/* Decorative icon + dynamic year */}
        <MdCopyright className="app-footer-icon" aria-hidden />
        {new Date().getFullYear()} All Reserved.
      </p>
    </footer>
  );
};

export default Footer;
