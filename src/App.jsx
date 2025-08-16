import React, { useState } from 'react'
import './App.css'
import InputField from './components/InputField/InputField.jsx'
import DataTable from './components/DataTable/DataTable.jsx'

// Sample data for the table
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', joinDate: '2023-04-05' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'inactive', joinDate: '2023-05-12' },
];

// Column configuration for the table
const userColumns = [
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
    render: (value) => (
      React.createElement('span', {
        className: `px-2 py-1 rounded-full text-xs font-medium ${value === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
          }`
      }, value)
    ),
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    dataIndex: 'joinDate',
    sortable: true,
  },
];

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [search, setSearch] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [theme, setTheme] = useState('light')

  const handleRowSelect = (rows) => {
    setSelectedRows(rows)
    console.log('Selected rows:', rows)
  }

  const filteredData = sampleUsers.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            React Component Demo
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Showcasing InputField and DataTable components
          </p>

          {/* Theme Toggle */}
          <div className="mt-4">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`px-4 py-2 rounded-lg border transition-colors ${theme === 'dark'
                  ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                }`}
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>
          </div>
        </div>

        {/* InputField Examples */}
        <section className="mb-12">
          <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            InputField Component
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Login Form Example */}
            <div className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Login Form
              </h3>
              <div className="space-y-4">
                <InputField
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  theme={theme}
                />
                <InputField
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  showPasswordToggle
                  showClearButton
                  theme={theme}
                />
              </div>
            </div>

            {/* Input Variants */}
            <div className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Input Variants
              </h3>
              <div className="space-y-4">
                <InputField
                  variant="filled"
                  label="Filled Variant"
                  placeholder="Filled input"
                  theme={theme}
                />
                <InputField
                  variant="outlined"
                  label="Outlined Variant"
                  placeholder="Outlined input"
                  theme={theme}
                />
                <InputField
                  variant="ghost"
                  label="Ghost Variant"
                  placeholder="Ghost input"
                  theme={theme}
                />
              </div>
            </div>

            {/* Input States */}
            <div className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Input States
              </h3>
              <div className="space-y-4">
                <InputField
                  label="Normal State"
                  placeholder="Normal input"
                  helperText="This is a helper text"
                  theme={theme}
                />
                <InputField
                  label="Error State"
                  placeholder="Invalid input"
                  value="invalid@email"
                  invalid
                  errorMessage="Please enter a valid email"
                  theme={theme}
                />
                <InputField
                  label="Disabled State"
                  placeholder="Disabled input"
                  value="Cannot edit"
                  disabled
                  theme={theme}
                />
                <InputField
                  label="Loading State"
                  placeholder="Loading..."
                  value="Processing"
                  loading
                  theme={theme}
                />
              </div>
            </div>

            {/* Input Sizes */}
            <div className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Input Sizes
              </h3>
              <div className="space-y-4">
                <InputField
                  size="sm"
                  label="Small"
                  placeholder="Small input"
                  theme={theme}
                />
                <InputField
                  size="md"
                  label="Medium"
                  placeholder="Medium input"
                  theme={theme}
                />
                <InputField
                  size="lg"
                  label="Large"
                  placeholder="Large input"
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </section>

        {/* DataTable Examples */}
        <section>
          <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            DataTable Component
          </h2>

          {/* Search Filter */}
          <div className="mb-6">
            <InputField
              placeholder="Search users by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              showClearButton
              variant="outlined"
              theme={theme}
              size="lg"
            />
          </div>

          {/* Selected Rows Info */}
          {selectedRows.length > 0 && (
            <div className={`mb-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-50 text-blue-800'
              }`}>
              {selectedRows.length} row(s) selected: {selectedRows.map(row => row.name).join(', ')}
            </div>
          )}

          {/* Data Table */}
          <div className={`rounded-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
            <DataTable
              data={filteredData}
              columns={userColumns}
              selectable
              onRowSelect={handleRowSelect}
              bordered
              hover
              theme={theme}
              emptyMessage={search ? `No users found matching "${search}"` : 'No users available'}
            />
          </div>

          {/* Table Examples */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Striped Table
              </h3>
              <DataTable
                data={sampleUsers.slice(0, 3)}
                columns={userColumns.slice(0, 3)}
                striped
                size="sm"
                theme={theme}
              />
            </div>

            <div className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Compact Table
              </h3>
              <DataTable
                data={sampleUsers.slice(0, 3)}
                columns={userColumns.slice(0, 3)}
                size="sm"
                bordered
                theme={theme}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
