# [Battleships](https://battleships.jjgray.me)

<img width="1920" alt="Screenshot 2022-07-15 at 13 16 38" src="https://user-images.githubusercontent.com/59710385/179256494-da6f05e1-25db-42f8-aa7b-901043f40c6b.png">

## Brief

 - Build a fully functioning browser based game using HTML, CSS and Javascript.
 - Create a game that will test your understanding of Javascript and how you break down a problem.
 - JS Code must be formatted as functions or Classes.
 - Must use click or keypress events in Javascript to trigger events in the game.

## Approach & Concepts

I chose Battleships to push my knowledge of looping and array manipulation. I broke it down into the following steps:
 - Create a grid for a user, and a grid for the computer.
    - I used 2D arrays to achieve this. This method allowed me to identify each grid square in coordinate type    fashion, for example `computerGame[row][col]`.
    - I was able to string the coordinates together and store them as the ID of each grid square, which could be converted back into an array later to handle torpedo collisions.
 - Place the computers ships randomly. This was one of the biggest problems I faced in the build.
    - I created a random number function to define each ships starting coordinates.
    - I could randomly place the ships with relative ease using a forEach and an if statement, however this didn't solve the issue of the ships potentially overlapping. I eventually got around this issue by pushing all of the potential ship coordinates into an array, and checking for duplicates, running all of this in an infinite `while` loop, that would only stop once the array had 17 unique coordinates within. 
 - Allow a user to click a computer grid square to fire a torpedo.
    - This was quite straightforward. Each grid square would be assigned one of the following:
        ```
         0: Water
         1: Miss
         3: Ship
         4: Hit
        ```
    - A click on a `0` or `3` grid square would update the styles of that square, displaying either a hit or a miss. If a hit, then `userGameClock++`
 - Allow a user to place their own ships.
    - Again, this wasn't too difficult, however it's not currently very foolproof and could do with some work. Before the start of the game, a user can choose 17 squares to place their ships, with a modal indicating the length each ship needs to be. The functionality for this just changed a `0` to a `3` on user input.
 - The computer must fire back!
    - The initial stages of this were very simple. Using my previously mentioned random number function, I could call a function after each user shot, that randomly picked a user grid square for the computer to fire at. Direct hit would `computerGameClock++`
    - The part I am most proud of - despite it still needing work - is adding some intelligence to the way the computer plays. If the computer hits a target, it will store that coordinate in a variable. On it's next go it will shoot one grid square vertically down. If that is a hit it will just continue on in that direction till it misses. If it's a miss, it goes back to the original hit square and fires one to the right. Hit, carry on that direction. Miss, fire to the left of the original point on the next go. Miss on the left, try above the initial grid hit. If that's a miss it will go back to picking a random grid square. It's not perfect - If it meets an already shot square, it will jump out of the function and just pick a random square again, but I'll continue to work on the logic for this, and am still very pleased that the computer can feasibly win based on the logic described above.
- Finally - the first `gameClock` to reach 17 is the winnner, as there are only 17 grid squares occupied by each side.
    
        
