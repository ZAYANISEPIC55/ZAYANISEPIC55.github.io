import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/*
  🔧 SETUP REQUIRED:
  Replace these with your Supabase project values
*/
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";

const supabase = createClient(supabaseUrl, supabaseKey);

// LOGIN (Google OAuth)
document.getElementById("loginBtn").onclick = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google"
  });
};

// LOGOUT
window.logout = async () => {
  if(confirm("Are you sure you want to logout?")){
    await supabase.auth.signOut();
  }
};

// MENU TOGGLE
window.toggleMenu = () => {
  document.getElementById("dropdown").classList.toggle("hidden");
};

// AUTH STATE
supabase.auth.onAuthStateChange((event, session) => {
  const user = session?.user;

  if(user){
    document.getElementById("loginBtn").style.display="none";
    document.getElementById("userMenu").classList.remove("hidden");
    document.getElementById("userName").textContent =
      user.user_metadata?.full_name || user.email;
  } else {
    document.getElementById("loginBtn").style.display="block";
    document.getElementById("userMenu").classList.add("hidden");
  }
});
