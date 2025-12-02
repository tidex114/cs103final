// Section For Demo Panel

// === Part 0: Global ===
let selectedTricks = new Set();
let appliedTricks = new Set();

// Log State
let logEntries = [];
const MAX_LOG_ENTRIES = 50;

// === Part 1: Event Listener Testing Function ===
document.addEventListener("DOMContentLoaded", () => { // when html is loaded, run

    // Demo Mode Toggle Btn
    const demoBtn = document.getElementById("demoModeBtn");
    if (demoBtn) {
        demoBtn.addEventListener("click", toggleDemoPanel);
    }

    // Open/Close Panel Tab Btn
    const panelTab = document.querySelector(".panel-tab");
    if (panelTab) {
        panelTab.addEventListener("click", togglePanelUI);
    }

    // Apply Btn
    const applyBtn = document.getElementById("applySelection");
    if (applyBtn) {
        applyBtn.addEventListener("click", () => {
            console.log("Apply clicked");
            // Insert here
        });
    }

    // Clear Btn
    const clearBtn = document.getElementById("clearSelection");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            console.log("Clear clicked");
            // Insert here
        });
    }

    // Log Clear Btn
    const clearLogBtn = document.getElementById("clearLogBtn");
    if (clearLogBtn) {
        clearLogBtn.addEventListener("click", () => {
            clearLog();
        })
    }

    // Trick Btn
    const trickButtons = document.querySelectorAll(".trick-btn");
    trickButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
        });
    });

    initDemoPanel();
});

// === Part 2: Open & Close Panel ===
let demoModeOn = false;

const PANEL_ID = 'demoPanel';
const BTN_ID   = 'demoModeBtn';

// Initialize the demo-panel
function initDemoPanel() {
    const panel = document.getElementById(PANEL_ID);
    if (panel) {
        panel.classList.remove('open');
        panel.classList.add('hidden');
    }
    demoModeOn = false;

    document.body.classList.remove('demo-on');

    const btn = document.getElementById(BTN_ID);
    if (btn) {
        btn.textContent = 'Demo Mode OFF';
        btn.classList.remove('active');
    }

    clearLog();
}

// Open and Close function
function openPanel() {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) {
        return;
    }
    panel.classList.remove('hidden');
    setTimeout(() => panel.classList.add('open'), 10);
}

function closePanel() {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) return;
    panel.classList.remove('open');
}

// Toggle Helper: check if panel is open
function isPanelOpen() {
    const panel = document.getElementById(PANEL_ID);
    return panel && panel.classList.contains('open');
}

// Toggle between open and close
function togglePanelUI() {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) {
        return;
    }

    if (panel.classList.contains('open')) {
        closePanel();
    } else {
        openPanel();
    }
}

// Toggle: master switch for demo mode and state
function toggleDemoPanel() {
    const btn = document.getElementById(BTN_ID);
    const panel = document.getElementById(PANEL_ID);

    demoModeOn = !demoModeOn;
    if (btn) {
        if (demoModeOn) {
            btn.textContent = 'Demo Mode ON';
            btn.classList.add('active');
        } else {
            btn.textContent = 'Demo Mode OFF';
            btn.classList.remove('active');
        }
    }

    if (demoModeOn) {
        document.body.classList.add('demo-on');
        if (!isPanelOpen()) {
            panel.classList.remove('open');
            openPanel();
        }
    } else {
        document.body.classList.remove('demo-on');
        if (isPanelOpen()) {
            closePanel();
        }
        if (panel) {
            panel.classList.add('hidden');
        }
        clearLog();
    }
}

// === Part 2.5: Log Helpers ===
function getActiveSabotageTypes() {
    return Array.from(appliedTricks || []);
}

function clearLog() {
    logEntries = [];

    const container = document.getElementById('logContainer');
    if (container) {
        container.innerHTML = '';
    }
}

function logEvent(buttonLabel, beforeValue, afterValue, sabotageTypes) {
    if (!demoModeOn) {
        return;
    }

    const container = document.getElementById('logContainer');
    if (!container) {
        return;
    }

    if (!Array.isArray(sabotageTypes)) {
        sabotageTypes = [];
    }

    if (logEntries.length >= MAX_LOG_ENTRIES) {
        logEntries.shift();
        if (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    const id = logEntries.length + 1;

    const entry = {
        id: id,
        buttonLabel: buttonLabel,
        beforeValue: beforeValue,
        afterValue: afterValue,
        sabotageTypes: sabotageTypes,
    };

    logEntries.push(entry);

    const row = document.createElement("div");
    row.className = 'log-entry';

    let text = '#' + id + ' [btn: ' + buttonLabel + ']  ' +
        beforeValue + ' → ' + afterValue;

    if (sabotageTypes.length > 0) {
        text += ' [tricks: ' + sabotageTypes.join(', ') + ']';
    } else {
        text += ' [tricks: none]';
    }

    row.textContent = text;
    container.appendChild(row);

    container.scrollTop = container.scrollHeight;
 }

// === Part 3: Calculator Core ===

let currentInput = '0';
let previousValue = null;
let currentOperator = null;
let justComputed = false;

let display = document.getElementById('calcDisplay');

// Display Helper
function updateDisplay() {
    display.textContent = currentInput;
}

// Core Helpers
function resetCalculator() {
    currentInput = '0';
    previousValue = null;
    currentOperator = null;
    justComputed = false;
    updateDisplay();
}

// Sign toggle
function toggleSign() {
    if (currentInput === 'Error') {
        return;
    }

    if (currentInput === '0') {
        currentInput = '-0';
    } else if (currentInput === '-0') {
        currentInput = '0';
    } else if (currentInput.charAt(0) === '-') {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = '-' + currentInput;
    }
    justComputed = false;
    updateDisplay();
}

function handleNumberInput(num) {
    // Refresh
    if (justComputed || currentInput === 'Error') {
        currentInput = num;
        previousValue = null;
        currentOperator = null;
        justComputed = false;
        updateDisplay();
        return;
    }

    // Leading zero
    if (currentInput === '0') {
        if (num === '0') {
            updateDisplay();
            return;
        } else {
            currentInput = num;
            updateDisplay();
            return;
        }
    }

    if (currentInput === '-0') {
        if (num === '0') {
            updateDisplay();
            return;
        } else {
            currentInput = '-' + num;
            updateDisplay();
            return;
        }
    }

    // Neg num
    if (currentInput === '-') {
        currentInput = '-' + num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function handleDecimal() {
    if (justComputed || currentInput === 'Error') {
        currentInput = '0.';
        previousValue = null;
        currentOperator = null;
        justComputed = false;
        updateDisplay();
        return;
    }

    if (currentInput === "-") {
        currentInput = '-0.';
        updateDisplay()
        return;
    }

    if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
        updateDisplay()
    }
}

function handleBackspace() {
    if (currentInput === 'Error') {
        currentInput = '0';
        updateDisplay();
        return;
    }

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);

        if (currentInput === '-' || currentInput === '' || currentInput === '-0') {
            currentInput = '0';
        }
    } else {
        currentInput = '0';
    }
    justComputed = false;
    updateDisplay();
}

// Core op helpers
function performOperation(a, op, b) {
    let result;

    if (op === "+") {
        result = a + b;
    } else if (op === "-") {
        result = a - b;
    } else if (op === "*") {
        result = a * b;
    } else if (op === "/") {
        if (b === 0) {
            return "Error";
        }
        result = a / b;
    } else {
        return b;
    }

    return result;
}

function computeResult(markJustComputed) {
    if (currentOperator === null || previousValue === null) {
        return;
    }

    let b = parseFloat(currentInput);
    if (isNaN(b)) {
        return;
    }

    let a = previousValue;
    let result = performOperation(a, currentOperator, b);

    currentInput = String(result);
    previousValue = null;
    currentOperator = null;
    justComputed = !!markJustComputed;
    updateDisplay();
}

function handleOperator(op) {
    if (op === 'clear') {
        resetCalculator();
        return;
    }

    if (op === 'ce') {
        currentInput = '0';
        justComputed = false;
        updateDisplay();
        return;
    }

    if (op === 'backspace') {
        handleBackspace();
        return;
    }

    if (op === '.') {
        handleDecimal();
        return;
    }

    if (op === 'sign') {
        toggleSign();
        return;
    }

    // Case 1: neg first
    if (op === '-' && previousValue === null &&
        (currentInput === '0' || currentInput === 'Error')) {
        currentInput = '-';
        updateDisplay();
        return;
    }

    // Case 2: neg second
    if (op === '-' && previousValue !== null && currentInput === '0') {
        currentInput = '-';
        updateDisplay();
        return;
    }

    let value = parseFloat(currentInput);
    if (isNaN(value)) {
        value = 0;
    }

    // Chained operation:
    if (currentOperator !== null && previousValue !== null &&
        currentInput !== '0' && currentInput !== '-' && currentInput !== 'Error') {

        // intermediate
        computeResult(false);
        previousValue = parseFloat(currentInput);
        currentOperator = op;
        currentInput = '0';
        justComputed = false;
        return;
    }

    // Operator change
    if (currentOperator !== null && previousValue !== null &&
        (currentInput === '0' || currentInput === 'Error')) {
        currentOperator = op;
        justComputed = false;
        return;
    }

    // First time selecting
    previousValue = value;
    currentInput = '0';
    currentOperator = op;
    justComputed = false;
}

function handleEquals() {
    computeResult(true);
}

// Event Binding Core

let numButtons = document.getElementsByClassName("btn-num");
for (let i = 0; i < numButtons.length; i++) {
    numButtons[i].addEventListener("click", function () {
        const before = currentInput;
        const label  = this.textContent.trim();   // what user sees, e.g. "7"
        const num    = this.getAttribute("data-num");

        handleNumberInput(num);

        const after        = currentInput;
        const activeTricks = getActiveSabotageTypes();
        logEvent(label, before, after, activeTricks);
    });
}

let opButtons = document.getElementsByClassName("btn-op");
for (let j = 0; j < opButtons.length; j++) {

    // Skip
    if (opButtons[j].id === "equalsBtn") {
        continue;
    }

    opButtons[j].addEventListener("click", function () {
        const before = currentInput;
        const label  = this.textContent.trim();
        const op     = this.getAttribute("data-op");

        handleOperator(op);

        const after        = currentInput;
        const activeTricks = getActiveSabotageTypes();
        logEvent(label, before, after, activeTricks);
    });
}

let equalsBtn = document.getElementById("equalsBtn");
if (equalsBtn) {
    equalsBtn.addEventListener("click", function () {
        const before = currentInput;
        const label = this.textContent.trim();

        handleEquals();

        const after = currentInput;
        const activeTricks = getActiveSabotageTypes();
        logEvent(label, before, after, activeTricks);
    });
}




// Main Init


