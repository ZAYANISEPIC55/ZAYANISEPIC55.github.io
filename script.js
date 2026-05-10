import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/*
  🔧 SUPABASE CONFIG
*/
const supabaseUrl = "https://ejyketssrvhnttejrnxu.supabase.co";
const supabaseAnonKey = "sb_publishable_w035s5tqUboEs1Z-YCI8Tw_HsCyk9ue";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/*
  🔐 OPEN / CLOSE LOGIN MODAL
*/
function openLogin() {
  document.getElementById("loginModal")?.classList.remove("hidden");
}
function closeLogin() {
  document.getElementById("loginModal")?.classList.add("hidden");
}

window.openLogin = openLogin;
window.closeLogin = closeLogin;

/*
  🔵 GOOGLE LOGIN
*/
async function loginWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin
    }
  });
}
window.loginWithGoogle = loginWithGoogle;

/*
  ✉️ EMAIL LOGIN (MAGIC LINK)
*/
async function loginWithEmail() {
  const email = document.getElementById("emailInput")?.value;

  if (!email) {
    alert("Please enter an email");
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin
    }
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Check your email for login link!");
    closeLogin();
  }
}
window.loginWithEmail = loginWithEmail;

/*
  🚪 LOGOUT (CONFIRMATION)
*/
async function logout() {
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (!confirmLogout) return;

  await supabase.auth.signOut();
}
window.logout = logout;

/*
  📋 DROPDOWN TOGGLE
*/
function toggleMenu() {
  document.getElementById("dropdown")?.classList.toggle("hidden");
}
window.toggleMenu = toggleMenu;

/*
  👤 UPDATE UI
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
  🔄 INIT SESSION
*/
async function initAuth() {
  const { data } = await supabase.auth.getSession();
  updateUI(data.session?.user);
}

initAuth();

/*
  🔁 LISTEN FOR AUTH CHANGES
*/
supabase.auth.onAuthStateChange((_event, session) => {
  updateUI(session?.user);
});
