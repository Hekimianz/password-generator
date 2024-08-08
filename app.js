// Get elements
const sliderValue = document.querySelector(".length__value");
const slider = document.querySelector(".length__input");
const passwordText = document.querySelector(".password__text");
const allChecks = document.querySelectorAll("input[type='checkbox']");
const checkboxUpper = document.querySelector("#uppercase");
const checkboxLower = document.querySelector("#lowercase");
const checkboxNum = document.querySelector("#numbers");
const checkboxSym = document.querySelector("#symbols");
const strengthText = document.querySelector(".strength__amount");
const strengthBoxes = Array.from(document.querySelectorAll(".strength__box"));
const generateBtn = document.querySelector(".generate__btn");
const allInputs = document.querySelectorAll("input, button");
const copyIcon = document.querySelector(".copy__icon");

document.addEventListener("DOMContentLoaded", () => {
  updateSlider();
  slider.addEventListener("input", updateSlider);
  allChecks.forEach((check) =>
    check.addEventListener("change", getStrengthLevel)
  );
  generateBtn.addEventListener("click", () => renderPass(slider.value));
  allInputs.forEach((input) => {
    input.addEventListener("input", () => {
      renderStrength(calcStrength(strNum, slider.value));
    });
    input.addEventListener("change", () => {
      renderStrength(calcStrength(strNum, slider.value));
    });
  });
  copyIcon.addEventListener("click", () => {
    const copyText = document.querySelector(".copied__text");
    copyText.style.opacity = 1;
    navigator.clipboard.writeText(passwordText.innerText);
    setTimeout(() => {
      copyText.style.opacity = 0;
    }, 2000);
  });

  getStrengthLevel();
});

function updateSlider() {
  const tempSliderValue = slider.value;
  sliderValue.textContent = tempSliderValue;
  const progress =
    ((tempSliderValue - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, var(--neon-green) ${progress}%, var(--very-dark-grey) ${progress}%)`;
}

function getStrengthLevel() {
  strNum = 0;
  allChecks.forEach((check) => (check.checked ? (strNum += 1) : null));
}

function calcStrength(num, length) {
  if (length >= 8 && num === 4) {
    return "STRONG";
  } else if (length >= 6 && num >= 3) {
    return "MEDIUM";
  } else if (length >= 4 && num >= 2) {
    return "WEAK";
  } else if (length > 4 && num == 1) {
    return "TOO WEAK!";
  } else {
    return null;
  }
}

function renderStrength(level) {
  const levelInfo = {
    "TOO WEAK!": { num: 1, color: "--red" },
    WEAK: { num: 2, color: "--orange" },
    MEDIUM: { num: 3, color: "--yellow" },
    STRONG: { num: 4, color: "--neon-green" },
  };
  const { num: levelNum, color } = levelInfo[level] || {
    num: 0,
    color: "transparent",
  };

  strengthText.innerText = level;
  strengthBoxes.forEach((box, index) => {
    if (index < levelNum) {
      box.style.backgroundColor = `var(${color})`;
      box.style.border = "none";
    } else {
      box.style.backgroundColor = `transparent`;
      box.style.border = "2px solid var(--almost-white)";
    }
  });
}

function generatePass() {
  const options = {
    length: parseInt(slider.value),
    uppercase: checkboxUpper.checked,
    lowercase: checkboxLower.checked,
    numbers: checkboxNum.checked,
    symbols: checkboxSym.checked,
  };

  if (options.length < 4) {
    copyIcon.style.pointerEvents = "none";
    copyIcon.style.opacity = "0.5";
    return null;
  }
  copyIcon.style.pointerEvents = "auto";
  copyIcon.style.opacity = "1";
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: '!@#$%^&*(),.?":{}|<>',
  };

  let characterSet = "";
  let requiredChars = [];

  Object.keys(charSets).forEach((key) => {
    if (options[key]) {
      characterSet += charSets[key];
      requiredChars.push(
        charSets[key][Math.floor(Math.random() * charSets[key].length)]
      );
    }
  });

  if (characterSet === "") return "Must select at least one character type";

  let password = "";

  for (let i = requiredChars.length; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    password += characterSet[randomIndex];
  }

  password += requiredChars.join("");

  password = shuffleString(password);

  return password;
}

function shuffleString(string) {
  const array = string.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
}

function renderPass() {
  passwordText.innerText = generatePass();
}
