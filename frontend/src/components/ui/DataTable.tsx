import type { ReactNode } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { EmptyState } from "./EmptyState";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  emptyState?: {
    title: string;
    description?: string;
    action?: ReactNode;
  };
  onRowClick?: (row: T) => void;
  rowKey?: (row: T) => string;
  sortKey?: string;
  sortDir?: "asc" | "desc";
  onSort?: (key: string) => void;
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-5 py-3.5">
          <div className="h-4 rounded animate-shimmer" />
        </td>
      ))}
    </tr>
  );
}

export function DataTable<T>({
  columns,
  data,
  loading,
  emptyTitle = "No data yet",
  emptyDescription,
  emptyAction,
  emptyState,
  onRowClick,
  rowKey = (row: any) => row.id || JSON.stringify(row),
  sortKey,
  sortDir,
  onSort,
}: DataTableProps<T>) {
  const finalTitle = emptyState?.title || emptyTitle;
  const finalDesc = emptyState?.description || emptyDescription;
  const finalAction = emptyState?.action || emptyAction;

  return (
    <div className="rounded-container border border-line bg-surface overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-sunken/60 text-xs font-medium text-ink-muted">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3 font-semibold uppercase tracking-wider text-[11px] ${col.className ?? ""}`}
                >
                  {col.sortable && onSort ? (
                    <button
                      type="button"
                      onClick={() => onSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-ink transition-colors"
                    >
                      <span>{col.header}</span>
                      {sortKey === col.key && (
                        sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />
                      )}
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
              <>
                <SkeletonRow cols={columns.length} />
                <SkeletonRow cols={columns.length} />
                <SkeletonRow cols={columns.length} />
              </>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8">
                  <EmptyState
                    title={finalTitle}
                    description={finalDesc}
                    action={finalAction}
                  />
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={rowKey(row)}
                  onClick={() => onRowClick?.(row)}
                  className={`transition-colors duration-100 ease-out ${
                    onRowClick ? "cursor-pointer hover:bg-surface-sunken/50" : "hover:bg-surface-sunken/30"
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-5 py-3.5 ${col.className ?? ""}`}>
                      {col.render(row)}
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
