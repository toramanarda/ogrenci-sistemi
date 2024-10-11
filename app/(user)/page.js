import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const {data :{user}, error} = await supabase.auth.getUser();
  if(!user){
    redirect("/login");
  }
  return (
   <>
   </>
    
  );
}
