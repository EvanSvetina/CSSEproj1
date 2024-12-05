---
layout: page
title: About
permalink: /about/
---

<h3> <span style="font-weight:bold">Fun Stuff</span> </h3>
<b3> <span style="color:Gold;font-weight:bold">Ruby</span> over <span style="color:purple;font-weight:bold">Ai</span> (cry about it, Nikhil)


Mfs making a single inside joke: (Those who know + knee surgery + german stare + balkan rage + still water + put the fries in the bag)
<img src="https://media.tenor.com/4IAhPKnwc5sAAAAM/those-who-know-trollge.gif
" width="120" length="120" alt="Image Didn't Load">
</b3>

<b1>


</b1>
<br>
<h1><span><a href="https://nikhile22427.github.io/oshinoko" style="color:purple" target="_blank">Obligatory Partner Blog Plug</a></b2></span></h1> <br>
</a>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Konami Code Example</title>
    <style>
        #secretMessage {
            display: none;
            font-size: 20px;
            color: red;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <p>Man, I love cheat codes (especially really famous ones)...</p>
    <div id="secretMessage"><a href="https://open.spotify.com/track/7ovUcF5uHTBRzUpB6ZOmvt?si=bc53a5e718554bac" target="_blank">Secret?

<script>
        const konamiCode = [
            "ArrowUp", "ArrowUp",
            "ArrowDown", "ArrowDown",
            "ArrowLeft", "ArrowRight",
            "ArrowLeft", "ArrowRight",
            "b", "a"
        ];

        let inputSequence = [];

        window.addEventListener("keydown", (event) => {
            inputSequence.push(event.key);

            // Keep the array length the same as the Konami Code
            if (inputSequence.length > konamiCode.length) {
                inputSequence.shift();
            }

            // Check if the input matches the Konami Code
            if (JSON.stringify(inputSequence) === JSON.stringify(konamiCode)) {
                document.getElementById("secretMessage").style.display = "block";
            }
        });
    </script>
