import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {

    depends('dashboard:now')

    // Fatch user weathers 
    const getUserWeathers = async () => {
        let { data: weathers, error } = await supabase
            .from('weathers')
            .select('*')
            .order("created_at", { ascending: false }) // newest first

            return weathers || []
    }


    return{
       weathers: await getUserWeathers() 
    }


}