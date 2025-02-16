// Play Video
function playVideo() {
    alert("Play the explanation video.");
  }
  
  // Dark Mode Toggle
  document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

// Timer functionality
let timer;
let isRunning = false;
let workDuration = 25 * 60; // 25 minutes
let breakDuration = 5 * 60; // 5 minutes
let currentTime = workDuration;
let isWorkTime = true;

document.addEventListener('DOMContentLoaded', function() {
    // Timer
    const timer = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    let time = 1500; // 25 minutes in seconds
    let intervalId = null;
    
    function updateTimer() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    startBtn.onclick = function() {
        if (!intervalId) {
            intervalId = setInterval(() => {
                time--;
                updateTimer();
                if (time === 0) {
                    clearInterval(intervalId);
                    intervalId = null;
                    alert("Time's up!");
                }
            }, 1000);
        }
    };
    
    pauseBtn.onclick = function() {
        clearInterval(intervalId);
        intervalId = null;
    };
    
    resetBtn.onclick = function() {
        clearInterval(intervalId);
        intervalId = null;
        time = 1500;
        updateTimer();
    };
    
    // To-Do List
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    
    addTaskBtn.onclick = function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${taskText}
                <button class="btn btn-danger btn-sm">×</button>
            `;
            
            li.querySelector('button').onclick = function() {
                li.remove();
            };
            
            taskList.appendChild(li);
            taskInput.value = '';
        }
    };
    
    taskInput.onkeypress = function(e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    };
});

// Background Sounds functionality
function playSound(type) {
  const audio = new Audio(`assets/sounds/${type}.mp3`);
  audio.volume = document.getElementById('volume-control').value / 100;
  audio.play();
}