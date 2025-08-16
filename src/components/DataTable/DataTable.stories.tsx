import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DataTable from './DataTable';
import type { Column } from './DataTable';

// Sample data types
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    joinDate: string;
    avatar?: string;
}

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    rating: number;
}

// Sample data
const sampleUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', joinDate: '2023-03-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', joinDate: '2023-04-05' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'inactive', joinDate: '2023-05-12' },
];

const sampleProducts: Product[] = [
    { id: 'P001', name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 15, rating: 4.5 },
    { id: 'P002', name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 150, rating: 4.2 },
    { id: 'P003', name: 'USB Cable', category: 'Accessories', price: 9.99, stock: 200, rating: 4.0 },
    { id: 'P004', name: 'Monitor 27"', category: 'Electronics', price: 349.99, stock: 8, rating: 4.7 },
    { id: 'P005', name: 'Keyboard RGB', category: 'Accessories', price: 79.99, stock: 45, rating: 4.3 },
];

// Column definitions
const userColumns: Column<User>[] = [
    {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        sortable: true,
    },
    {
        key: 'email',
        title: 'Email',
        dataIndex: 'email',
        sortable: true,
    },
    {
        key: 'role',
        title: 'Role',
        dataIndex: 'role',
        sortable: true,
    },
    {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
        render: (value: string) => (
            <span 
        className= {`px-2 py-1 rounded-full text-xs font-medium ${value === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`
    }
    >
    { value }
    </span>
    ),
  },
{
    key: 'joinDate',
        title: 'Join Date',
            dataIndex: 'joinDate',
                sortable: true,
  },
];

const productColumns: Column<Product>[] = [
    {
        key: 'id',
        title: 'ID',
        dataIndex: 'id',
        width: '80px',
    },
    {
        key: 'name',
        title: 'Product Name',
        dataIndex: 'name',
        sortable: true,
    },
    {
        key: 'category',
        title: 'Category',
        dataIndex: 'category',
        sortable: true,
    },
    {
        key: 'price',
        title: 'Price',
        dataIndex: 'price',
        sortable: true,
        render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
        key: 'stock',
        title: 'Stock',
        dataIndex: 'stock',
        sortable: true,
        render: (value: number) => (
            <span className= { value< 10? 'text-red-600 font-semibold' : ''} >
            { value }
            </span>
    ),
  },
{
    key: 'rating',
        title: 'Rating',
            dataIndex: 'rating',
                sortable: true,
                    render: (value: number) => (
                        <div className= "flex items-center" >
                        <span>{ value } </span>
                        < span className = "ml-1 text-yellow-400" >★</span>
                            </div>
    ),
},
];

const meta: Meta<typeof DataTable> = {
    title: 'Components/DataTable',
    component: DataTable,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A flexible data table component with sorting, selection, loading states, and customizable themes.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the table'
        },
        theme: {
            control: 'select',
            options: ['light', 'dark'],
            description: 'Color theme for the table'
        },
        selectable: {
            control: 'boolean',
            description: 'Enable row selection'
        },
        loading: {
            control: 'boolean',
            description: 'Show loading state'
        },
        striped: {
            control: 'boolean',
            description: 'Enable striped rows'
        },
        bordered: {
            control: 'boolean',
            description: 'Add borders to table'
        },
        hover: {
            control: 'boolean',
            description: 'Enable hover effects'
        },
        showHeader: {
            control: 'boolean',
            description: 'Show table header'
        },
    },
    args: {
        onRowSelect: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
    args: {
        data: sampleUsers,
        columns: userColumns,
    },
};

export const WithSelection: Story = {
    args: {
        data: sampleUsers,
        columns: userColumns,
        selectable: true,
    },
};

export const Products: Story = {
    args: {
        data: sampleProducts,
        columns: productColumns,
        rowKey: 'id',
    },
};

// States
export const Loading: Story = {
    args: {
        data: [],
        columns: userColumns,
        loading: true,
    },
};

export const Empty: Story = {
    args: {
        data: [],
        columns: userColumns,
        emptyMessage: 'No users found',
    },
};

// Sizes
export const Small: Story = {
    args: {
        data: sampleUsers,
        columns: userColumns,
        size: 'sm',
    },
};

export const Medium: Story = {
    args: {
        data: sampleUsers,
        columns: userColumns,
        size: 'md',
    },
};

export const Large: Story = {
    args: {
        data: sampleUsers,
        columns: userColumns,
        size: 'lg',
    },
};

// Styling variants
export const Striped: Story = {
    args: {
        data: sampleUsers,
        columns: userColumns,
        striped: true,
    },
};

export const Bordered: Story = {
    args: {
        data: sampleUsers,
        columns: userColumns,
        bordered: true,
    },
};

export const WithoutHover: Story = {
    args: {
        data: sampleUsers,
        columns: userColumns,
        hover: false,
    },
};

export const WithoutHeader: Story = {
    args: {
        data: sampleUsers,
        columns: userColumns,
        showHeader: false,
    },
};

// Dark theme
export const DarkTheme: Story = {
    args: {
        data: sampleUsers,
        columns: userColumns,
        theme: 'dark',
        selectable: true,
    },
    parameters: {
        backgrounds: { default: 'dark' },
    },
};

export const DarkThemeBordered: Story = {
    args: {
        data: sampleProducts,
        columns: productColumns,
        theme: 'dark',
        bordered: true,
        striped: true,
    },
    parameters: {
        backgrounds: { default: 'dark' },
    },
};

// Fixed height with scroll
export const FixedHeight: Story = {
    args: {
        data: [...sampleUsers, ...sampleUsers, ...sampleUsers], // Triple the data
        columns: userColumns,
        maxHeight: '300px',
        bordered: true,
    },
};

// Complex example
export const FullFeatured: Story = {
    args: {
        data: sampleProducts,
        columns: productColumns,
        selectable: true,
        bordered: true,
        striped: true,
        size: 'md',
    },
};
