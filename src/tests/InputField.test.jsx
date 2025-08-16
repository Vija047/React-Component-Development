import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import InputField from '../components/InputField/InputField.jsx';

describe('InputField Component', () => {
    it('renders correctly', () => {
        render(<InputField label="Test Label" placeholder="Test placeholder" />);
        expect(screen.getByText('Test Label')).toBeDefined();
    });

    it('accepts a value prop', () => {
        render(<InputField value="test value" />);
        const input = screen.getByDisplayValue('test value');
        expect(input).toBeDefined();
    });
});
