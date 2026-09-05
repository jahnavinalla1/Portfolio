import { experience } from '../data';
import { useReveal } from '../hooks';

const Experience = () => {
  const [ref, cls] = useReveal();

  return (
    <section className="section" id="work" ref={ref}>
      <div className={`wrap ${cls}`}>
        <div className="sec-head">
          <p className="eyebrow">Experience</p>
          <h2 className="h2">Where the work has been.</h2>
          <p className="body">
            Three roles across a compliance platform, a services team and an
            enterprise mobile product — front end, API and pipeline in each.
          </p>
        </div>

        <div className="xp">
          {experience.map((job, i) => (
            <article className="xp__row" key={`${job.company}-${i}`}>
              <div>
                <h3 className="xp__co">{job.company}</h3>
                <div className="xp__meta">
                  <span className="xp__role">{job.role}</span>
                  <span className="xp__date">{job.date}</span>
                  {job.location && <span className="xp__date">{job.location}</span>}
                </div>
              </div>

              <div>
                <div className="xp__bullets">
                  {job.bullets.map((b) => (
                    <p className="xp__bullet" key={b}><span>{b}</span></p>
                  ))}
                </div>
                <div className="tags">
                  {job.tech.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
