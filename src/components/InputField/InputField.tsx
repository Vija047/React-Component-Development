import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
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
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({
        value = '',
        onChange,
        label,
        placeholder,
        helperText,
        errorMessage,
        disabled = false,
        invalid = false,
        loading = false,
        variant = 'outlined',
        size = 'md',
        showClearButton = false,
        showPasswordToggle = false,
        theme = 'light',
        type = 'text',
        className,
        id,
        ...props
    }, ref) => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);
        const [isFocused, setIsFocused] = useState(false);

        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
        const isPassword = type === 'password';
        const actualType = isPassword && isPasswordVisible ? 'text' : type;
        const hasError = invalid || !!errorMessage;
        const showPassword = isPassword && showPasswordToggle;
        const showClear = showClearButton && value && !disabled && !loading;

        // Size classes
        const sizeClasses = {
            sm: {
                input: 'px-3 py-2 text-sm',
                icon: 'w-4 h-4',
                label: 'text-xs font-medium',
                helper: 'text-xs',
            },
            md: {
                input: 'px-4 py-3 text-base',
                icon: 'w-5 h-5',
                label: 'text-sm font-medium',
                helper: 'text-sm',
            },
            lg: {
                input: 'px-5 py-4 text-lg',
                icon: 'w-6 h-6',
                label: 'text-base font-medium',
                helper: 'text-base',
            },
        };

        // Variant classes
        const variantClasses = {
            filled: {
                base: theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-gray-50 border-gray-200',
                focus: theme === 'dark'
                    ? 'focus:bg-gray-700 focus:border-primary-400'
                    : 'focus:bg-white focus:border-primary-500',
                error: theme === 'dark'
                    ? 'border-red-400 bg-red-900/20'
                    : 'border-red-500 bg-red-50',
            },
            outlined: {
                base: theme === 'dark'
                    ? 'bg-transparent border-gray-600'
                    : 'bg-white border-gray-300',
                focus: theme === 'dark'
                    ? 'focus:border-primary-400 focus:ring-primary-400/20'
                    : 'focus:border-primary-500 focus:ring-primary-500/20',
                error: theme === 'dark'
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            },
            ghost: {
                base: theme === 'dark'
                    ? 'bg-transparent border-transparent'
                    : 'bg-transparent border-transparent',
                focus: theme === 'dark'
                    ? 'focus:bg-gray-800 focus:border-gray-600'
                    : 'focus:bg-gray-50 focus:border-gray-200',
                error: theme === 'dark'
                    ? 'border-red-400/50 focus:border-red-400'
                    : 'border-red-500/50 focus:border-red-500',
            },
        };

        const inputClasses = clsx(
            // Base styles
            'w-full rounded-lg border transition-all duration-200 outline-none',
            'placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
            theme === 'dark' ? 'text-white' : 'text-gray-900',

            // Size
            sizeClasses[size].input,

            // Variant and state
            variantClasses[variant].base,
            !hasError && !disabled && variantClasses[variant].focus,
            hasError && variantClasses[variant].error,

            // Focus ring
            'focus:ring-2',
            !hasError ? (theme === 'dark' ? 'focus:ring-primary-400/20' : 'focus:ring-primary-500/20') : 'focus:ring-red-500/20',

            // Padding adjustments for icons
            (showPassword || showClear || loading) && 'pr-12',

            className
        );

        const labelClasses = clsx(
            sizeClasses[size].label,
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700',
            disabled && 'opacity-50'
        );

        const helperClasses = clsx(
            sizeClasses[size].helper,
            'mt-1',
            hasError
                ? (theme === 'dark' ? 'text-red-400' : 'text-red-600')
                : (theme === 'dark' ? 'text-gray-400' : 'text-gray-600')
        );

        const handleClear = () => {
            if (onChange) {
                const event = {
                    target: { value: '' }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
            }
        };

        const togglePasswordVisibility = () => {
            setIsPasswordVisible(!isPasswordVisible);
        };

        return (
            <div className= { clsx('w-full', theme === 'dark' && 'dark')}>
                { label && (
                    <label 
            htmlFor={ inputId }
className = { labelClasses }
    >
    { label }
    </label>
        )}

<div className="relative" >
    <input
            ref={ ref }
id = { inputId }
type = { actualType }
value = { value }
onChange = { onChange }
placeholder = { placeholder }
disabled = { disabled || loading}
className = { inputClasses }
onFocus = {() => setIsFocused(true)}
onBlur = {() => setIsFocused(false)}
aria - invalid={ hasError }
aria - describedby={
    hasError
        ? `${inputId}-error`
        : helperText
            ? `${inputId}-helper`
            : undefined
}
{...props }
          />

{/* Right side icons */ }
<div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1" >
    { loading && (
        <Loader2 
                className={
    clsx(
        sizeClasses[size].icon,
        'animate-spin',
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
    )
} 
              />
            )}

{
    showClear && !loading && (
        <button
                type="button"
    onClick = { handleClear }
    className = {
        clsx(
                  'rounded-full p-0.5 transition-colors',
            theme === 'dark'
        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                )
}
aria - label="Clear input"
    >
    <X className={ sizeClasses[size].icon } />
        </button>
            )}

{
    showPassword && !loading && (
        <button
                type="button"
    onClick = { togglePasswordVisibility }
    className = {
        clsx(
                  'rounded-full p-0.5 transition-colors',
            theme === 'dark'
        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                )
}
aria - label={ isPasswordVisible ? 'Hide password' : 'Show password' }
              >
    {
        isPasswordVisible?(
                  <EyeOff className = { sizeClasses[size].icon } />
                ): (
                <Eye className = {sizeClasses[size].icon
    } />
                )}
</button>
            )}
</div>
    </div>

{
    (helperText || errorMessage) && (
        <div
            id={ hasError ? `${inputId}-error` : `${inputId}-helper` }
    className = { helperClasses }
    role = { hasError? 'alert': undefined }
        >
        { errorMessage || helperText
}
</div>
        )}
</div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
