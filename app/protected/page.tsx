import AuthButton from "@/components/AuthButton";
import Player from "@/components/Player";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();
  const { data: notes } = await supabase.from('player').select()


  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div> 
        <nav className="h-screen w-full flex flex-col justify-center pb-16 items center">
          <div className="h-16 border-b border-b-foreground/10 flex justify-end p-4 ">
             <AuthButton />
          </div >
            <Player />
        </nav>
            {/* <div className="h-screen w-screen flex items-center justify-center"> */}
            {/* <pre>{JSON.stringify(notes, null, 2)}</pre> */}
            </div>
            
          // </div>
  );
}
