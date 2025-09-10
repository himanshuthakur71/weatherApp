import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('Login Page (+page.svelte)', () => {
	it('renders the heading', async () => {

		render(Page);

		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toHaveTextContent(/welcome back/i);

	})

	it('renders email and password inputs', async () => {
		render(Page, { form: {} });

		const email = page.getByPlaceholder('himanshu@thakur.com');
		const password = page.getByPlaceholder('••••••');

		await expect.element(email).toBeInTheDocument();
		await expect.element(password).toBeInTheDocument();
	});

	it('renders login button', async () => {
		render(Page, { form: {} });

		const button = page.getByRole('button', { name: /login/i });
		await expect.element(button).toBeInTheDocument();
	});
});
