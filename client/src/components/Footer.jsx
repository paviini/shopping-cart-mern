function Footer() {
  return (
    <footer className="site-footer">
      <hr />
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} Shopping Cart</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;