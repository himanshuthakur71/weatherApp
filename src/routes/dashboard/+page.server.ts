
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ depends, locals: { supabase }, url }) => {
    depends("dashboard:now");

    // get filter param from query (?range=today)
    const range = url.searchParams.get("range") || "all";

    const now = new Date();
    const start = new Date();
    const end = new Date();

    switch (range) {
        case "today":
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            break;
        case "yesterday":
            start.setDate(now.getDate() - 1);
            start.setHours(0, 0, 0, 0);
            end.setDate(now.getDate() - 1);
            end.setHours(23, 59, 59, 999);
            break;
        case "this_week":
            const dayOfWeek = now.getDay(); // 0 = Sunday
            start.setDate(now.getDate() - dayOfWeek);
            start.setHours(0, 0, 0, 0);
            end.setDate(start.getDate() + 6);
            end.setHours(23, 59, 59, 999);
            break;
        case "last_week":
            const lastWeekDay = now.getDay();
            end.setDate(now.getDate() - lastWeekDay - 1);
            end.setHours(23, 59, 59, 999);
            start.setDate(end.getDate() - 6);
            start.setHours(0, 0, 0, 0);
            break;
        case "this_month":
            start.setDate(1);
            start.setHours(0, 0, 0, 0);
            end.setMonth(now.getMonth() + 1, 0); // last day of current month
            end.setHours(23, 59, 59, 999);
            break;
        case "last_month":
            start.setMonth(now.getMonth() - 1, 1);
            start.setHours(0, 0, 0, 0);
            end.setMonth(now.getMonth(), 0); // last day of previous month
            end.setHours(23, 59, 59, 999);
            break;
        case "all":
        default:
            // no filter applied
            break;
    }

    // Fetch user weathers
    const getUserWeathers = async () => {
        let query = supabase
            .from("weathers")
            .select("*")
            .order("created_at", { ascending: false });

        // Apply filter if not "all"
        if (range !== "all") {
            query = query
                .gte("created_at", start.toISOString())
                .lte("created_at", end.toISOString());
        }

        const { data: weathers, error } = await query;
        if (error) console.error("Supabase error:", error);
        return weathers || [];
    };

    return {
        weathers: await getUserWeathers(),
        range
    };
};
