/* =========================================================
   GLOBAL-FUNCTIONS.JS
   : Loaded on EVERY page in this project.

   Functions:
       1. Automatically create and insert the small red home button
       2. Add navigation: return to home page on click
       3. Provide global animation helpers

    Authors:
       - Hongyuan_Zhang U96564776 hzhang25@bu.edu
   ========================================================= */

/* =========================================================
    NOTES OF CONTENT
    : Following conclude the content that is not taught or
    mentioned in the range of CS103 course content.

    1. addEventListener()
       : Use to attach a function that runs when a specified event
       happens on an element, without overwriting other existing
       event handlers.

       How to use:
            element.addEventListener(eventType, callbackFunction);

       Example use in this file:
            homeBtn.addEventListener("click", () => {
                window.location.href = "../homePage/home.html";
            });

        'when the home button is clicked, run this function
             that sends the user back to ../homePage/home.html'

    2.createElement():
       : Use to generate a new HTML element through JavaScript,
       instead of writing it directly inside the HTML file.

       How to use:
            document.createElement(tagName);

       Example use in this file:
            const btn = document.createElement("button");

            'a new empty <button> element is created in memory,
             waiting to be styled, assigned attributes, or inserted
             into the document.'

    3.appendChild():
       : Use to insert a created element into the DOM tree, making it
       actually appear on the webpage.

       How to use:
            parent.appendChild(childElement);

       Example use in this file:
            document.body.appendChild(btn);


            'this places the new button at the end of the <body>,
             making it visible and part of the rendered page.'

    4. DOMContentLoaded:
       : Use to run JavaScript only after the browser has finished
       building the HTML structure (the DOM tree), but *before*
       images, fonts, or external resources are fully loaded.

       How to use:
            document.addEventListener("DOMContentLoaded", callbackFunction);

       Example use in this file:
            document.addEventListener("DOMContentLoaded", () => {
                // create and insert global home button
            });

            'wait until all HTML tags exist, then safely
             create elements and attach event listeners without errors.'
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => { // This is used to prevent people not put their <script> at the bottom of <body>
    // Check duplicates
    if (!document.getElementById("globalHomeBtn")) {

        // Create btn
        const btn = document.createElement("button");
        btn.id = "globalHomeBtn";
        btn.classList.add("global-home-btn");

        // Insert btn
        document.body.appendChild(btn);
    }

    // Add click eventListener
    const homeBtn = document.getElementById("globalHomeBtn");
    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            window.location.href = "../../mainHomePageDesign/home.html";
        });
    }
});
