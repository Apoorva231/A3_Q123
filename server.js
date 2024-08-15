const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Function: findSummation
function findSummation(n) {
    if (isNaN (n) || n <= 0) {
        return false;
    }
    return (n * (n + 1)) / 2;
}

// Function: uppercaseFirstandLast
function uppercaseFirstandLast(str) {
    return str.substring(0,1).toUpperCase()+str.substring(1,str.length-1)+str.substring(str.length-1).toUpperCase()
}

// Function: findAverageAndMedian
function findAverageAndMedian(arr) {
    if (!Array.isArray(arr) || arr.some(isNaN)) return false;

    let sum = arr.reduce((a, b) => a + b, 0);
    let avg = sum / arr.length;

    arr.sort((a, b) => a - b);
    let median = (arr.length % 2 === 0) ?
        (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2 :
        arr[Math.floor(arr.length / 2)];

    return { average: avg, median: median };
}

// Function: find4Digits
function find4Digits(str) {
    let match = str.match(/\b\d{4}\b/);
    return match ? match[0] : false;
}

app.get('/findSummation', (req, res) => {
    let n = parseInt(req.query.number, 10);
    let result = findSummation(n);
    res.send(`Summation: ${result}`);
});

app.get('/uppercaseFirstandLast', (req, res) => {
    let str = req.query.string;
    let result = uppercaseFirstandLast(str);
    res.send(`Modified String: ${result}`);
});

app.get('/findAverageAndMedian', (req, res) => {
    let arr = JSON.parse(req.query.array);
    let result = findAverageAndMedian(arr);
    res.send(`Average: ${result.average}, Median: ${result.median}`);
});

app.get('/find4Digits', (req, res) => {
    let str = req.query.string;
    let result = find4Digits(str);
    res.send(`First 4-digit number: ${result}`);
});

// Exercise 2: Cookie-based visit tracking
app.get('/numOfVisits', (req, res) => {
    let visitCount = req.cookies.visitCount ? parseInt(req.cookies.visitCount) + 1 : 1;
    let lastVisit = req.cookies.lastVisit ? new Date(req.cookies.lastVisit) : new Date();

    res.cookie('visitCount', visitCount);
    res.cookie('lastVisit', new Date());

    if (visitCount === 1) {
        res.send('Welcome to my webpage! It is your first time that you are here.');
    } else {
        res.send(`Hello, this is the ${visitCount} time that you are visiting my webpage. Last time you visited my webpage on: ${lastVisit}`);
    }
});

// Exercise 3: Phone number validation
app.post('/validatePhoneNumber', (req, res) => {
    const name= req.body.phoneName;
    const phoneNumber = req.body.phoneNumber;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (phoneRegex.test(phoneNumber)) {
        res.send(`Hello ${name}, the phone number ${phoneNumber} is in the correct format.`);
    } else {
        res.send(`Hello ${name}, the phone number ${phoneNumber} is in the incorrect format.`);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!!');
});
