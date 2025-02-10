import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        // -------------------------------------------------------------------------
        // Environment and Parser Options (from .eslintrc.cjs)
        // -------------------------------------------------------------------------
        env: {
            browser: true,
            es2021: true,
        },
        languageOptions: {
            // Use the TS parser so that both TS and modern JS (with JSX) are handled
            parser: '@typescript-eslint/parser',
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
            globals: globals.browser,
        },

        // -------------------------------------------------------------------------
        // Extends: Merge recommended configs from ESLint, TypeScript, React, and Prettier
        // -------------------------------------------------------------------------
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            'plugin:react/recommended',
            'plugin:prettier/recommended',
        ],

        // -------------------------------------------------------------------------
        // Apply to JavaScript and TypeScript files (not just TS/TSX)
        // -------------------------------------------------------------------------
        files: ['**/*.{js,jsx,ts,tsx}'],

        // -------------------------------------------------------------------------
        // Plugins: Add additional plugins used in the legacy config
        // -------------------------------------------------------------------------
        plugins: {
            react,
            '@typescript-eslint': tseslint, // typescript-eslint serves as both parser and plugin here
            prettier,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },

        // -------------------------------------------------------------------------
        // Rules: Combine the rules from both configs
        // -------------------------------------------------------------------------
        rules: {
            // Bring in the react-hooks recommended rules
            ...reactHooks.configs.recommended.rules,

            // Add the react-refresh rule as in your eslint.config.js
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],

            // Prettier and React rules from your .eslintrc.cjs:
            'prettier/prettier': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },

        // -------------------------------------------------------------------------
        // Settings: React version detection and import resolver for TypeScript
        // -------------------------------------------------------------------------
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {},
            },
        },
    }
);
