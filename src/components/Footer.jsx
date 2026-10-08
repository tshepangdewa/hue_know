export default function Footer() {
  return (
    <footer>
      <div className="footer-info">
        <h3>Tshepang Dewa</h3>

        <p className="footer-tagline">
          Building useful digital experiences.
        </p>

        <p className="footer-copyright">
          ©2026 Tshepang Dewa. All rights reserved.
        </p>
      </div>

      <div className="footer-social">
        <h3>Social</h3>

        <div className="footer-links">
          <a
            href="https://github.com/tshepangdewa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img
              src="/icons/github.svg"
              alt=""
              className="footer-social-icon"
            />
          </a>

          <a
            href="https://www.instagram.com/tshepang.dewa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img
              src="/icons/instagram.svg"
              alt=""
              className="footer-social-icon"
            />
          </a>

          <a
            href="https://www.linkedin.com/in/tshepang-dewa-601b78270/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img
              src="/icons/linkedin.svg"
              alt=""
              className="footer-social-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}