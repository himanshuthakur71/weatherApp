import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ params, locals: { user, supabase } }) => {


    // Fatch user weathers 
    const getUserWeather = async () => {
        let { data: weather, error } = await supabase
            .from('weathers')
            .select("*")
            // Filters
            .eq('id', params.id)
            .single()

        return weather || null
    }


    return {
        weather: await getUserWeather()
    }


}