const logout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    window.alert("Successfully logged out!");
    document.location.replace("/");
  } else {
    alert("Failed to log out.");
  }
};

document.getElementById("logout-btn").addEventListener("click", logout);
