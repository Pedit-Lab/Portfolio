import { useId, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import './PentagonShowcase.css';

interface PentagonItem { id: string; image: string }
interface PentagonShowcaseProps<T extends PentagonItem> {
  items: T[];
  label: (item: T) => string;
  title: (item: T) => string;
  children: (item: T) => ReactNode;
}

/** Five focusable selectors share one detail area without clipping its content. */
export function PentagonShowcase<T extends PentagonItem>({ items, label, title, children }: PentagonShowcaseProps<T>) {
  const [active, setActive] = useState(items[0].id);
  const prefix = useId();
  return <div className="pentagon-showcase">
    <div className="pentagon-stage" role="group" aria-label="Choose an item to explore">
      <svg className="pentagon-connections" viewBox="0 0 560 560" aria-hidden="true">
        <polygon points="280,95 470,230 398,455 162,455 90,230" />
        <polygon className="pentagon-inner" points="280,160 404,250 357,395 203,395 156,250" />
        {[[280,95],[470,230],[398,455],[162,455],[90,230]].map(([x,y]) => <line key={x} x1="280" y1="295" x2={x} y2={y} />)}
        <circle cx="280" cy="295" r="45" />
      </svg>
      <span className="pentagon-center" aria-hidden="true">{String(items.findIndex(item => item.id === active) + 1).padStart(2, '0')}<small>/ 05</small></span>
      {items.map((item, index) => <button
        key={item.id}
        type="button"
        className={`pentagon-node ${active === item.id ? 'is-active' : ''}`}
        style={{ '--node-index': index } as CSSProperties}
        aria-label={title(item)}
        aria-pressed={active === item.id}
        aria-controls={`${prefix}-${item.id}-panel`}
        id={`${prefix}-${item.id}-button`}
        onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(item.id); }}
        onFocus={() => setActive(item.id)}
        onClick={() => setActive(item.id)}
      >
        <span className="pentagon-face"><img src={item.image} alt="" loading="lazy" /><span className="pentagon-label"><small>0{index + 1}</small>{label(item)}</span></span>
      </button>)}
    </div>
    <div className="pentagon-details">
      {items.map(item => <div
        key={item.id}
        id={`${prefix}-${item.id}-panel`}
        role="region"
        aria-labelledby={`${prefix}-${item.id}-button`}
        className="pentagon-panel"
        hidden={active !== item.id}
      >{children(item)}</div>)}
    </div>
  </div>;
}
