// button controls
const start = document.querySelector('button.start')
const stop = document.querySelector('button.stop')
const lap = document.querySelector('button.lap')
const reset = document.querySelector('button.reset')

// DOM elements that needs to be updated
const lapList = document.querySelector('#lapList')
const stopwatchTime = document.querySelector('#stopwatchTime')

// constants that shouldn't ever change
const laps = []
const intervalRate = 10 // update the stopwatch every 10 milliseconds

// values that will change pretty often
let intervalId = null
let rawTime = 0
let stopwatchRunning = false

// turns the time into a human readable format
function formatTime (raw) {
  let seconds = Math.floor(raw / 1000)
  let fractionalSeconds = (raw % 1000) / 1000
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (60 * minutes) + fractionalSeconds

  return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}

// start the stopwatch by creating a new interval
// we will store the intervalId so we can manipulate the interval later
function stopwatchStart(event){
    event.preventDefault()
    console.log('started!')

    if (stopwatchRunning == false){
      stopwatchRunning = true
      // every 10 milliseconds, update the stopwatch
      intervalId = setInterval(stopwatchUpdate, intervalRate)
    }
}

// adds the interval to the stopwatch time since the last "click"
// then update the DOM with the new stopwatch time
function stopwatchUpdate(){
  rawTime += intervalRate
  stopwatchTime.innerHTML = formatTime(rawTime)
}

// stops the stopwatch by clearing the interval
function stopwatchStop(event){
  event.preventDefault()
  console.log('stopped!')

  stopwatchRunning = false
  clearInterval(intervalId)
}

// Record all lap times and displays in a list
function stopwatchLap(){
    event.preventDefault()
    console.log('lap!')

    // console.log(stopwatchTime.innerHTML)
    // if the lap is clicked before starting the stopwatch or when the stopwatch
    // is reset do not display the laplist
    if (stopwatchTime.innerHTML == formatTime(0)){
      lapList.innerHTML = ""
    }
    else {
    laps.push(stopwatchTime.innerHTML) // adds the lap time to an array

    // displays the laps recorded in the lap array
    lapList.innerHTML = "" // clears the lap list to begin with
    for (i=0; i<laps.length; i++){
      var liLapItem = document.createElement("li")
      liLapItem.innerHTML = laps[i]
      lapList.appendChild(liLapItem)
    }
  }
}

// resets the stopwatch to _0:00.00_
function stopwatchReset(){
    event.preventDefault()
    console.log('reset!')

    stopwatchRunning = false
    clearInterval(intervalId) // if reset is clicked before stopping the stopwatch
    stopwatchTime.innerHTML = formatTime(0)

    // deletes the lapList array items
    laps.length = 0
    // or while (laps.length > 0){
    //       laps.pop()
    //     }

    // clears the lap list
    lapList.innerHTML = ""
}

// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : ''
  return `${pad}${value}`
}

document.addEventListener("DOMContentLoaded", function () {
  console.log('ready!')
  stopwatchTime.innerHTML = formatTime(0) // initially display the stopwatch as _0:00.00_
  start.addEventListener("click", stopwatchStart)
  stop.addEventListener("click", stopwatchStop)
  lap.addEventListener("click", stopwatchLap)
  reset.addEventListener("click", stopwatchReset)
})
