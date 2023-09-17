const clockElement = document.getElementById("clock");
const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");
const ampmElement = document.getElementById("ampm");
const setAlarmButton = document.getElementById("setAlarm");
const alarmListElement = document.getElementById("alarms");

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const timeString = `${hours}:${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")} ${ampm}`;
  clockElement.innerText = timeString;
}

function setAlarm() {
  const hours = parseInt(hourElement.value);
  const minutes = parseInt(minuteElement.value);
  const seconds = parseInt(secondElement.value);
  const ampm = ampmElement.value;

  if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    const alarmTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;
    const alarmItem = document.createElement("li");
    alarmItem.innerText = alarmTime;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      alarmItem.remove();
    });
    alarmItem.appendChild(deleteButton);
    alarmListElement.appendChild(alarmItem);

    // Calculate time until the alarm goes off
    const now = new Date();
    const alarmDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours + (ampm === "PM" && hours !== 12 ? 12 : 0),
      minutes,
      seconds
    );

    const timeUntilAlarm = alarmDate - now;
    if (timeUntilAlarm > 0) {
      setTimeout(() => {
        alert(`Alarm: ${alarmTime}`);
      }, timeUntilAlarm);
    }

    clearAlarmInputs();
  } else {
    alert("Please enter a valid time for the alarm.");
  }
}

function clearAlarmInputs() {
  hourElement.value = "";
  minuteElement.value = "";
  secondElement.value = "";
}

setAlarmButton.addEventListener("click", setAlarm);
setInterval(updateClock, 1000);
updateClock();