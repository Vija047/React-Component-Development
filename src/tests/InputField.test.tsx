import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from '../components/InputField/InputField';

describe('InputField', () => {
    it('renders with basic props', () => {
        render(
            <InputField
        label="Test Label"
        placeholder = "Test placeholder"
        value = "Test value"
            />
    );

        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test value')).toBeInTheDocument();
    });

    it('calls onChange when value changes', () => {
        const handleChange = vi.fn();
        render(
            <InputField
        label="Test Input"
        onChange = { handleChange }
            />
    );

        const input = screen.getByLabelText('Test Input');
        fireEvent.change(input, { target: { value: 'new value' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('shows error message when invalid', () => {
        render(
            <InputField
        label="Test Input"
        invalid
        errorMessage = "This field is required"
            />
    );

        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('disables input when disabled prop is true', () => {
        render(
            <InputField
        label="Test Input"
        disabled
            />
    );

        expect(screen.getByLabelText('Test Input')).toBeDisabled();
    });

    it('shows password toggle button for password type', () => {
        render(
            <InputField
        type="password"
        label = "Password"
        showPasswordToggle
        value = "secret"
            />
    );

        expect(screen.getByLabelText('Show password')).toBeInTheDocument();
    });

    it('shows clear button when showClearButton is true and has value', () => {
        render(
            <InputField
        label="Test Input"
        value = "some value"
        showClearButton
            />
    );

        expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
    });

    it('clears value when clear button is clicked', () => {
        const handleChange = vi.fn();
        render(
            <InputField
        label="Test Input"
        value = "some value"
        showClearButton
        onChange = { handleChange }
            />
    );

        const clearButton = screen.getByLabelText('Clear input');
        fireEvent.click(clearButton);

        expect(handleChange).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    value: ''
                })
            })
        );
    });

    it('applies correct variant classes', () => {
        const { rerender } = render(
            <InputField
        label="Test Input"
        variant = "filled"
            />
    );

        let input = screen.getByLabelText('Test Input');
        expect(input).toHaveClass('bg-gray-50');

        rerender(
            <InputField
        label="Test Input"
        variant = "outlined"
            />
    );

        input = screen.getByLabelText('Test Input');
        expect(input).toHaveClass('bg-white');

        rerender(
            <InputField
        label="Test Input"
        variant = "ghost"
            />
    );

        input = screen.getByLabelText('Test Input');
        expect(input).toHaveClass('bg-transparent');
    });

    it('applies correct size classes', () => {
        const { rerender } = render(
            <InputField
        label="Test Input"
        size = "sm"
            />
    );

        let input = screen.getByLabelText('Test Input');
        expect(input).toHaveClass('px-3', 'py-2', 'text-sm');

        rerender(
            <InputField
        label="Test Input"
        size = "lg"
            />
    );

        input = screen.getByLabelText('Test Input');
        expect(input).toHaveClass('px-5', 'py-4', 'text-lg');
    });

    it('shows loading indicator when loading', () => {
        render(
            <InputField
        label="Test Input"
        loading
            />
    );

        // Loading spinner should be present
        expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });
});
