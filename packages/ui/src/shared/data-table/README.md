# DataTable Component

A powerful, reusable data table component built with TanStack Table and shadcn/ui components. This component provides sorting, filtering, pagination, column visibility, and row selection capabilities.

## Features

- ✅ **Sorting**: Click column headers to sort data
- ✅ **Filtering**: Built-in search functionality
- ✅ **Pagination**: Configurable page sizes and navigation
- ✅ **Column Visibility**: Toggle column visibility
- ✅ **Row Selection**: Select individual or all rows
- ✅ **Actions**: Customizable dropdown actions for each row
- ✅ **Responsive**: Mobile-friendly design
- ✅ **TypeScript**: Full type safety

## Basic Usage

```tsx
import { DataTable, DataTableColumnHeader } from "@workspace/ui/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";

// Define your data type
interface Patient {
  id: number;
  lastName: string;
  firstName: string;
  gender: "Male" | "Female";
  email: string;
  mobileNumber: string;
}

// Define columns
const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" />,
  },
  // ... more columns
];

// Use the component
function PatientsPage() {
  return (
    <DataTable
      data={patientsData}
      columns={columns}
      title="Patients"
      searchPlaceholder="Search by patient name..."
      searchColumn="lastName"
      onAdd={() => console.log("Add patient")}
      addButtonText="Add Patient"
    />
  );
}
```

## Props

### DataTableProps

| Prop                     | Type                   | Default                    | Description                     |
| ------------------------ | ---------------------- | -------------------------- | ------------------------------- |
| `data`                   | `T[]`                  | -                          | Array of data objects           |
| `columns`                | `ColumnDef<T>[]`       | -                          | Column definitions              |
| `title`                  | `string`               | -                          | Table title                     |
| `searchPlaceholder`      | `string`               | `"Search..."`              | Search input placeholder        |
| `searchColumn`           | `string`               | -                          | Column key to search in         |
| `actions`                | `DataTableAction<T>[]` | `[]`                       | Row actions                     |
| `onAdd`                  | `() => void`           | -                          | Add button click handler        |
| `addButtonText`          | `string`               | `"Add"`                    | Add button text                 |
| `enableRowSelection`     | `boolean`              | `true`                     | Enable row selection            |
| `enableColumnVisibility` | `boolean`              | `true`                     | Enable column visibility toggle |
| `enablePagination`       | `boolean`              | `true`                     | Enable pagination               |
| `pageSize`               | `number`               | `10`                       | Default page size               |
| `pageSizeOptions`        | `number[]`             | `[10, 20, 25, 30, 40, 50]` | Available page sizes            |

### DataTableAction

| Prop      | Type                         | Description              |
| --------- | ---------------------------- | ------------------------ |
| `id`      | `string`                     | Unique action identifier |
| `label`   | `string`                     | Action label             |
| `icon`    | `React.ComponentType`        | Optional icon component  |
| `onClick` | `(row: T) => void`           | Action click handler     |
| `variant` | `"default" \| "destructive"` | Action variant           |

## Examples

### Basic Table

```tsx
<DataTable data={data} columns={columns} title="Users" />
```

### With Search

```tsx
<DataTable
  data={data}
  columns={columns}
  title="Users"
  searchPlaceholder="Search users..."
  searchColumn="name"
/>
```

### With Actions

```tsx
const actions: DataTableAction<User>[] = [
  {
    id: "view",
    label: "View",
    icon: Eye,
    onClick: (user) => console.log("View", user),
  },
  {
    id: "edit",
    label: "Edit",
    icon: Pencil,
    onClick: (user) => console.log("Edit", user),
  },
  {
    id: "delete",
    label: "Delete",
    icon: Trash2,
    variant: "destructive",
    onClick: (user) => console.log("Delete", user),
  },
];

<DataTable data={data} columns={columns} title="Users" actions={actions} />;
```

### With Add Button

```tsx
<DataTable
  data={data}
  columns={columns}
  title="Users"
  onAdd={() => navigate("/users/new")}
  addButtonText="Add User"
/>
```

### Disable Features

```tsx
<DataTable
  data={data}
  columns={columns}
  title="Users"
  enableRowSelection={false}
  enableColumnVisibility={false}
  enablePagination={false}
/>
```

## Column Definitions

Use TanStack Table's `ColumnDef` type for column definitions:

```tsx
const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  },
];
```

## Styling

The component uses Tailwind CSS classes and follows the shadcn/ui design system. You can customize the appearance by:

1. Modifying the component styles directly
2. Using CSS variables for theming
3. Adding custom classes to individual cells

## Dependencies

- `@tanstack/react-table` - Table functionality
- `lucide-react` - Icons
- `@radix-ui/*` - UI primitives
- `tailwindcss` - Styling

## File Structure

```text
src/shared/data-table/
├── data-table.tsx              # Main component
├── data-table-column-header.tsx # Sortable column header
├── data-table-pagination.tsx   # Pagination controls
├── data-table-view-options.tsx # Column visibility toggle
├── types.ts                    # TypeScript types
├── index.ts                    # Exports
├── examples/
│   └── patients-example.tsx     # Example usage
└── README.md                   # This file
```
