import React from 'react';

/**
 * The signature object: a die-cut HDPE bag drawn in code. The handle slot is a
 * real hole (CSS mask), so whatever sits behind the bag shows through it.
 * `story` adds the parts the hero animates (die, chip, registration marks,
 * colour bar); `anim` tags them with the hero's paused-until-seen class.
 */
type BagProps = {
  size?: 'lg' | 'sm' | 'xs';
  story?: boolean;
  copies?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  'aria-hidden'?: boolean;
};

const RegMark = ({ n, anim }: { n: 1 | 2 | 3 | 4; anim?: boolean }) => (
  <svg
    className={`v2-bag__reg v2-bag__reg--${n}${anim ? ' v2-a' : ''}`}
    viewBox="0 0 22 22"
    aria-hidden="true"
    style={{ '--d': `${0.3 + (n - 1) * 0.09}s` } as React.CSSProperties}
  >
    <circle cx="11" cy="11" r="6.5" pathLength={1} />
    <path d="M0 11H22M11 0V22" pathLength={1} />
  </svg>
);

const Bag = ({ size = 'lg', story = false, copies = false, className = '', style, children, 'aria-hidden': ariaHidden }: BagProps) => {
  const sizeClass = size === 'sm' ? ' v2-bag--sm' : size === 'xs' ? ' v2-bag--xs' : '';
  const a = story ? ' v2-a' : '';
  return (
    <div className={`v2-bag${sizeClass} ${className}`} style={style} aria-hidden={ariaHidden || undefined}>
      {copies && (
        <>
          <div className="v2-bag__copy v2-bag__copy--2" aria-hidden="true" />
          <div className="v2-bag__copy v2-bag__copy--1" aria-hidden="true" />
        </>
      )}
      <span className="v2-bag__ply" aria-hidden="true" />
      <div className={`v2-bag__shadow${a}`}>
        <div className={`v2-bag__panel v2-jolt${a}`}>
          <span className={`v2-bag__seal v2-bag__seal--s${a}`} aria-hidden="true" />
          <span className={`v2-bag__seal v2-bag__seal--e${a}`} aria-hidden="true" />
          <span className="v2-bag__rib" aria-hidden="true" />
          <span className="v2-bag__patch" aria-hidden="true">
            {story && <span className={`v2-bag__patch-sheen${a}`} />}
          </span>
          {story && (
            <>
              <RegMark n={1} anim />
              <RegMark n={2} anim />
              <RegMark n={3} anim />
              <RegMark n={4} anim />
              <span className="v2-bag__bar" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <i key={i} className="v2-a" style={{ '--d': `${1.05 + i * 0.08}s` } as React.CSSProperties} />
                ))}
              </span>
            </>
          )}
          <div className="v2-bag__print">{children}</div>
        </div>
      </div>
      {story && (
        <div className="v2-bag__at-slot" aria-hidden="true">
          <span className={`v2-bag__chip${a}`} />
          <span className={`v2-bag__die${a}`} />
        </div>
      )}
    </div>
  );
};

export default Bag;
