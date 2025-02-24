import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	prettierConfig,
];

eslintConfig.push({
	ignores: ['**/build/**', '**/dist/**'],
	plugins: {
		prettier: prettierPlugin,
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		quotes: ['error', 'single', { avoidEscape: true }],
		semi: ['error', 'always'],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'prettier/prettier': ['error', { useTabs: true, tabWidth: 2 }],
		'react-hooks/exhaustive-deps': 'off',
		'no-console': ['error'],
		'no-unused-vars': [
			'error',
			{
				vars: 'all',
				args: 'all',
				ignoreRestSiblings: false,
				argsIgnorePattern: '^_',
			},
		],
		eqeqeq: 'error',
		curly: 'error',
		'no-duplicate-imports': 'error',
	},
});
export default eslintConfig;
