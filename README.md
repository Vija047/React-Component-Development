# React Component Development 

A modern React component library built with TypeScript, TailwindCSS, and Storybook, featuring two key components: **InputField** and **DataTable**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook

# Run tests
npm test

# Build for production
npm run build
```

## 🎯 Components

### InputField Component

A flexible input component with validation states, multiple variants, and advanced features.

#### Features
- ✅ Text input with label, placeholder, helper text, error message
- ✅ States: disabled, invalid, loading
- ✅ Variants: filled, outlined, ghost
- ✅ Sizes: small, medium, large
- ✅ Optional: clear button, password toggle
- ✅ Theme support: light & dark

#### Props Interface
```typescript
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  theme?: 'light' | 'dark';
  type?: string;
}
```

#### Usage Examples
```tsx
// Basic usage
<InputField
  label="Email"
  placeholder="Enter your email"
  type="email"
/>

// With validation
<InputField
  label="Password"
  type="password"
  invalid={hasError}
  errorMessage="Password must be at least 8 characters"
  showPasswordToggle
/>

// Different variants
<InputField variant="filled" label="Filled Input" />
<InputField variant="outlined" label="Outlined Input" />
<InputField variant="ghost" label="Ghost Input" />

// Different sizes
<InputField size="sm" label="Small" />
<InputField size="md" label="Medium" />
<InputField size="lg" label="Large" />
```

### DataTable Component

A comprehensive data table with sorting, selection, and customization options.

#### Features
- ✅ Display tabular data
- ✅ Column sorting (ascending/descending/none)
- ✅ Row selection (single/multiple)
- ✅ Loading state with spinner
- ✅ Empty state with icon
- ✅ Responsive design
- ✅ Theme support (light/dark)
- ✅ Customizable styling options

#### Props Interface
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  maxHeight?: string;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}
```

#### Usage Examples
```tsx
// Basic usage
const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' },
];

<DataTable data={users} columns={columns} />

// With selection
<DataTable
  data={users}
  columns={columns}
  selectable
  onRowSelect={(selectedRows) => console.log(selectedRows)}
/>

// Custom rendering
const columns = [
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (value) => (
      <span className={`badge ${value === 'active' ? 'success' : 'danger'}`}>
        {value}
      </span>
    ),
  },
];

// Styled variants
<DataTable data={data} columns={columns} striped bordered />
<DataTable data={data} columns={columns} theme="dark" />
```

## 🎨 Design System

### Colors
- **Primary**: Blue scale (#3b82f6)
- **Gray**: Neutral scale for backgrounds and text
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)

### Typography
- **Small**: 0.875rem (14px)
- **Base**: 1rem (16px)
- **Large**: 1.125rem (18px)

### Spacing
- **Small**: 0.5rem (8px)
- **Medium**: 1rem (16px)
- **Large**: 1.5rem (24px)

## 🧪 Testing

The components include comprehensive tests covering:
- Rendering with different props
- User interactions (clicks, typing, etc.)
- State changes
- Accessibility features
- Theme variations

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📚 Storybook

Interactive component documentation and examples are available in Storybook:

```bash
npm run storybook
```

Visit `http://localhost:6006` to explore:
- Component variations
- Interactive controls
- Documentation
- Code examples

## 🏗️ Project Structure

```
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx
│   │   ├── InputField.stories.tsx
│   │   └── index.ts
│   └── DataTable/
│       ├── DataTable.tsx
│       ├── DataTable.stories.tsx
│       └── index.ts
├── tests/
│   ├── InputField.test.tsx
│   ├── DataTable.test.tsx
│   └── setup.ts
├── App.jsx          # Demo application
├── main.jsx         # Application entry point
└── index.css        # Global styles
```

## 🔧 Technologies Used

- **React 19**: Latest React with modern features
- **TypeScript**: Type safety and better DX
- **TailwindCSS**: Utility-first CSS framework
- **Storybook**: Component documentation and testing
- **Vitest**: Fast unit testing framework
- **Testing Library**: React component testing utilities
- **Lucide React**: Beautiful icon library
- **Vite**: Fast build tool and dev server

## ♿ Accessibility

Both components follow accessibility best practices:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## 🎯 Features Implemented

### InputField
- [x] Multiple variants (filled, outlined, ghost)
- [x] Three sizes (sm, md, lg)
- [x] Validation states (invalid, disabled, loading)
- [x] Password toggle functionality
- [x] Clear button functionality
- [x] Dark/light theme support
- [x] Accessibility features
- [x] TypeScript support

### DataTable
- [x] Column sorting (asc/desc/none)
- [x] Row selection (single/multiple)
- [x] Loading and empty states
- [x] Custom cell rendering
- [x] Responsive design
- [x] Theme support
- [x] Customizable styling
- [x] TypeScript generics support

## 🚀 Demo

The demo application showcases both components with:
- Interactive examples
- Theme switching
- Live search functionality
- Various configurations
- Real-world use cases

## 📦 Build & Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Build Storybook
npm run build-storybook
```

## 🤝 Contributing

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev`
4. Make your changes
5. Run tests: `npm test`
6. Build: `npm run build`

## 📄 License

MIT License - feel free to use this code for your projects!

## 🔗 Links

- [Demo Application](http://localhost:5173)
- [Storybook Documentation](http://localhost:6006)
- [GitHub Repository](#)

---

Built with ❤️ using modern React development practices.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
