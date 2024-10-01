const apiKey = "VqX5koegh8IRelt4umtTWA==IVC0lk1bsYeyyfoS";
const apiUrl = "https://api.api-ninjas.com/v1/passwordgenerator";

// Function for password generation logic
const generatePassword = (
  excludeNumbers = false,
  excludeSpecialChars = false
) => {
  const url = new URL(apiUrl);
  const params = {
    exclude_numbers: excludeNumbers,
    exclude_special_chars: excludeSpecialChars,
  };

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("output").textContent = data.random_password;
    })
    .catch((error) => {
      console.error("Failed to fetch password:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error generating the password",
        icon: "error",
        confirmButtonText: "Try again",
      });
    });
};

const copyToClipboard = (text) => {
  if (text.length === 0) {
    Swal.fire({
      title: "Error!",
      text: "You can not copy an empty password",
      icon: "info",
      confirmButtonText: "Try again",
    });
    return;
  }
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("success!");
        Swal.fire({
          title: "Thank you!",
          text: "Password has been copied to clipboard.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error("Failed to copy password:", err);
        Swal.fire({
          title: "Error!",
          text: "There was an error generating the password",
          icon: "error",
          confirmButtonText: "Try again",
        });
      });
  } else {
    // Fallback for older browsers or mobile issues
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      console.log("success!");
      Swal.fire({
        title: "Thank you!",
        text: "Password has been copied to clipboard.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error("Failed to copy password:", err);
      Swal.fire({
        title: "Error!",
        text: "There was an error generating the password",
        icon: "error",
        confirmButtonText: "Try again",
      });
    }
    document.body.removeChild(textarea);
  }
};

document.getElementById("copy-btn").addEventListener("click", () => {
  const password = document.getElementById("output").textContent;
  copyToClipboard(password);
});

document.getElementById("generate-btn").addEventListener("click", () => {
  const excludeNumbers = document.getElementById("exclude-numbers").checked;
  const excludeSpecialChars = document.getElementById(
    "exclude-special-chars"
  ).checked;
  generatePassword(excludeNumbers, excludeSpecialChars);
});

// Dark mode logic
const toggleButton = document.getElementById("theme-toggle-btn");
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
toggleButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});
