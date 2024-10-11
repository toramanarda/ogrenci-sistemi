import { signOut } from "@/actions/auth";
import { createClient } from "@/utils/supabase/server"
import App from "./page";
import Link from "next/link";

export default async function StudentsTable() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  console.log(user);

  return (
    <ul>
      {user ? (
        <div className="admin-header">
          <App />
        </div>
      ) : (
        <>
        </>
      )}
    </ul>
  )
}