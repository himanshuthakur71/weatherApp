import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ fetch, locals: { supabase } }) => {


    // Fatch user weathers 
    const getUserWeathers = async () => {
        let { data: weathers, error } = await supabase
            .from('weathers')
            .select('*')

            return weathers
    }


    return{
       weathers: await getUserWeathers() 
    }


}