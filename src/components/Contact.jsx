import { profile } from '../data';
import { useReveal } from '../hooks';

const handle = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const Contact = () => {
  const [ref, cls] = useReveal();

  const rows = [
    { k: 'Email', v: profile.email, href: `mailto:${profile.email}` },
    { k: 'LinkedIn', v: handle(profile.linkedin), href: profile.linkedin, ext: true },
    { k: 'GitHub', v: handle(profile.github), href: profile.github, ext: true },
    { k: 'Phone', v: profile.phone, href: `tel:${profile.phone.replace(/[^\d+]/g, '')}` },
    { k: 'Résumé', v: 'Jahnavi_Nalla_Resume.pdf', href: '/resume.pdf', download: true },
  ];

  return (
    <section className="section" id="contact" ref={ref}>
      <div className={`wrap ${cls}`}>
        <div className="sec-head">
          <p className="eyebrow">Contact</p>
          <h2 className="h2">Open to engineering roles and interesting problems.</h2>
          <p className="body">
            Happy to talk about telemetry systems, API design, AI features with
            real guardrails — or anything you are trying to make more reliable.
          </p>
        </div>

        {rows.map((r) => (
          <a
            className="contact__row"
            key={r.k}
            href={r.href}
            {...(r.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
            {...(r.download ? { download: 'Jahnavi_Nalla_Resume.pdf' } : {})}
          >
            <span>
              <span className="contact__k" style={{ display: 'block' }}>{r.k}</span>
              <span className="contact__v">{r.v}</span>
            </span>
            <span className="contact__arrow">{r.download ? '↓' : '↗'}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
