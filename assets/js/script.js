$(document).ready(function () {

    // make a status div for trys
    $("body").append("<div class='try'>");

    //status box displaying guessed letters
    $("<div class='status'>").insertAfter($("div.try"));


    const zooAnimals = ["leopard", "lion", "tiger", "monkey", "snake", "elephant", "hyena", "gorillas"];
    let oldWords = []
    let guessArray = [];
    let tries = 1;
    let animalIndex = [];
    let countWin = 0;
    let gameEnd = true;

    //randomize word from array
    function randomWord() {
        animalIndex = Math.floor(Math.random() * 7);
        console.log("animal index " + animalIndex);

        while (oldWords.indexOf(animalIndex) !==-1 ) {
            animalIndex = Math.floor(Math.random() * 7);
            console.log("animal index " + animalIndex);
        }
    }

    // make our slots to hold our currently correct letters

    $("#start").on("click", function () {
        //hide button
        $("#start").css("display", "none");

        // clear previous game
        function newGame () {
            $(".letterHolder").remove();
            randomWord();
            tries = 1;
            guessArray = [];
            countWin =0;
            $(".status").html("");
            $(".try").html("");

            console.log("clear game");
        }

        if (gameEnd == true) {
            newGame();
        }

        $('#title').append(`<div class="letterHolder"></div>`);
        for (let i = zooAnimals[animalIndex].length; i > 0; i--) {
            $('.letterHolder').prepend(`<div class="letterBox letter-${i - 1}"><div>`);
        }




        document.onkeyup = function (event) {


            if (tries < 5) {

                let guess = event.key.toLowerCase();
                // initial check for a new or repeat letter guess
                if (guessArray.indexOf(guess) == -1) {
                    console.log("guess key - " + guess);
                    //push the guessed letter into an array
                    guessArray.push(guess);
                    console.log("guess array - " + guessArray);
                    console.log("index - " + guessArray.indexOf(guess));
                    console.log("---");


                    /*  let guessId = guessArray.indexOf(guess)
                     ${".letter-"} */

                    //output the guessed letter to a div with class status   
                    // $("body").html(
                    //     $("<div>", {class: "status" }) + "You guessed " + guess + "</div>"
                    // );
                    // $("body").append(`<div class="status">You guessed ${guess}</div>`);

                    //loop guessed letters for output


                    //reference error on guessArray - tried to use to output guesses into status div
                    function letterGuessOutput() {
                        for (i = 0; i <= guessArray.length; i++) {
                            guessArray[i];
                        }
                    }
                    // console.log("guess array " + letterGuessOutput());
                    // $("div.status").html(`<h2>You guessed  ${guess} </h2> <p>  ${letterGuessOutput()}`);

                    $("div.status").html(`<h2>You guessed  ${guess} </h2> <p>  ${guessArray}`);

                    if (zooAnimals[animalIndex].indexOf(guess) !== -1) {
                        console.log("char index " + zooAnimals[1].indexOf(guess));
                        console.log(`pre for loop: ${zooAnimals[animalIndex].length}`)

                        //confirm a good guess
                        $("div.try").html("Good Job!");
                        //loop through word as array to find dupplicate characters like e, e in bee
                        for (i = zooAnimals[animalIndex].length - 1; i >= 0; i--) {
                            console.log('for loop index ->' + i)
                            if (zooAnimals[animalIndex][i] == guess) {
                                console.log(`for loop: ${zooAnimals[animalIndex][i].indexOf(guess)}`)
                                $(`.letter-${i}`).html(guess);

                                /* $(`.letter-${zooAnimals[animalIndex].indexOf(guess)}`).html(guess); */

                                //count chars for win
                                countWin = countWin + 1;
                                console.log("are we winning " + countWin);

                                if (countWin == zooAnimals[animalIndex].length) {
                                    $("div.try").html("Good Job, You Win!");
                                    $("#start").css("display", "block");
                                    console.log("win line 110")
                                    return; // win = true;
                                }
                            }
                        }
                        //if letter is repeated output message to status div  

                    } else {
                        //confirm a good guess
                        $("div.try").html("Try Again!");
                        return (tries++);
                        //$("body").html($("<div>", { class: "try" }) + "try again");

                    }


                } else {
                    //  $("body").html($("<div>", { class: "status" })).html("You already guessed " + guess);
                    $("div.status").html("You already guessed " + guess);

                }
            } else {

               /*  if (win === true) {
                    $("#start").css("display", "block");
                    console.log("if win trie line 135")
                    return;
                } else { */


                    //  $("body").html($("<div>", { class: "try" })).html("Better luck next time!");
                    $("div.try").html("Better luck next time!");
                    $("#start").css("display", "block");

                }
            

        }

    });

});
