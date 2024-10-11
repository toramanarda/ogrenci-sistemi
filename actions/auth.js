"use server"
import { createClient } from "@/utils/supabase/server";

const defaultUserMetadata = {
  role: "admin",

}

export async function signOut() {
  console.log("buraya geldi");
  const supabase = createClient();
  const { error } = await supabase.auth.signOut()

}

export async function signUp(formData) {

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp(
    {
      email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      options: {
        data: {
          ...defaultUserMetadata,
          bio: "Hello World",
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          role: "admin"
        }
      }
    }
  )
}