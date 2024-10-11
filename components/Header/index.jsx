import { signOut } from "@/actions/auth";
import { createClient } from "@/utils/supabase/server"



export default async function Header() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  console.log(user);

  return (
    <ul>
      {user && (
        <div className="admin-header">
          <span>Hoşgeldiniz <strong>Sayın</strong> <em><strong>{user.email}</strong></em></span>
          <form action={signOut}>
            <button className="cikis">Çıkış Yap</button>
          </form>
        </div>
      )
      }
    </ul>
  )
}