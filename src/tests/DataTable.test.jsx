import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DataTable from '../components/DataTable/DataTable.jsx';

const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

const columns = [
    { key: 'name', title: 'Name', dataIndex: 'name' },
    { key: 'email', title: 'Email', dataIndex: 'email' }
];

describe('DataTable Component', () => {
    it('renders correctly', () => {
        render(<DataTable data={sampleData} columns={columns} />);
        expect(screen.getByText('Name')).toBeDefined();
        expect(screen.getByText('Email')).toBeDefined();
    });

    it('displays data correctly', () => {
        render(<DataTable data={sampleData} columns={columns} />);
        expect(screen.getByText('John Doe')).toBeDefined();
        expect(screen.getByText('jane@example.com')).toBeDefined();
    });

    it('shows empty state when no data', () => {
        render(<DataTable data={[]} columns={columns} />);
        expect(screen.getByText('No data available')).toBeDefined();
    });
});
