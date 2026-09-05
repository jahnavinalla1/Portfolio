import { about, stats, education, certifications, profile } from '../data';
import { useReveal } from '../hooks';

// The résumé list mixes credentials with personal notes; the personal ones are
// already covered in the prose above, so only the credentials are listed here.
const CREDENTIALS = certifications.filter(
  (c) => !/^(Interests|Fun fact|Superpower)/i.test(c)
);

const About = () => {
  const [ref, cls] = useReveal();

  return (
    <section className="section section--alt" id="about" ref={ref}>
      <div className={`wrap ${cls}`}>
        <div className="sec-head">
          <p className="eyebrow">About</p>
          <h2 className="h2">Built in {about.location}.</h2>
        </div>

        <div className="about__grid">
          <div>
            <p className="mono" style={{ marginBottom: 20 }}>
              {profile.name} — {about.location}
            </p>
            {about.paragraphs.map((p) => (
              <p className="body" key={p.slice(0, 24)}>{p}</p>
            ))}

            <div style={{ marginTop: 'clamp(28px, 3vw, 40px)' }}>
              <p className="eyebrow" style={{ marginBottom: 18 }}>Currently</p>
              <p className="body">{about.now}</p>
            </div>
          </div>

          <div>
            <div className="grid cols-2">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <p className="stat__v">{s.value}</p>
                  <p className="stat__k">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="eyebrow" style={{ margin: 'clamp(30px, 3.4vw, 44px) 0 18px' }}>Education</p>
            <div>
              {education.map((e) => (
                <div className="edu__row" key={e.school}>
                  <p className="edu__school">{e.school}</p>
                  <p className="edu__degree">{e.degree}</p>
                  <p className="edu__date">{e.date}</p>
                </div>
              ))}
            </div>

            <p className="eyebrow" style={{ margin: 'clamp(30px, 3.4vw, 44px) 0 16px' }}>
              Certifications &amp; involvement
            </p>
            <div className="tags" style={{ marginTop: 0 }}>
              {CREDENTIALS.map((c) => <span className="tag" key={c}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
