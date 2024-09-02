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
      alert("Something went wrong");
    });
};

document.getElementById("generate-btn").addEventListener("click", () => {
  const excludeNumbers = document.getElementById("exclude-numbers").checked;
  const excludeSpecialChars = document.getElementById(
    "exclude-special-chars"
  ).checked;
  generatePassword(excludeNumbers, excludeSpecialChars);
});
