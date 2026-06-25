const form = document.getElementById("registerForm");

function valueOf(id) {
  const element = document.getElementById(id);
  return element ? element.value.trim() : "";
}

function selectedRole() {
  const roleInput = document.querySelector('input[name="role"]');
  return roleInput ? roleInput.value : "seeker";
}

function displayNameFor(role) {
  if (role === "employer") {
    return valueOf("facility-name") || valueOf("contact-name") || valueOf("name");
  }
  const fullName = `${valueOf("last-name")} ${valueOf("first-name")}`.trim();
  return fullName || valueOf("name");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const role = selectedRole();
  const name = displayNameFor(role);
  const email = valueOf("email");
  const passwordInput = document.getElementById("password");
  const password = passwordInput ? passwordInput.value : "";

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
    alert("プロフィール登録に失敗しました。時間をおいて再度お試しください。");
    return;
  }

  alert("登録が完了しました。");
  location.href = role === "seeker" ? "seeker-home.html" : "employer-home.html";
});