import type { ReactNode } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Skeleton } from "./Skeleton";
import { EmptyState } from "./EmptyState";

export interface Column<T> {
  key: string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  align?: "left" | "right";
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data?: T[];
  rows?: T[];
  getRowKey?: (row: T) => string;
  rowKey?: (row: T) => string;
  loading?: boolean;
  skeletonRows?: number;
  empty?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  emptyState?: {
    title: string;
    description?: string;
    action?: ReactNode;
  };
  onRowClick?: (row: T) => void;
  sortKey?: string;
  sortDir?: "asc" | "desc";
  onSort?: (key: string) => void;
  caption?: ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  rows,
  getRowKey,
  rowKey,
  loading = false,
  skeletonRows = 4,
  empty,
  emptyTitle = "No data yet",
  emptyDescription,
  emptyAction,
  emptyState,
  onRowClick,
  sortKey,
  sortDir,
  onSort,
  caption,
}: DataTableProps<T>) {
  const items = data ?? rows ?? [];
  const getKey = (row: T, i: number): string => {
    if (rowKey) return rowKey(row);
    if (getRowKey) return getRowKey(row);
    return (row as any)?.id ?? (row as any)?.key ?? String(i);
  };

  const finalTitle = emptyState?.title || emptyTitle;
  const finalDesc = emptyState?.description || emptyDescription;
  const finalAction = emptyState?.action || emptyAction;

  return (
    <div className="rounded-container border border-line bg-surface overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="border-b border-line bg-surface-sunken/70 text-xs font-medium text-ink-muted">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-5 py-3 font-semibold uppercase tracking-wider text-[11px] ${
                    col.align === "right" ? "text-right" : "text-left"
                  } ${col.className ?? ""}`}
                >
                  {col.sortable && onSort ? (
                    <button
                      type="button"
                      onClick={() => onSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-ink transition-colors"
                    >
                      <span>{col.header}</span>
                      {sortKey === col.key &&
                        (sortDir === "asc" ? (
                          <ChevronUp size={13} />
                        ) : (
                          <ChevronDown size={13} />
                        ))}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {loading ? (
              Array.from({ length: skeletonRows }).map((_, i) => (
                <tr key={`sk-${i}`}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5">
                      <Skeleton className="h-4 w-full max-w-[10rem]" />
                    </td>
                  ))}
                </tr>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center">
                  {empty ? (
                    empty
                  ) : (
                    <EmptyState
                      title={finalTitle}
                      description={finalDesc}
                      action={finalAction}
                    />
                  )}
                </td>
              </tr>
            ) : (
              items.map((row, index) => (
                <tr
                  key={getKey(row, index)}
                  onClick={() => onRowClick?.(row)}
                  className={`transition-colors duration-100 ease-out ${
                    onRowClick
                      ? "cursor-pointer hover:bg-surface-sunken/50"
                      : "hover:bg-surface-sunken/30"
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-5 py-3.5 text-ink ${
                        col.align === "right" ? "text-right" : ""
                      } ${col.className ?? ""}`}
                    >
                      {col.render
                        ? col.render(row)
                        : ((row as Record<string, unknown>)[col.key] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
