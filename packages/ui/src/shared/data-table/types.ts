import { ColumnDef } from "@tanstack/react-table";

export interface DataTableAction<T> {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (row: T) => void;
  variant?: "default" | "destructive";
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  title?: string;
  searchPlaceholder?: string;
  searchColumn?: string;
  actions?: DataTableAction<T>[];
  onAdd?: () => void;
  addButtonText?: string;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
}

export interface DataTableColumnHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  column: {
    getCanSort: () => boolean;
    getIsSorted: () => false | "asc" | "desc";
    toggleSorting: (desc?: boolean) => void;
    toggleVisibility: (value?: boolean) => void;
  };
  title: string;
}

export interface DataTablePaginationProps {
  table: {
    getFilteredSelectedRowModel: () => { rows: unknown[] };
    getFilteredRowModel: () => { rows: unknown[] };
    getState: () => { pagination: { pageSize: number; pageIndex: number } };
    setPageSize: (size: number) => void;
    getPageCount: () => number;
    setPageIndex: (index: number) => void;
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
    previousPage: () => void;
    nextPage: () => void;
  };
}

export interface DataTableViewOptionsProps {
  table: {
    getAllColumns: () => Array<{
      id: string;
      accessorFn?: unknown;
      getCanHide: () => boolean;
      getIsVisible: () => boolean;
      toggleVisibility: (value?: boolean) => void;
    }>;
  };
}
