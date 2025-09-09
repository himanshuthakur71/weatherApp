import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    login: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();
        const redirectTo = formData.get("redirectTo")?.toString() || "/dashboard";

        if (!email || !password) {
            return fail(400, { error: "Email and password are required" });
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            return fail(400, { error: error?.message || "Login failed" });
        } else {
            redirect(303, '/dashboard/current')
        }

    }
};
