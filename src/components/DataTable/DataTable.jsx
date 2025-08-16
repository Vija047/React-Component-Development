import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Loader2, Database } from 'lucide-react';
import clsx from 'clsx';

function DataTable(props) {
    const {
        data = [],
        columns = [],
        loading = false,
        selectable = false,
        onRowSelect,
        className,
        rowKey = 'id',
        size = 'md',
        theme = 'light',
        emptyMessage = 'No data available',
        showHeader = true,
        striped = false,
        bordered = false,
        hover = true,
        maxHeight,
    } = props;

    const [selectedRows, setSelectedRows] = useState(new Set());
    const [sortState, setSortState] = useState({ column: null, order: null });

    // Get row key
    const getRowKey = (record, index) => {
        if (typeof rowKey === 'function') {
            return rowKey(record);
        }
        return record[rowKey] ?? index;
    };

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortState.column || !sortState.order) {
            return data;
        }

        const column = columns.find(col => col.key === sortState.column);
        if (!column) return data;

        return [...data].sort((a, b) => {
            const aValue = a[column.dataIndex];
            const bValue = b[column.dataIndex];

            if (aValue === bValue) return 0;

            let comparison = 0;
            if (aValue > bValue) comparison = 1;
            if (aValue < bValue) comparison = -1;

            return sortState.order === 'asc' ? comparison : -comparison;
        });
    }, [data, sortState, columns]);

    // Handle sorting
    const handleSort = (column) => {
        if (!column.sortable) return;

        setSortState(current => {
            if (current.column !== column.key) {
                return { column: column.key, order: 'asc' };
            }

            if (current.order === 'asc') {
                return { column: column.key, order: 'desc' };
            }

            if (current.order === 'desc') {
                return { column: null, order: null };
            }

            return { column: column.key, order: 'asc' };
        });
    };

    // Handle row selection
    const handleRowSelect = (rowKey, checked) => {
        const newSelectedRows = new Set(selectedRows);

        if (checked) {
            newSelectedRows.add(rowKey);
        } else {
            newSelectedRows.delete(rowKey);
        }

        setSelectedRows(newSelectedRows);

        if (onRowSelect) {
            const selectedData = data.filter((record, index) =>
                newSelectedRows.has(getRowKey(record, index))
            );
            onRowSelect(selectedData);
        }
    };

    // Handle select all
    const handleSelectAll = (checked) => {
        if (checked) {
            const allKeys = new Set(data.map((record, index) => getRowKey(record, index)));
            setSelectedRows(allKeys);
            if (onRowSelect) {
                onRowSelect(data);
            }
        } else {
            setSelectedRows(new Set());
            if (onRowSelect) {
                onRowSelect([]);
            }
        }
    };

    const isAllSelected = data.length > 0 && selectedRows.size === data.length;
    const isIndeterminate = selectedRows.size > 0 && selectedRows.size < data.length;

    // Size classes
    const sizeClasses = {
        sm: {
            table: 'text-sm',
            cell: 'px-3 py-2',
            header: 'px-3 py-2',
        },
        md: {
            table: 'text-base',
            cell: 'px-4 py-3',
            header: 'px-4 py-3',
        },
        lg: {
            table: 'text-lg',
            cell: 'px-6 py-4',
            header: 'px-6 py-4',
        },
    };

    // Theme classes
    const themeClasses = {
        light: {
            table: 'bg-white text-gray-900',
            header: 'bg-gray-50 text-gray-700 border-gray-200',
            row: 'border-gray-200',
            rowHover: 'hover:bg-gray-50',
            rowSelected: 'bg-blue-50',
            rowStriped: 'even:bg-gray-50',
            empty: 'text-gray-500',
            loading: 'text-gray-600',
        },
        dark: {
            table: 'bg-gray-900 text-white',
            header: 'bg-gray-800 text-gray-200 border-gray-700',
            row: 'border-gray-700',
            rowHover: 'hover:bg-gray-800',
            rowSelected: 'bg-blue-900/50',
            rowStriped: 'even:bg-gray-800/50',
            empty: 'text-gray-400',
            loading: 'text-gray-300',
        },
    };

    const tableClasses = clsx(
        'w-full table-auto',
        sizeClasses[size].table,
        themeClasses[theme].table,
        bordered && 'border',
        bordered && themeClasses[theme].row,
        className
    );

    const headerClasses = clsx(
        'font-medium text-left',
        sizeClasses[size].header,
        themeClasses[theme].header,
        bordered && 'border-b'
    );

    const rowClasses = (isSelected) => clsx(
        bordered && 'border-b',
        bordered && themeClasses[theme].row,
        isSelected && themeClasses[theme].rowSelected,
        !isSelected && striped && themeClasses[theme].rowStriped,
        hover && themeClasses[theme].rowHover,
        'transition-colors duration-150'
    );

    const cellClasses = clsx(
        sizeClasses[size].cell,
        bordered && 'border-r',
        bordered && themeClasses[theme].row
    );

    // Render sort icon
    const renderSortIcon = (column) => {
        if (!column.sortable) return null;

        const isActive = sortState.column === column.key;
        const iconClass = clsx(
            'w-4 h-4 ml-1 transition-opacity',
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
        );

        if (isActive && sortState.order === 'asc') {
            return React.createElement(ChevronUp, { className: iconClass });
        }
        if (isActive && sortState.order === 'desc') {
            return React.createElement(ChevronDown, { className: iconClass });
        }
        return React.createElement(ChevronUp, { className: iconClass });
    };

    // Loading state
    if (loading) {
        return React.createElement('div', {
            className: clsx('flex items-center justify-center p-8', themeClasses[theme].table)
        }, React.createElement('div', {
            className: clsx('flex items-center space-x-2', themeClasses[theme].loading)
        }, [
            React.createElement(Loader2, {
                key: 'loader',
                className: 'w-5 h-5 animate-spin'
            }),
            React.createElement('span', { key: 'text' }, 'Loading...')
        ]));
    }

    // Empty state
    if (!loading && data.length === 0) {
        return React.createElement('div', {
            className: clsx('flex flex-col items-center justify-center p-8', themeClasses[theme].table)
        }, [
            React.createElement(Database, {
                key: 'icon',
                className: clsx('w-12 h-12 mb-4', themeClasses[theme].empty)
            }),
            React.createElement('p', {
                key: 'message',
                className: clsx('text-lg font-medium', themeClasses[theme].empty)
            }, emptyMessage)
        ]);
    }

    const renderTable = () => {
        const tableElement = React.createElement('table', {
            className: tableClasses
        }, [
            showHeader && React.createElement('thead', {
                key: 'thead',
                className: maxHeight ? 'sticky top-0' : ''
            }, React.createElement('tr', {}, [
                selectable && React.createElement('th', {
                    key: 'select-all',
                    className: headerClasses,
                    style: { width: '40px' }
                }, React.createElement('input', {
                    type: 'checkbox',
                    checked: isAllSelected,
                    ref: input => {
                        if (input) input.indeterminate = isIndeterminate;
                    },
                    onChange: (e) => handleSelectAll(e.target.checked),
                    className: 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2',
                    'aria-label': 'Select all rows'
                })),
                ...columns.map((column) => React.createElement('th', {
                    key: column.key,
                    className: clsx(
                        headerClasses,
                        column.sortable && 'cursor-pointer select-none group'
                    ),
                    style: { width: column.width },
                    onClick: () => handleSort(column)
                }, React.createElement('div', {
                    className: 'flex items-center'
                }, [column.title, renderSortIcon(column)])))
            ])),

            React.createElement('tbody', { key: 'tbody' }, sortedData.map((record, index) => {
                const key = getRowKey(record, index);
                const isSelected = selectedRows.has(key);

                return React.createElement('tr', {
                    key: key,
                    className: rowClasses(isSelected)
                }, [
                    selectable && React.createElement('td', {
                        key: 'select',
                        className: cellClasses
                    }, React.createElement('input', {
                        type: 'checkbox',
                        checked: isSelected,
                        onChange: (e) => handleRowSelect(key, e.target.checked),
                        className: 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2',
                        'aria-label': `Select row ${index + 1}`
                    })),
                    ...columns.map((column) => React.createElement('td', {
                        key: column.key,
                        className: cellClasses
                    }, column.render
                        ? column.render(record[column.dataIndex], record, index)
                        : String(record[column.dataIndex] ?? '')
                    ))
                ]);
            }))
        ]);

        return tableElement;
    };

    return React.createElement('div', {
        className: clsx('overflow-hidden', bordered && 'border rounded-lg', themeClasses[theme].table)
    }, maxHeight ? React.createElement('div', {
        className: 'overflow-auto',
        style: { maxHeight }
    }, renderTable()) : renderTable());
}

export default DataTable;
