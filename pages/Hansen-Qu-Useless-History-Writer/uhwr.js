const figures = [
    "Cleopatra", "Abraham Lincoln", "Genghis Khan", "Marie Curie", "Leonardo da Vinci",
    "Isaac Newton", "Joan of Arc", "William Shakespeare", "Blackbeard the Pirate",
    "Napoleon Bonaparte", "Queen Elizabeth I", "Albert Einstein", "Julius Caesar",
    "Beethoven", "Vincent van Gogh", "Nikola Tesla"
];
const locations = [
    "Ancient Rome", "Victorian London", "The Wild West", "the court of Kublai Khan",
    "a medieval castle", "a Parisian salon during the Enlightenment", "the Silk Road",
    "the trenches of WWI", "the top of Mount Everest", "the Acropolis in Athens",
    "a Viking longship", "the middle of the Renaissance", "a secret bunker beneath the pyramids",
    "the first Olympic Games"
];
const objects = [
    "a smartphone", "a skateboard", "a high-end espresso machine", "a disco ball",
    "a selfie stick", "a fidget spinner", "a cryptocurrency wallet", "a pair of rollerblades",
    "an electric scooter", "a Wi-Fi router", "a karaoke machine", "a Roomba",
    "a Bluetooth speaker", "a drone"
];
const scenarios = [
    "trying to win a talent show", "attempting to solve a Rubik's Cube", "teaching a cat to play chess",
    "perfecting a viral dance craze", "complaining about slow Wi-Fi", "organizing a flash mob",
    "trying to invent the first meme", "looking for an outlet to charge their vape",
    "live-streaming their coronation", "beta-testing a new video game", "hosting a disastrous potluck",
    "arguing with a time-traveler"
];


const templates = [
    "In <strong>[location]</strong>, <strong>[figure]</strong> was famously caught <strong>[scenario]</strong> using <strong>[object]</strong>.",
    "<strong>[figure]</strong> secretly traveled to <strong>[location]</strong> to show <strong>[figure2]</strong> their new <strong>[object]</strong>, hoping it would help them <strong>[scenario]</strong>.",
    "Historians were baffled to find evidence that <strong>[figure]</strong> invented <strong>[object]</strong> while in <strong>[location]</strong>, apparently while <strong>[scenario]</strong>.",
    "During a summit in <strong>[location]</strong>, <strong>[figure]</strong> shocked <strong>[figure2]</strong> by <strong>[scenario]</strong> with <strong>[object]</strong>.",
    "It's a little-known fact that <strong>[figure]</strong>'s real motivation for <strong>[scenario]</strong> was to impress <strong>[figure2]</strong> with their prized <strong>[object]</strong> in <strong>[location]</strong>.",
    "While in <strong>[location]</strong>, <strong>[figure]</strong> accidentally started a major historical event after <strong>[scenario]</strong> with <strong>[object]</strong>."
];


function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


function generateHistory() {

    let template = getRandomElement(templates);
    let fig1 = getRandomElement(figures);

    let fig2 = getRandomElement(figures);
    while (fig2 === fig1) {
        fig2 = getRandomElement(figures);
    }

    let loc = getRandomElement(locations);
    let obj = getRandomElement(objects);
    let scn = getRandomElement(scenarios);


    let history = template
        .replace("[figure]", fig1)
        .replace("[figure2]", fig2)
        .replace("[location]", loc)
        .replace("[object]", obj)
        .replace("[scenario]", scn);
    
    // I use replace here to replace the placeholders with actual words: https://www.w3schools.com/jsref/jsref_replace.asp

    let outputElement = document.getElementById('history-output');
//    const container = document.getElementById('history-output-container');
    outputElement.innerHTML = history;
}

document.getElementById('generate-btn').onclick = generateHistory;


