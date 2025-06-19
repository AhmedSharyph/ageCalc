const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const resultEl = document.getElementById("result");

// Populate Year (1900 - current year)
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 1900; y--) {
  yearEl.innerHTML += `<option value="${y}">${y}</option>`;
}

// Populate Month
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
months.forEach((name, i) => {
  monthEl.innerHTML += `<option value="${i}">${name}</option>`;
});

// Enable Tom Select on Year and Month
const yearSelect = new TomSelect("#year", { placeholder: "Select Year" });
const monthSelect = new TomSelect("#month", { placeholder: "Select Month" });

// Update Day dropdown
function updateDays() {
  const y = parseInt(yearEl.value);
  const m = parseInt(monthEl.value);

  if (isNaN(y) || isNaN(m)) {
    dayEl.innerHTML = '<option value="">Select Day</option>';
    return;
  }

  const totalDays = new Date(y, m + 1, 0).getDate();
  dayEl.innerHTML = '<option value="">Select Day</option>';
  for (let d = 1; d <= totalDays; d++) {
    dayEl.innerHTML += `<option value="${d}">${d}</option>`;
  }
}

// Calculate Age
function calculateAge() {
  const y = parseInt(yearEl.value);
  const m = parseInt(monthEl.value);
  const d = parseInt(dayEl.value);

  if (isNaN(y) || isNaN(m) || isNaN(d)) {
    resultEl.textContent = '';
    return;
  }

  const dob = new Date(y, m, d);
  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  let output = '';
  if (years > 0) {
    output = `${years}Y`;
    if (months > 0 && days === 0) {
      output += ` ${months}M`;
    } else if (months > 0) {
      output += ` ${months}M ${days}D`;
    } else if (days > 0) {
      output += ` 0M ${days}D`;
    }
  } else if (months > 0) {
    output = `${months}M`;
    if (days > 0) output += ` ${days}D`;
  } else {
    output = `${days}D`;
  }

  resultEl.textContent = output;
}

// Events
yearEl.addEventListener("change", () => {
  updateDays();
  calculateAge();
});
monthEl.addEventListener("change", () => {
  updateDays();
  calculateAge();
});
dayEl.addEventListener("change", calculateAge);

// Copy button
document.getElementById("copyBtn").addEventListener("click", () => {
  const text = resultEl.textContent;
  if (text.trim()) {
    navigator.clipboard.writeText(text)
      .then(() => alert("Copied: " + text))
      .catch(() => alert("Failed to copy"));
  } else {
    alert("Nothing to copy");
  }
});

// Reset button
document.getElementById("resetBtn").addEventListener("click", () => {
  yearSelect.clear(true);
  monthSelect.clear(true);
  dayEl.innerHTML = '<option value="">Select Day</option>';
  resultEl.textContent = '';
});
