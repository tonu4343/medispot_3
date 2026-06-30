document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
    return;
  }

  const userId = data.user.id;
  const { data: profile, error: profileError } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    alert("プロフィール情報を取得できませんでした。");
    return;
  }

  location.href = profile.role === "seeker" ? "seeker-home.html" : "employer-home.html";
});

document.getElementById("seekerDemo").addEventListener("click", () => {
  location.href = "seeker-home.html";
});

document.getElementById("employerDemo").addEventListener("click", () => {
  location.href = "employer-home.html";
});

document.getElementById("adminDemo").addEventListener("click", () => {
  location.href = "admin-home.html";
});
