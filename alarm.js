let alarms = JSON.parse(localStorage.getItem("alarms")) || [];

const saveAlarms = () => {
  localStorage.setItem("alarms", JSON.stringify(alarms));
};

const renderAlarms = () => {
  const alarmsContainer = document.getElementById("alarmsContainer");
  alarmsContainer.innerHTML = "";

  alarms.forEach((alarm, index) => {
    const alarmRow = document.createElement("tr");
    alarmRow.classList.add("alarm");
    alarmRow.innerHTML = `
            <td>${alarm.time}</td>
            <td id="countdown-${index}">${formatTime(alarm.remainingTime)}</td>
            <td><button onclick="editAlarm(${index})">Edit</button></td>
            <td><button onclick="deleteAlarm(${index})">Delete</button></td>
        `;
    alarmsContainer.appendChild(alarmRow);
  });
};

const addAlarm = () => {
  const alarmTime = document.getElementById("alarmTime").value;
  if (alarmTime) {
    const now = new Date();
    const alarm = new Date(now.toDateString() + " " + alarmTime);

    if (alarm <= now) {
      alert("Please enter a time that is in the future");
      return;
    }

    const remainingTime = alarm - now;
    alarms.push({ time: alarmTime, intervalId: null, remainingTime });
    saveAlarms();
    renderAlarms();
    setAlarm(alarmTime, remainingTime);
  }
};

const setAlarm = (alarmTime, remainingTime) => {
  const now = new Date();
  const alarm = new Date(now.toDateString() + " " + alarmTime);

  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeUntilAlarm = alarm - currentTime;

    if (timeUntilAlarm <= 0) {
      alert("Time's up for " + alarmTime);
      clearInterval(intervalId);
      alarms = alarms.filter((alarm) => alarm.time !== alarmTime);
      saveAlarms();
      renderAlarms();
    } else {
      const alarmIndex = alarms.findIndex((alarm) => alarm.time === alarmTime);
      alarms[alarmIndex].remainingTime = timeUntilAlarm;
      saveAlarms();
      updateCountdown(alarmIndex, timeUntilAlarm);
    }
  }, 1000);

  alarms = alarms.map((alarm) =>
    alarm.time === alarmTime ? { ...alarm, intervalId } : alarm
  );
  saveAlarms();
};

const updateCountdown = (index, timeUntilAlarm) => {
  const countdownElement = document.getElementById(`countdown-${index}`);
  countdownElement.textContent = formatTime(timeUntilAlarm);
};

const formatTime = (time) => {
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

const editAlarm = (index) => {
  const newTime = prompt(
    "Enter new time for the alarm (HH:MM)",
    alarms[index].time
  );
  if (newTime) {
    if (alarms[index].intervalId) {
      clearInterval(alarms[index].intervalId);
    }
    const now = new Date();
    const newAlarm = new Date(now.toDateString() + " " + newTime);
    const remainingTime = newAlarm - now;
    alarms[index].time = newTime;
    alarms[index].remainingTime = remainingTime;
    setAlarm(newTime, remainingTime);
    saveAlarms();
    renderAlarms();
  }
};

const deleteAlarm = (index) => {
  if (alarms[index].intervalId) {
    clearInterval(alarms[index].intervalId);
  }
  alarms.splice(index, 1);
  saveAlarms();
  renderAlarms();
};

setInterval(() => {
  const h1 = document.getElementById("h1");
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  const sec = date.getSeconds().toString().padStart(2, "0");
  h1.innerHTML = `${hour}:${min}:${sec}`;
}, 1000);

document.addEventListener("DOMContentLoaded", () => {
  renderAlarms();
  alarms.forEach((alarm) => setAlarm(alarm.time, alarm.remainingTime));
});
