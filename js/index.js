const apiKey = "VqX5koegh8IRelt4umtTWA==IVC0lk1bsYeyyfoS";
const apiUrl = "https://api.api-ninjas.com/v1/passwordgenerator";

// Function for printing out success status
const displayStatusMessage = (message, isSuccess) => {
  const statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = message;
  statusMessage.classList.remove("success", "error");
  if (isSuccess) {
    statusMessage.classList.add("success");
  } else {
    statusMessage.classList.add("error");
  }
  setTimeout(() => {
    statusMessage.textContent = "";
    statusMessage.classList.remove("success", "error");
  }, 6000);
};

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
      displayStatusMessage(
        "There was a problem generating the password",
        false
      );
    });
};

const copyToClipboard = (text) => {
  if (text.length === 0) {
    displayStatusMessage("There is no password currently generated.", false);
    return;
  }
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("success!");
        displayStatusMessage("Password copied to clipboard", true);
      })
      .catch((err) => {
        console.error("Failed to copy password:", err);
        displayStatusMessage(
          "There was a problem generating the password",
          false
        );
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
      displayStatusMessage("Password copied to clipboard", true);
    } catch (err) {
      console.error("Failed to copy password:", err);
      displayStatusMessage("Failed to copy password", false);
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

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});
