import { approach } from '../data';
import { useReveal } from '../hooks';

const Approach = () => {
  const [ref, cls] = useReveal();

  return (
    <section className="section section--alt" id="approach" ref={ref}>
      <div className={`wrap ${cls}`}>
        <div className="sec-head">
          <p className="eyebrow">Approach</p>
          <h2 className="h2">How I think about building things that have to hold up.</h2>
        </div>

        <div className="grid cols-2">
          {approach.map((item, i) => (
            <div className="cell" key={item.title}>
              <p className="num cell__num">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="h3">{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
