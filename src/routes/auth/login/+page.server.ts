import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    login: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();
        const redirectTo = formData.get("redirectTo")?.toString() || "/dashboard";

        if (!email || !password) {
            return fail(400, { error: "Email and password are required" });
        }

    }
};
