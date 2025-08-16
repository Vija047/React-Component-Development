import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
    title: 'Components/InputField',
    component: InputField,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible input component with validation states, multiple variants, sizes, and optional features like password toggle and clear button.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['filled', 'outlined', 'ghost'],
            description: 'Visual style variant of the input'
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the input component'
        },
        theme: {
            control: 'select',
            options: ['light', 'dark'],
            description: 'Color theme for the input'
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel', 'url'],
            description: 'HTML input type'
        }
    },
    args: {
        onChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
    args: {
        placeholder: 'Enter your text',
        label: 'Default Input',
    },
};

export const WithValue: Story = {
    args: {
        value: 'Sample text',
        placeholder: 'Enter your text',
        label: 'Input with Value',
    },
};

export const WithHelperText: Story = {
    args: {
        placeholder: 'Enter your email',
        label: 'Email Address',
        helperText: 'We\'ll never share your email with anyone.',
        type: 'email',
    },
};

// States
export const Disabled: Story = {
    args: {
        placeholder: 'Disabled input',
        label: 'Disabled Input',
        disabled: true,
        value: 'Cannot edit this',
    },
};

export const Invalid: Story = {
    args: {
        placeholder: 'Enter your email',
        label: 'Email Address',
        value: 'invalid-email',
        invalid: true,
        errorMessage: 'Please enter a valid email address',
    },
};

export const Loading: Story = {
    args: {
        placeholder: 'Loading...',
        label: 'Loading Input',
        loading: true,
        value: 'Processing',
    },
};

// Variants
export const Filled: Story = {
    args: {
        variant: 'filled',
        placeholder: 'Filled variant',
        label: 'Filled Input',
    },
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        placeholder: 'Outlined variant',
        label: 'Outlined Input',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        placeholder: 'Ghost variant',
        label: 'Ghost Input',
    },
};

// Sizes
export const Small: Story = {
    args: {
        size: 'sm',
        placeholder: 'Small input',
        label: 'Small Input',
    },
};

export const Medium: Story = {
    args: {
        size: 'md',
        placeholder: 'Medium input',
        label: 'Medium Input',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        placeholder: 'Large input',
        label: 'Large Input',
    },
};

// Features
export const WithClearButton: Story = {
    args: {
        placeholder: 'Type something to see clear button',
        label: 'Input with Clear Button',
        value: 'Clear this text',
        showClearButton: true,
    },
};

export const PasswordField: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter your password',
        label: 'Password',
        value: 'secretpassword',
        showPasswordToggle: true,
    },
};

export const PasswordWithClear: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter your password',
        label: 'Password with Clear',
        value: 'secretpassword',
        showPasswordToggle: true,
        showClearButton: true,
    },
};

// Themes
export const DarkTheme: Story = {
    args: {
        theme: 'dark',
        placeholder: 'Dark theme input',
        label: 'Dark Theme Input',
        value: 'Dark mode text',
    },
    parameters: {
        backgrounds: { default: 'dark' },
    },
};

export const DarkThemeError: Story = {
    args: {
        theme: 'dark',
        placeholder: 'Enter valid data',
        label: 'Dark Theme Error',
        value: 'Invalid data',
        invalid: true,
        errorMessage: 'This field contains an error',
    },
    parameters: {
        backgrounds: { default: 'dark' },
    },
};

// Complex examples
export const LoginForm: Story = {
    render: () => (
        <div className= "space-y-4 w-80" >
        <InputField
        type="email"
        label = "Email"
        placeholder="Enter your email"
        variant="outlined"
    />
    <InputField
        type="password"
        label = "Password"
        placeholder="Enter your password"
        variant="outlined"
        showPasswordToggle
        showClearButton
      />
    </div>
  ),
};

export const AllVariantsShowcase: Story = {
    render: () => (
        <div className= "space-y-6 w-80" >
        <div>
        <h3 className="text-lg font-semibold mb-4"> Variants </h3>
            < div className="space-y-4" >
            <InputField
            variant="filled"
            label = "Filled"
            placeholder="Filled variant"
            value="Sample text"
    />
    <InputField
            variant="outlined"
            label = "Outlined"
            placeholder="Outlined variant"
            value="Sample text"
    />
    <InputField
            variant="ghost"
            label = "Ghost"
            placeholder="Ghost variant"
            value="Sample text"
    />
    </div>
    </div>

    < div >
    <h3 className="text-lg font-semibold mb-4"> Sizes </h3>
        < div className="space-y-4" >
        <InputField
            size="sm"
            label = "Small"
            placeholder="Small size"
            value="Small text"
    />
    <InputField
            size="md"
            label = "Medium"
            placeholder="Medium size"
            value="Medium text"
    />
    <InputField
            size="lg"
            label = "Large"
            placeholder="Large size"
            value="Large text"
    />
    </div>
    </div>
    </div>
  ),
};
