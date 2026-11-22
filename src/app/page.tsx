import { CopyButton } from "@/components/contact-links";
import { Link } from "@/components/site-controls";
import { site } from "@/data/site";

export default function HomePage() {
  const { collaboration, contact, footer, profile, socialLinks } = site;
  const { wechat, qq } = contact;

  return (
    <>
      <main className="shell page" id="main-content" aria-labelledby="site-title">
        <h1 id="site-title">{profile.headline}</h1>
        <div className="intro" id="work">
          {profile.intro.map((line) => <p key={line}>{line}</p>)}
          <p className="availability">{collaboration.availability}</p>
        </div>

        <section className="contact" id="contact" aria-label="联系方式">
          <div className="contact-line">
            <span className="contact-value">{wechat.label} {wechat.value}</span>
            <CopyButton label="复制微信号" value={wechat.value} failureMessage="请手动复制微信号" />
          </div>
          <p className="contact-note">{wechat.note}</p>
          {qq && (
            <div className="contact-line">
              <span className="contact-value">QQ {qq}</span>
              <CopyButton label="复制 QQ 号" value={qq} failureMessage="请手动复制 QQ 号" />
            </div>
          )}
        </section>

        <ul className="accounts" id="links" aria-label="公开账号" role="list">
          {socialLinks.map(({ label, value, href }) => (
            <li key={href}>
              <Link href={href}>{label} {value}</Link>
            </li>
          ))}
          {collaboration.searchLinks.map(({ platform, value, action }) => (
            <li className="account-line" key={platform}>
              <span className="account-value">{platform} {value}</span>
              <CopyButton label={action} value={value} />
            </li>
          ))}
        </ul>
      </main>

      <footer className="site-footer">
        <Link href={footer.icp.href} rel="noreferrer" target="_blank">{footer.icp.label}</Link>
      </footer>
    </>
  );
}
