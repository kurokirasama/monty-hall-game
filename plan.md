# Monty Hall Simulator Application - Development Plan

This plan outlines the steps to create a Monty Hall problem simulator web application. The application will be built using HTML, CSS, and vanilla JavaScript, with a visual style inspired by the provided `programming-assessment-app` example.

## Step 1: Project Setup and HTML Structure

**Goal:** Create the basic file structure and the HTML layout for the application.

1.  **Create Files:**
    *   `index.html`: The main page for the application.
    *   `style.css`: For all styling.
    *   `script.js`: For game logic and interactivity.
    *   Use the `images` directory and ensure `car.png` and `goat.png` are placed inside it.

2.  **Define `index.html` Structure:**
    *   Add a main title: "Monty Hall Game".
    *   Create a container for the three doors. Each door will be a `div` element with a unique ID (e.g., `door-a`, `door-b`, `door-c`) and a common class (e.g., `door`). Initially, they will contain a letter (A, B, C) to identify them.
    *   Inside each door `div`, add an `img` tag for the prize/goat, which will be hidden initially.
    *   Add a controls section with buttons:
        *   A "New Game" button (ID: `new-game-btn`).
        *   A "Reveal Losing Door" button (ID: `reveal-losing-btn`), initially disabled.
        *   A "Reveal Final Outcome" button (ID: `reveal-outcome-btn`), initially disabled.
    *   Create a section for game status messages (e.g., "Select a door.", "Switch or Stay?", "You Win!").
    *   Create a statistics section to display game metrics. This section will contain elements for:
        *   Total Plays
        *   Switched Plays (Wins / Losses)
        *   Stayed Plays (Wins / Losses)
        *   Win Percentage (Switched)
        *   Win Percentage (Stayed)

## Step 2: CSS Styling

**Goal:** Style the application to be visually appealing and functional, mimicking the button style from the reference application for the doors.

1.  **General Layout:** Style the main containers for alignment and spacing (e.g., using Flexbox or Grid).
2.  **Door Styling:**
    *   Style the `.door` class to look like the large 'C' and 'R' buttons from the reference app (large, clickable squares or rectangles with a distinct border and background).
    *   Add a `:hover` effect for interactivity.
    *   Create a `.selected` class to visually differentiate the door the player has picked (e.g., change background color, add an inset shadow to look "pressed").
    *   Create an `.open` class for when a door is revealed, which will make the prize/goat image visible.
3.  **Button Styling:** Style the control buttons (`New Game`, etc.) to be clear and clickable.
4.  **Statistics Display:** Format the statistics section for readability.

## Step 3: Core Game Logic (JavaScript)

**Goal:** Implement the underlying state management and core functions of the Monty Hall game in `script.js`.

1.  **Initialize Variables:**
    *   Get references to all necessary DOM elements (doors, buttons, stats displays).
    *   Create variables to hold the game state:
        *   An array or object to store which door holds the car.
        *   A variable to store the player's initial door choice.
        *   Variables to track game progress (e.g., `isPlayerChoiceMade`, `isLosingDoorRevealed`).
2.  **`startGame()` Function:**
    *   This function will be called by the "New Game" button.
    *   Reset all game state variables.
    *   Randomly assign the 'car' to one door and 'goats' to the other two.
    *   Reset the visual state of all doors (remove `.selected` and `.open` classes, hide images).
    *   Enable the door `div`s for selection.
    *   Disable the "Reveal Losing Door" and "Reveal Final Outcome" buttons.
    *   Update the status message to "Please select a door."

## Step 4: Player Interaction (JavaScript)

**Goal:** Make the game respond to user input.

1.  **Handle Door Selection:**
    *   Add a click event listener to the door container.
    *   When a player clicks a door for the first time in a game:
        *   Record the chosen door's ID.
        *   Apply the `.selected` class to the chosen door.
        *   Disable further clicks on any of the doors.
        *   Enable the "Reveal Losing Door" button.
        *   Update the status message.
2.  **Handle "Reveal Losing Door" Button:**
    *   Add a click event listener to this button.
    *   Implement the logic for "Monty" to open a door:
        *   Identify a door that was **not** chosen by the player and does **not** have the car.
        *   Apply the `.open` class to this door and set the `src` of its `img` to `images/goat.png`.
    *   Disable the "Reveal Losing Door" button.
    *   Enable the "Reveal Final Outcome" button.
    *   Give the player the option to switch. Update the status message to "You can switch your choice or stay."
    *   Re-enable clicks on the remaining closed, unselected door to allow the player to switch. A click on it will move the `.selected` class.
3.  **Handle "Reveal Final Outcome" Button:**
    *   Add a click event listener to this button.
    *   Open all remaining closed doors, revealing the car and any remaining goat.
    *   Determine if the player won or lost based on their final selection.
    *   Update the status message to "You Win!" or "You Lose!".
    *   Update the statistics.
    *   Disable all game interaction buttons except "New Game".

## Step 5: Statistics Logic (JavaScript)

**Goal:** Implement the tracking and display of game statistics.

1.  **Initialize Stats Variables:** Create variables to store all the statistical counts (wins, losses, plays for both switched and stayed decisions).
2.  **`updateStatistics()` Function:**
    *   This function is called at the end of each game.
    *   It should determine if the player switched their choice or stayed.
    *   Increment the appropriate win/loss and play counters.
    *   Recalculate win percentages for both strategies.
    *   Update the text content of the corresponding HTML elements in the statistics section.
3.  **Local Storage (Optional but Recommended):**
    *   To make statistics persist across browser sessions, use `localStorage`.
    *   After updating stats, save the stats object to `localStorage`.
    *   When the page first loads, check if stats exist in `localStorage` and load them.

## Step 6: Final Touches and Refinement

**Goal:** Ensure the application is robust and user-friendly.

1.  **Code Comments:** Add comments to `script.js` to explain complex parts of the logic.
2.  **Debugging:** Play through many scenarios to find and fix any bugs.
3.  **Review:** Read through the code to ensure it is clean, organized, and follows the plan.
4.  **Final UI Polish:** Make any last-minute CSS adjustments for a better user experience.
