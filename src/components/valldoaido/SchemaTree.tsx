import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  metaobjects,
  productFields,
  exampleProduct,
  type SchemaField,
  type FieldType,
} from '../../data/valldoaidoShopify';

const TYPE_LABEL: Record<FieldType, string> = {
  single_line_text: 'text',
  multi_line_text: 'text · multiline',
  rich_text: 'rich text',
  integer: 'integer',
  decimal: 'decimal',
  url: 'url',
  file: 'file',
  file_list: 'file · list',
  reference: 'metaobject',
  reference_list: 'metaobject · list',
};

const isReference = (type: FieldType) => type === 'reference' || type === 'reference_list';

type NodeProps = {
  field: SchemaField;
  accent: string;
  /** Metaobject types already on this branch — used to mark a shared record. */
  ancestry: string[];
  defaultOpen?: boolean;
};

const TreeNode = ({ field, accent, ancestry, defaultOpen = false }: NodeProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const definition = field.refType ? metaobjects[field.refType] : undefined;
  // A reference we have no definition for (grapes) is just shown as a value.
  const expandable = isReference(field.type) && definition !== undefined;
  // The same record reached twice by different paths — the point of metaobjects.
  const isRevisit = field.refType !== undefined && ancestry.includes(field.refType);

  const chip = (
    <span className="shrink-0 rounded-full border border-primary-white/15 px-2 py-0.5 font-mono text-[0.65rem] text-primary-grey/80">
      {TYPE_LABEL[field.type]}
      {field.refType ? ` → ${field.refType}` : ''}
    </span>
  );

  const row = (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
      <span
        className="min-w-0 truncate text-sm font-medium"
        style={{ color: expandable ? accent : undefined }}
      >
        {field.key}
      </span>
      {chip}
      {field.value && (
        <span className="min-w-0 truncate font-mono text-xs text-primary-white/70">{field.value}</span>
      )}
      {definition && !isRevisit && (
        <span className="shrink-0 text-[0.65rem] text-primary-grey/60">{definition.entries} entries</span>
      )}
      {isRevisit && (
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold"
          style={{ backgroundColor: `${accent}26`, color: accent }}
        >
          same record
        </span>
      )}
      {field.usedIn !== undefined && (
        <span className="ml-auto shrink-0 font-mono text-[0.65rem] text-primary-grey/50">
          {field.usedIn} products
        </span>
      )}
    </div>
  );

  if (!expandable || isRevisit) {
    return <div className="flex items-start gap-2 py-1.5 pl-6">{row}</div>;
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-start gap-2 py-1.5 text-left transition hover:bg-primary-white/[0.03] cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`mt-1 w-3 shrink-0 text-xs transition-transform ${isOpen ? 'rotate-90' : ''}`}
          style={{ color: accent }}
        />
        {row}
      </button>

      {isOpen && definition && (
        <div className="ml-2 border-l border-primary-white/10 pl-3">
          <div className="py-1.5 pl-6 text-xs text-primary-grey/70">
            <span className="text-primary-white/80">{definition.name}</span>
            {definition.description ? ` — ${definition.description}` : ''}
            {definition.example ? ` · resolves to “${definition.example}”` : ''}
          </div>
          {definition.fields.map(child => (
            <TreeNode
              key={`${definition.type}.${child.key}`}
              field={child}
              accent={accent}
              ancestry={[...ancestry, definition.type]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type SchemaTreeProps = { accent: string };

const SchemaTree = ({ accent }: SchemaTreeProps) => {
  const referenceCount = productFields.filter(f => isReference(f.type)).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-primary-white/15 bg-secondary-background/70">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-primary-white/10 px-4 py-3 text-xs text-primary-grey md:px-6">
        <span>
          <span className="font-semibold text-primary-white">{productFields.length}</span> metafields
        </span>
        <span>
          <span className="font-semibold text-primary-white">{referenceCount}</span> references
        </span>
        <span>
          <span className="font-semibold text-primary-white">{Object.keys(metaobjects).length}</span>{' '}
          metaobject definitions
        </span>
        <span className="ml-auto hidden sm:inline text-primary-grey/60">click a reference to expand</span>
      </div>

      <div className="overflow-x-auto px-3 py-4 md:px-5">
        <div className="min-w-[420px]">
          <div className="flex items-center gap-2 pb-2">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
            <span className="truncate text-sm font-semibold text-primary-white">
              {exampleProduct.title}
            </span>
            <span className="shrink-0 rounded-full border border-primary-white/15 px-2 py-0.5 font-mono text-[0.65rem] text-primary-grey/80">
              product
            </span>
          </div>

          <div className="ml-1 border-l border-primary-white/10 pl-3">
            {productFields.map(field => (
              <TreeNode
                key={field.key}
                field={field}
                accent={accent}
                ancestry={[]}
                // Open the winemaker branch by default: it is the deepest chain
                // (product → winemaker → producer → region).
                defaultOpen={field.key === 'Winzer'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaTree;
