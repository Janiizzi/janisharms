import { useState } from 'react';
import { problem } from '../../data/valldoaidoTool';

type SyncDiagramProps = { accent: string };

type PersistentSlot = {
  kind: 'persistent';
  id: string;
  label: string;
  beforeNote: string;
  afterNote: string;
};

type SwapSlot = {
  kind: 'swap';
  id: string;
  before: { label: string; note: string };
  after: { label: string; note: string };
};

// Systems present on both sides (Bexio, Shopify) morph in place; systems that
// only exist on one side (Excel/Desktop folders before, Media store/PDF
// export after) share a slot and crossfade into each other. Built from the
// data model so the diagram never drifts from problem.before / problem.after.
const sharedIds = problem.before.nodes
  .map(node => node.id)
  .filter(id => problem.after.nodes.some(node => node.id === id));

const beforeOnly = problem.before.nodes.filter(node => !sharedIds.includes(node.id));
const afterOnly = problem.after.nodes.filter(node => !sharedIds.includes(node.id));

const slots: Array<PersistentSlot | SwapSlot> = [
  ...sharedIds.map((id): PersistentSlot => {
    const before = problem.before.nodes.find(node => node.id === id)!;
    const after = problem.after.nodes.find(node => node.id === id)!;
    return { kind: 'persistent', id, label: before.label, beforeNote: before.note, afterNote: after.note };
  }),
  ...beforeOnly.map(
    (before, i): SwapSlot => ({
      kind: 'swap',
      id: `${before.id}-${afterOnly[i].id}`,
      before,
      after: afterOnly[i],
    }),
  ),
];

const EASE = 'cubic-bezier(0.22,1,0.36,1)';

/**
 * The whole argument for the tool in one picture: four systems each holding
 * their own copy of a wine, against one record that syncs out to them.
 *
 * A toggle rather than a scroll animation, because the two states are meant
 * to be compared back and forth rather than watched once. Shared systems
 * morph in place, the other two crossfade, and the hub grows out from the
 * centre with its connectors drawing in behind it.
 */
const SyncDiagram = ({ accent }: SyncDiagramProps) => {
  const [showAfter, setShowAfter] = useState(false);
  const side = showAfter ? problem.after : problem.before;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div
            className="text-xs uppercase tracking-[0.18em] transition-colors duration-500"
            style={{ color: showAfter ? accent : '#8a8a8a' }}
          >
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
                showAfter === state ? 'text-primary-background' : 'text-primary-grey hover:text-primary-white'
              }`}
              style={showAfter === state ? { backgroundColor: accent } : undefined}
            >
              {state ? problem.after.label : problem.before.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hub + bus line. Collapses to nothing in "before" via a 0fr/1fr grid
          row, since the hub's text can wrap and its height isn't fixed. */}
      <div
        className="grid transition-[grid-template-rows] duration-700"
        style={{ gridTemplateRows: showAfter ? '1fr' : '0fr', transitionTimingFunction: EASE }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col items-center pt-8">
            <div
              className="w-full max-w-xs rounded-xl px-5 py-4 text-center transition-all duration-500"
              style={{
                backgroundColor: accent,
                color: '#090808',
                opacity: showAfter ? 1 : 0,
                transform: showAfter ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.9)',
                transitionDelay: showAfter ? '150ms' : '0ms',
                boxShadow: showAfter ? `0 0 40px -8px ${accent}99` : `0 0 0px 0px ${accent}00`,
                transitionTimingFunction: EASE,
              }}
            >
              <div className="text-sm font-bold">{problem.after.hub.label}</div>
              <div className="mt-0.5 text-xs opacity-80">{problem.after.hub.note}</div>
            </div>

            {/* Spans from the horizontal centre of the first grid column to
                the centre of the last one, so it lines up with the outer
                ticks below regardless of column count or viewport width. */}
            <div
              className="mt-3 h-px self-stretch mx-[25%] lg:mx-[12.5%]"
              style={{
                background: accent,
                transform: `scaleX(${showAfter ? 1 : 0})`,
                transitionProperty: 'transform',
                transitionDuration: '500ms',
                transitionTimingFunction: EASE,
                transitionDelay: showAfter ? '280ms' : '120ms',
              }}
            />
          </div>
        </div>
      </div>

      {/* Systems grid. Sits closer to the bus line in "after" so the ticks
          read as a continuation of it rather than a floating gap. */}
      <div
        className="grid grid-cols-2 gap-3 transition-[margin-top] duration-500 lg:grid-cols-4"
        style={{ marginTop: showAfter ? '0.5rem' : '1.5rem', transitionTimingFunction: EASE }}
      >
        {slots.map((slot, i) => {
          const tickDelay = showAfter ? 380 + i * 70 : i * 40;
          const cardDelay = showAfter ? 120 + i * 60 : i * 30;

          return (
            <div key={slot.id} className="flex flex-col items-center">
              <div
                className="relative w-px overflow-hidden"
                style={{
                  height: showAfter ? '1rem' : '0px',
                  background: `${accent}70`,
                  transitionProperty: 'height',
                  transitionDuration: '400ms',
                  transitionTimingFunction: EASE,
                  transitionDelay: `${tickDelay}ms`,
                }}
              >
                <span
                  className="sync-flow-dot absolute inset-x-0 top-0 block h-3 w-px"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`,
                    animationPlayState: showAfter ? 'running' : 'paused',
                    animationDelay: `${tickDelay + 400}ms`,
                  }}
                />
              </div>

              <div
                className={`relative flex h-[104px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-primary-background/40 px-3 text-center transition-colors duration-500 ${
                  showAfter ? 'border-solid' : 'border-dashed'
                }`}
                style={{
                  borderColor: showAfter ? `${accent}55` : 'rgba(255,255,255,0.2)',
                  transitionDelay: `${cardDelay}ms`,
                }}
              >
                {slot.kind === 'persistent' ? (
                  <>
                    <div
                      className="text-sm font-semibold transition-colors duration-500"
                      style={{ color: showAfter ? '#ffffff' : 'var(--primary-grey)', transitionDelay: `${cardDelay}ms` }}
                    >
                      {slot.label}
                    </div>
                    <div className="relative mt-1 h-9 w-full text-xs leading-snug">
                      <span
                        className="absolute inset-x-0 top-0 transition-opacity duration-[400ms]"
                        style={{ opacity: showAfter ? 0 : 1, color: 'rgba(176,175,175,0.6)', transitionDelay: `${cardDelay}ms` }}
                      >
                        {slot.beforeNote}
                      </span>
                      <span
                        className="absolute inset-x-0 top-0 text-primary-grey transition-opacity duration-[400ms]"
                        style={{ opacity: showAfter ? 1 : 0, transitionDelay: `${cardDelay}ms` }}
                      >
                        {slot.afterNote}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="relative h-[52px] w-full">
                    <div
                      className="absolute inset-0 transition-all duration-[400ms]"
                      style={{
                        opacity: showAfter ? 0 : 1,
                        transform: showAfter ? 'translateY(-6px)' : 'translateY(0)',
                        transitionDelay: `${cardDelay}ms`,
                      }}
                    >
                      <div className="text-sm font-semibold text-primary-grey">{slot.before.label}</div>
                      <div className="mt-1 text-xs leading-snug text-primary-grey/60">{slot.before.note}</div>
                    </div>
                    <div
                      className="absolute inset-0 transition-all duration-[400ms]"
                      style={{
                        opacity: showAfter ? 1 : 0,
                        transform: showAfter ? 'translateY(0)' : 'translateY(6px)',
                        transitionDelay: `${cardDelay}ms`,
                      }}
                    >
                      <div className="text-sm font-semibold text-primary-white">{slot.after.label}</div>
                      <div className="mt-1 text-xs leading-snug text-primary-grey">{slot.after.note}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mt-5 text-center text-xs uppercase tracking-[0.16em] text-primary-grey/60 transition-opacity duration-500"
        style={{ opacity: showAfter ? 0 : 1 }}
      >
        …kept in step by hand
      </div>
    </div>
  );
};

export default SyncDiagram;
