document.getElementById("registerForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const role = document.querySelector('input[name="role"]:checked').value;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  const userId = data.user && data.user.id;
  if (!userId) {
    alert("確認メールを送信しました。メールを確認して登録を完了してください。");
    return;
  }

  const { error: profileError } = await supabaseClient.from("profiles").insert({
    id: userId,
    role,
    name,
    email
  });

  if (profileError) {
    alert("プロフィール登録に失敗しました。");
    return;
  }

  alert("登録が完了しました。");
  location.href = role === "seeker" ? "seeker-home.html" : "employer-home.html";
});
