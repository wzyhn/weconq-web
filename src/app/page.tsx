import { CopyButton } from "@/components/contact-links";
import { Link } from "@/components/site-controls";
import { site } from "@/data/site";

export default function HomePage() {
  const { collaboration, contact, footer, profile, socialLinks } = site;
  const { wechat, qq } = contact;

  return (
    <div className="shell">
      <header className="masthead">
        <span className="wordmark">{site.wordmark}</span>
        <nav aria-label="页面导航">
          <a href="#contact">联系方式</a>
          <a href="#links">社交账号</a>
        </nav>
      </header>

      <main id="main-content" className="spread">
        <div className="introduction">
          <h1>{profile.headline.map(line => <span key={line}>{line}</span>)}</h1>
          <p className="intro">{profile.intro}</p>
        </div>
        <section className="directions" id="work" aria-label="可以一起做的事">
          {collaboration.directions.map(({ title, description, note }) => (
            <section className="direction" key={title}>
              <h2>{title}</h2>
              <p>{description}</p>
              {note && <p className="free-note">{note}</p>}
            </section>
          ))}
        </section>

        <section className="contact" id="contact" aria-label="联系方式">
          <div className="contact-line">
            <span className="contact-kind">{wechat.label}</span>
            <span className="contact-value">{wechat.value}</span>
            <CopyButton label="复制微信号" value={wechat.value} failureMessage="请长按或选中微信号复制" />
          </div>
          <div className="contact-line">
            <span className="contact-kind">QQ</span>
            <span className="contact-value">{qq}</span>
            <CopyButton label="复制 QQ 号" value={qq} failureMessage="请长按或选中 QQ 号复制" />
          </div>
          <p className="contact-note">{wechat.note}</p>
        </section>
      </main>

      <footer className="site-footer" id="links">
        <div className="account-band">
          <h2>其他账号</h2>
          <ul className="accounts" aria-label="公开账号">
            {socialLinks.map(({ label, value, href }) => (
              <li key={href}>
                <Link href={href} className="social-link">
                  <span className="network">{label}</span>
                  <span className="account-name">{value}</span>
                </Link>
              </li>
            ))}
            {collaboration.searchLinks.map(({ platform, value, action }) => (
              <li className="search-account" key={platform}>
                <span className="network">{platform}</span>
                <span className="account-name">{value}</span>
                <CopyButton label={action} value={value} />
              </li>
            ))}
          </ul>
        </div>
        <div className="colophon">
          <span>{collaboration.availability}</span>
          <Link href={footer.icp.href} rel="noreferrer" target="_blank">{footer.icp.label}</Link>
        </div>
      </footer>
    </div>
  );
}
