let alarmInterval;
    const clock = document.getElementById("clock");
    clock.innerHTML = "00:00:00";

    function setAlarm(){
        const alarmTime = document.getElementById("alarmTime").value;
        if (alarmTime) {
            const now = new Date();
            const alarm = new Date(now.toDateString() + ' ' + alarmTime);

            const currentTime = new Date();
            const timeUntilAlarm = alarm - currentTime;

            if (timeUntilAlarm <= 0) {
                alert("Please enter a time that is in the future");
                return
            }

            alarmInterval = setInterval(function () {
                const currentTime = new Date();
                const timeUntilAlarm = alarm - currentTime;

                if(timeUntilAlarm <= 0){
                    alert("Time's up")
                    clearInterval(alarmInterval);
                } else {
                    displayTime(timeUntilAlarm);
                }
            }, 1000)
        }
    }

    function displayTime(time) {
            const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((time % (1000 * 60)) / 1000);

            const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            clock.innerHTML = timeString;
    }

    function stopAlarm() {
            clearInterval(alarmInterval);
            document.getElementById("clock").textContent = '00:00:00';
    }

    setInterval(()=>{
        let h1 = document.getElementById("h1");
        let date = new Date();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        h1.innerHTML = `${hour}:${min}:${sec} ${hour >= 12 ? `PM` : `AM`}`
    }, 1000)