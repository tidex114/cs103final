/*
==============================
MATERIAL NOT COVERED IN LECTURES
==============================

while (i <= currentQuestion) { ... } — uses a while loop to repeatedly check each question number until reaching the current question.
element.classList.remove("hidden"); — uses classList to remove the “hidden” class so the element becomes visible.
requestAnimationFrame(() => { ... }); — schedules the function to run on the next screen repaint for smoother animations.
element.scrollIntoView({ behavior: "smooth", block: "center" }); — scrolls the page so the element smoothly moves into view and is centered.
const input = element.querySelector("input"); — selects the first input field inside the given element using a CSS selector.
if (input) input.focus(); — focuses the input element so the user can start typing immediately.
input.value.trim() === "" — removes leading and trailing spaces from the input value before checking if it is empty.
message.dataset.state = "warn"; — sets the custom data attribute data-state="warn" so CSS can style the message accordingly.
const nextP = document.querySelector('p[data-q="' + currentQuestion + '"]'); — selects the <p> with the matching data-q attribute for the next question.
const robotSection = document.getElementById("robotSection"); smoothReveal(robotSection); — gets the robot section by ID and reveals it using the helper function.
finishBtn.classList.remove("hidden"); — makes the finish button visible by removing the “hidden” class.
continueBtn.classList.add("hidden"); — hides the continue button by adding the “hidden” class.
const robotCheck = document.getElementById("robotCheck"); robotCheck.checked — checks whether the robot checkbox is selected.
robotCheck.checked = true; — programmatically sets the checkbox to checked.
setTimeout(function () { ... }, 800); — waits 800ms before running the code inside the function.
window.location.href = redirectUrl; — changes the browser's current page to the provided URL.
const all = document.querySelectorAll('p[data-q]'); — selects all <p> elements that have a data-q attribute.
all.forEach(p => p.classList.remove('hidden')); — loops through all selected elements and removes the “hidden” class from each.
if (robotSection) robotSection.classList.remove('hidden'); — checks if the element exists, then reveals it.
if (message) { message.innerHTML = "..."; message.dataset.state = "info"; } — updates the message text and its data-state attribute if the element exists.
document.addEventListener('DOMContentLoaded', function () { ... }); — waits for the document to finish loading before running setup code.
revealBtn.addEventListener('click', revealAllQuestions); — attaches a click event listener to the reveal button.
autoCheckBtn.addEventListener('click', autoCheckRobot); — attaches a click event listener to the auto-check button.
() => { ... } — arrow function syntax, a compact way to write small callback functions.
*/




let currentQuestion = 6;

function smoothReveal(element) {
    element.classList.remove("hidden");
    requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = element.querySelector("input");
        if (input) input.focus();
    });
}

function showNextQuestion() {
    const message = document.getElementById("message");

    let i = 1;
    while (i <= currentQuestion) {
        const input = document.getElementById("q" + i);
        if (input !== null && input.value.trim() === "") {
            message.innerHTML = "Please complete all visible fields first.";
            message.dataset.state = "warn";
            return;
        }
        i = i + 1;
    }

    if (currentQuestion < 40) {
        currentQuestion = currentQuestion + 1;
        const nextP = document.querySelector('p[data-q="' + currentQuestion + '"]');
        if (nextP !== null) {
            smoothReveal(nextP);
        }
        message.innerHTML = "Please, fill in all of the fields.";
        message.dataset.state = "info";
    } else {
        const robotSection = document.getElementById("robotSection");
        smoothReveal(robotSection);
        message.innerHTML = "Final step: prove you are not a robot.";
        message.dataset.state = "info";

        const finishBtn = document.getElementById("finishBtn");
        if (finishBtn) finishBtn.classList.remove("hidden");

        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) continueBtn.classList.add('hidden');
    }
}

function finishLogin() {
    const message = document.getElementById("message");
    const robotCheck = document.getElementById("robotCheck");
    const redirectUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    if (!robotCheck || !robotCheck.checked) {
        message.innerHTML = "Please confirm you're not a robot first.";
        message.dataset.state = "warn";
        return;
    }

    message.innerHTML = "Verification passed. Redirecting…";
    message.dataset.state = "info";

    setTimeout(function () {
        window.location.href = redirectUrl;
    }, 800);
}

function revealAllQuestions() {
    const all = document.querySelectorAll('p[data-q]');
    all.forEach(p => p.classList.remove('hidden'));
    currentQuestion = 40;
    const robotSection = document.getElementById('robotSection');
    if (robotSection) robotSection.classList.remove('hidden');
    const finishBtn = document.getElementById('finishBtn');
    if (finishBtn) finishBtn.classList.remove('hidden');

    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) continueBtn.classList.add('hidden');
}

function autoCheckRobot() {
    const robotCheck = document.getElementById('robotCheck');
    if (robotCheck) robotCheck.checked = true;
    const message = document.getElementById('message');
    if (message) {
        message.innerHTML = "Robot checkbox auto-checked.";
        message.dataset.state = 'info';
    }
    const finishBtn = document.getElementById('finishBtn');
    if (finishBtn) finishBtn.classList.remove('hidden');

    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) continueBtn.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    const revealBtn = document.getElementById('revealBtn');
    const autoCheckBtn = document.getElementById('autoCheckBtn');

    if (revealBtn) revealBtn.addEventListener('click', revealAllQuestions);
    if (autoCheckBtn) autoCheckBtn.addEventListener('click', autoCheckRobot);
});
