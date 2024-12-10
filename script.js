document.addEventListener("DOMContentLoaded", function(event) { 

let polySynth;

let data, tempConversion 

let currentRow = 0

const apiKey = "360f4b51318387452adfe577e6cbc8ea";
let startDateMS = new Date('2023-01-02').getTime();
let startDate = Math.floor(startDateMS / 1000); // start date
let weatherURL
let weather;


function preload() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3xMB4Kf0960LvHIgskymKDbn9fp80J0jQEVByy0DcDNBMVOS6t_DHlJ6mhgFrsVfJu1IlnmHj4lFR/pub?output=csv";

    // Load the CSV file
    loadTable(url, 'csv', 'header', table => {
         data = table
         console.log(data)
    }, error => {
        console.error('Error loading CSV:', error);
    });

    // let dateToGet = startDate;
	// for (i = 0; i < 10; i ++) {
	// 	dateToGet += 86400; // 1 day in seconds
	// 	weatherURL= "https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=51.44&lon=5.47&dt=" + dateToGet + "&appid=" + apiKey + "&units=metric"
	// 	loadData();
	// }
    // console.log(yearOfWeather);

    const urlTemp = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZz9td7Olf335rKHrOhTpVrsUnY0BUmVUQ0AaF9sUq03X76DhvAv6UHJEwCwtqrB1ADkwfvIe7qzfE/pub?output=csv"

    // Load the CSV file
    loadTable(urlTemp, 'csv', 'header', table => {
        tempConversion = table
        console.log(tempConversion);
    }, error => {
        console.error('Error loading CSV:', error);
    });
}

function setup() {
    	// Load in properties
// 	createCanvas(displayWidth, displayHeight);

//   let cnv = createCanvas(400, 400);
// //   cnv.mousePressed(playSynth);
//   background(230);
//   text('Click to advance 10 minutes', 20, 20);

  polySynth = new p5.PolySynth();
  getAudioContext().resume();

}


function mousePressed() {
    getAudioContext().resume();
    playDay(currentRow);
    currentRow++
    if (currentRow == 47) {
        currentRow = 0;
    }
}


function playDay(day) {

    let intervalDuration = 1.3;
    let vol = 0.2;
    let temperature = data.get(day,4);
    let cloudy = data.get(day,2);
    let rain = data.get(day,3);
    let isRainy = data.get(day,3) == 0 ? 0 : 1;
    console.log(isRainy);
    let wind = data.get(day,5);
    let sun = data.get(day,7);
    let timeThe = data.get(day,1);

    let cloudySunNote = getNote(27 + Math.floor(10 * cloudy / 100));
    let temperatureSound = getNote(temperature);
    let rainSound = getNote(rain);

   changeTime(timeThe);

    polySynth.play(temperatureSound, cloudy * vol / 100, 0, intervalDuration);
    if (isRainy) {
        polySynth.play(rainSound, vol / 2, intervalDuration * 0.76, intervalDuration / 9);
        polySynth.play(rainSound, vol / 3, intervalDuration * 0.76 + 2 * intervalDuration / 9, intervalDuration / 10);
    }
    polySynth.play(cloudySunNote, vol * 2, 0 ,intervalDuration);
    polySynth.play("F3", vol * 3 * sun, 0, intervalDuration);
// temperature volume is modulated by cloudiness.
// rain enters 2/3 of the way in.
// the sun is the bass, pitch is modulated by cloudiness.
}

function getNote(temp) {
    // let row = tempConversion.findRow(Math.floor(temp), "temperature")
    // let note = row.get('note');
    let note = tempConversion.get(Math.floor(temp), 1);
    return note;
}

function changeTime(time){
    document.getElementById("timeOfDay").innerHTML = time;
  }

// function playSynth() {
//   userStartAudio();

//   // note duration (in seconds)
//   let dur = 1.5;

//   // time from now (in seconds)
//   let time = 0;

//   // velocity (volume, from 0 to 1)
//   let vol = 0.1;

//   polySynth.play('G2', vol, 0, dur);
//   polySynth.play('C3', vol, time += 1/3, dur);
//   polySynth.play('G6', vol, time += 2/3, dur);

// }

  });