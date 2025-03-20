console.clear();

// Selecting elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("slider");
const lengthValueEl = document.getElementById("length-value");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy-btn");

// Update range slider value
lengthEl.addEventListener("input", () => {
    lengthValueEl.innerText = lengthEl.value;
});

// Random character generators
const randomFunc = {
    lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
    upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
    number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
    symbol: () => "~!@#$%^&*()_+{}\":?><;.,[]"[Math.floor(Math.random() * 15)]
};

// Generate password
function generatePassword(length, lower, upper, number, symbol) {
    let generatedPassword = "";
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesArr.length === 0) return "";

    for (let i = 0; i < length; i++) {
        const randomType = typesArr[Math.floor(Math.random() * typesArr.length)];
        const funcName = Object.keys(randomType)[0];
        generatedPassword += randomFunc[funcName]();
    }

    return generatedPassword.split('').sort(() => Math.random() - 0.5).join('');
}

// Handle Generate Button Click
generateBtn.addEventListener("click", () => {
    const length = parseInt(lengthEl.value, 10);
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    if (!(hasLower || hasUpper || hasNumber || hasSymbol)) {
        alert("Please select at least one option!");
        return;
    }

    const password = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);

    console.log("Generated Password:", password); // Debugging

    resultEl.innerText = password || "Error generating password!";
});

// Copy Password to Clipboard
copyBtn.addEventListener("click", () => {
    const password = resultEl.innerText;

    if (!password || password === "CLICK GENERATE") {
        alert("No password to copy!");
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
    }).catch(err => console.error("Copy failed!", err));
});

