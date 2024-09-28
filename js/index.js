const apiKey = "VqX5koegh8IRelt4umtTWA==IVC0lk1bsYeyyfoS";
const apiUrl = "https://api.api-ninjas.com/v1/passwordgenerator";

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
      Swal.fire({
        title: "Failure!",
        text: "An error occurred while generating the password.",
        icon: "error",
      });
    });
};

const copyToClipboard = (text) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Password copied to clipboard");
        Swal.fire({
          title: "Success!",
          text: "Password copied to clipboard.",
          icon: "success",
        });
      })
      .catch((err) => {
        console.error("Failed to copy password:", err);
        Swal.fire({
          title: "Failure!",
          text: "There was a problem copying the password to the clipboard.",
          icon: "error",
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
      Swal.fire({
        title: "Success!",
        text: "Password copied to clipboard.",
        icon: "success",
      });
    } catch (err) {
      console.error("Failed to copy password:", err);
      Swal.fire({
        title: "Failure!",
        text: "There was a problem copying the password to the clipboard.",
        icon: "error",
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
