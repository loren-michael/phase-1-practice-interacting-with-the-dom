// Set up variables
let counterDisplay = document.getElementById('counter');
let count;
let currentCount = count;
let isActive = true;
const decButton = document.getElementById('minus');
const incButton = document.getElementById('plus');
const likeButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
// const likes = [...document.getElementsByClassName('likes')][0];
const likes = document.querySelector('.likes');
const commentSection = document.getElementById('list');
const commentForm = document.getElementById('comment-form')
const commentInput = document.getElementById('comment-input');
const submitBtn = document.getElementById('submit');
// const buttons = Array.from(document.querySelectorAll("button"));
// const notPauseButtons = buttons.filter(button => button.id !== "pause");


// console.log(notPauseButtons)

// Event Listeners

// See the timer increment every second once the page has loaded.

document.addEventListener("DOMContentLoaded", startCounter);

function startCounter() {
    count = setInterval(incCounter, 1000);
}


// Buttons that manually change the count

incButton.addEventListener('click', incCounter)

function incCounter() {
    const currentCount = parseInt(counterDisplay.textContent, 10);
    counterDisplay.textContent = `${currentCount + 1}`;
}


decButton.addEventListener('click', decCounter)

function decCounter() {
    const currentCount = parseInt(counterDisplay.textContent, 10);
    if (currentCount > 0) {
    counterDisplay.textContent = `${currentCount - 1}`;
    }
}



// Form submit event listener and function to handle the comment

document.addEventListener('DOMContentLoaded', () => {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleComment(e.target.comment_input.value);
        commentForm.reset()
    }) 
});

function handleComment (comment) {
    let p = document.createElement('p');
    p.textContent = comment;
    commentSection.appendChild(p);
}



// "Like" an individual number of the counter. I should see the count of the number of "likes" associated with that number displayed.


document.addEventListener('DOMContentLoaded', () => {
    likeButton.addEventListener('click', (e) => {
        e.preventDefault();
        addLike();
    })
})


function addLike() {
    const currentCount = parseInt(counterDisplay.textContent, 10)
    const previousLikes = Array.from(likes.children);
    const previousLike = previousLikes.find(previousLike => {
        const previousLikeCount = parseInt(previousLike.textContent.split(" ")[0], 10);
        return previousLikeCount === currentCount;
    })
    if (previousLike) {
        const previousHeartsText = previousLike.textContent.split(" ").slice(-2)[0];
        const numberOfHearts = parseInt(previousHeartsText, 10);
        previousLike.textContent = 
            `${currentCount} has been liked ${numberOfHearts + 1} times`;
    } else {
        const newLikeText = document.createElement('li')
        newLikeText.textContent = `${currentCount} has been liked 1 time`;
        likes.appendChild(newLikeText);
    };
}


// Pause the counter, which should:
//      pause the counter
//      disable all buttons except the pause button
//      switch the label on the button from "pause" to "resume"
// Click the "restart" button to restart the counter and re-enable the buttons.

function pauseOrResume() {
    if (pauseButton.innerText === 'pause') {
        pauseButton.innerText = 'resume';
        clearInterval(count);
        incButton.disabled = true;
        decButton.disabled = true;
        likeButton.disabled = true;
        submitBtn.disabled = true;
    } else {
        pauseButton.innerText = 'pause';
        startCounter();
        incButton.disabled = false;
        decButton.disabled = false;
        likeButton.disabled = false;
        submitBtn.disabled = false;
    }
}



// function pauseOrResume() {
//     if (isActive = true) {
//         isActive = false;
//         clearInterval(count);
//         pauseButton.textContent = "resume";
//         incButton.disabled = true;
//         // notPauseButtons.disabled = false;
//     } else {
//         isActive = true;
//         startCounter(count);
//         pauseButton.textContent = "pause";
//         incButton.disabled = false;
//         // notPauseButtons.disabled = true;
//     }

// };

pauseButton.addEventListener('click', pauseOrResume);
