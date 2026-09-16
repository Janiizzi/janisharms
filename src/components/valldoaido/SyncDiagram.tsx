import { useState } from 'react';
import { problem } from '../../data/valldoaidoTool';

type SyncDiagramProps = { accent: string };

/**
 * The whole argument for the tool in one picture: four systems each holding
 * their own copy of a wine, against one record that syncs out to them.
 *
 * A toggle rather than a scroll animation, because the two states are meant to
 * be compared back and forth rather than watched once.
 */
const SyncDiagram = ({ accent }: SyncDiagramProps) => {
  const [showAfter, setShowAfter] = useState(false);
  const side = showAfter ? problem.after : problem.before;

  return (
    <div className="rounded-2xl border border-primary-white/15 bg-secondary-background/50 p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em]" style={{ color: showAfter ? accent : '#8a8a8a' }}>
            {side.label}
          </div>
          <div className="mt-1 text-sm text-primary-grey">{side.caption}</div>
        </div>

        <div
          role="group"
          aria-label="Before and after"
          className="flex rounded-full border border-primary-white/20 p-1"
        >
          {[false, true].map(state => (
            <button
              key={String(state)}
              type="button"
              onClick={() => setShowAfter(state)}
              aria-pressed={showAfter === state}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
                showAfter === state
                  ? 'text-primary-background'
                  : 'text-primary-grey hover:text-primary-white'
              }`}
              style={showAfter === state ? { backgroundColor: accent } : undefined}
            >
              {state ? problem.after.label : problem.before.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {showAfter ? (
          <div className="flex flex-col items-center gap-5">
            <div
              className="w-full max-w-xs rounded-xl px-5 py-4 text-center"
              style={{ backgroundColor: accent, color: '#090808' }}
            >
              <div className="text-sm font-bold">{problem.after.hub.label}</div>
              <div className="mt-0.5 text-xs opacity-80">{problem.after.hub.note}</div>
            </div>

            {/* Two-way arrows down to each connected system. */}
            <div className="flex items-center gap-1 text-xs" style={{ color: accent }}>
              <span aria-hidden="true">↑</span>
              <span className="h-8 w-px" style={{ background: accent }} />
              <span aria-hidden="true">↓</span>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
              {problem.after.nodes.map(node => (
                <div
                  key={node.id}
                  className="rounded-xl border bg-primary-background/40 px-4 py-3 text-center"
                  style={{ borderColor: `${accent}55` }}
                >
                  <div className="text-sm font-semibold text-primary-white">{node.label}</div>
                  <div className="mt-1 text-xs leading-snug text-primary-grey">{node.note}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {problem.before.nodes.map(node => (
                <div
                  key={node.id}
                  className="rounded-xl border border-dashed border-primary-white/20 bg-primary-background/40 px-4 py-3 text-center"
                >
                  <div className="text-sm font-semibold text-primary-grey">{node.label}</div>
                  <div className="mt-1 text-xs leading-snug text-primary-grey/60">{node.note}</div>
                </div>
              ))}
            </div>

            <div className="text-center text-xs uppercase tracking-[0.16em] text-primary-grey/60">
              …kept in step by hand
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SyncDiagram;
