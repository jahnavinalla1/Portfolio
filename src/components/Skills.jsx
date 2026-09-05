import { skills, operatingRange } from '../data';
import { useReveal } from '../hooks';

const Skills = () => {
  const [ref, cls] = useReveal();

  return (
    <section className="section" id="stack" ref={ref}>
      <div className={`wrap ${cls}`}>
        <div className="sec-head">
          <p className="eyebrow">Operating range</p>
          <h2 className="h2">What I build across.</h2>
        </div>

        <div className="grid cols-3" style={{ marginBottom: 'clamp(32px, 4vw, 52px)' }}>
          {operatingRange.map((item, i) => (
            <div
              className={`cell${i === operatingRange.length - 1 && operatingRange.length % 3 === 2 ? ' cell--fill' : ''}`}
              key={item.title}
            >
              <p className="num cell__num">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="h4" style={{ marginBottom: 10 }}>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>

        <div className="grid cols-2">
          {skills.map((group, i) => (
            <div
              className={`stack${i === skills.length - 1 && skills.length % 2 === 1 ? ' stack--fill' : ''}`}
              key={group.category}
            >
              <p className="stack__k">{group.category}</p>
              <p className="stack__v">{group.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
