import { projects } from '../data';
import { useReveal } from '../hooks';

const Projects = () => {
  const [ref, cls] = useReveal();

  return (
    <section className="section section--alt" id="builds" ref={ref}>
      <div className={`wrap ${cls}`}>
        <div className="sec-head">
          <p className="eyebrow">Selected builds</p>
          <h2 className="h2">Systems built end to end.</h2>
          <p className="body">
            Five builds outside client work — forecasting, distributed services,
            conversational AI and secure cloud architecture. Each one needed both
            a data model and something a person could actually use.
          </p>
        </div>

        {projects.map((p, i) => (
          <article className="build" key={p.name}>
            <div className="build__head">
              <h3 className="h3 build__title">{p.name}</h3>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
            </div>

            <div className="build__grid">
              <div>
                <div className="field">
                  <p className="field__k">Context</p>
                  <p className="field__v">{p.role}</p>
                </div>
                {p.date && (
                  <div className="field">
                    <p className="field__k">Period</p>
                    <p className="field__v">{p.date}</p>
                  </div>
                )}
              </div>

              <div className="field">
                <p className="field__k">What I built</p>
                <div className="field__list">
                  {p.bullets.map((b) => (
                    <p className="field__v" key={b}>{b}</p>
                  ))}
                </div>
              </div>

              <div className="field field--tech">
                <p className="field__k">Key technology</p>
                <div className="tags" style={{ marginTop: 0 }}>
                  {p.tech.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
