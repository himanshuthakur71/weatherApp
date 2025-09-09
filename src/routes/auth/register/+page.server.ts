import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    register: async ({ request }) => {
        const formData = await request.formData();
        const first_name = formData.get("first_name")?.toString();
        const last_name = formData.get("last_name")?.toString();
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const confirm_password = formData.get("confirm_password")?.toString();
        const redirectTo = formData.get("redirectTo")?.toString() || "/dashboard";

        if (!first_name || !last_name || !email || !password || !confirm_password) {
            return fail(400, { error: "All fields are required" });
        }

        if (password !== confirm_password) {
            return fail(400, { error: "Passwords do not match" });
        }
    }
};
