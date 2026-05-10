import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/*
  🔧 SUPABASE CONFIG
*/
const supabaseUrl = "https://ejyketssrvhnttejrnxu.supabase.co";
const supabaseAnonKey = "sb_publishable_w035s5tqUboEs1Z-YCI8Tw_HsCyk9ue";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/*
  🔐 LOGIN (Google OAuth)
*/
async function login() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin
    }
  });
}
window.login = login;

/*
  🚪 LOGOUT (with confirmation)
*/
async function logout() {
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (!confirmLogout) return;

  await supabase.auth.signOut();
}
window.logout = logout;

/*
  📋 DROPDOWN MENU TOGGLE
*/
function toggleMenu() {
  document.getElementById("dropdown")?.classList.toggle("hidden");
}
window.toggleMenu = toggleMenu;

/*
  👤 UPDATE UI BASED ON USER STATE
*/
function updateUI(user) {
  const loginBtn = document.getElementById("loginBtn");
  const userMenu = document.getElementById("userMenu");
  const userName = document.getElementById("userName");

  if (!loginBtn || !userMenu) return;

  if (user) {
    loginBtn.style.display = "none";
    userMenu.classList.remove("hidden");

    userName.textContent =
      user.user_metadata?.full_name ||
      user.email;
  } else {
    loginBtn.style.display = "block";
    userMenu.classList.add("hidden");
  }
}

/*
  🔄 GET INITIAL SESSION (IMPORTANT)
*/
async function initAuth() {
  const { data } = await supabase.auth.getSession();
  updateUI(data.session?.user);
}

initAuth();

/*
  🔁 LISTEN FOR LOGIN / LOGOUT CHANGES
*/
supabase.auth.onAuthStateChange((_event, session) => {
  updateUI(session?.user);
});
