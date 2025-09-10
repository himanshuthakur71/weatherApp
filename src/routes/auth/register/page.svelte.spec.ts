import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('Register Page (+page.svelte)', () => {
	it('renders heading and subtitle', async () => {

		render(Page);

		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toHaveTextContent(/Create Your Account/i);

		const subtitle = page.getByText(/Sign up to access comprehensive features/i);
		await expect.element(subtitle).toBeInTheDocument();

	})

	it('renders all input fields', async () => {
		render(Page, { form: {} });


		const email = page.getByPlaceholder('himanshu@thakur.com');
		
		await expect.element(email).toBeInTheDocument();

	});


	it('renders Sign Up button', async () => {
		render(Page, { form: {} });

		const button = page.getByRole('button', { name: /Sign Up/i });
		await expect.element(button).toBeInTheDocument();
	});
});
