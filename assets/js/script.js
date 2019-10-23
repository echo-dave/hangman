$(document).ready(function () {

    // make a status div for trys
    $("body").append("<div class='try' style='display:none;'>");

    //status box displaying guessed letters
    $("<div class='status' style='display:none;'>").insertAfter($("div.try"));


    const zooAnimals = ["leopard", "lion", "tiger", "monkey", "snake", "elephant", "hyena", "gorillas"];
    let oldWords = []
    let guessArray = [];
    let tries = 1;
    let animalIndex = [];
    let countWin = 0;
    let gameEnd = true;

    //randomize word from array
    function randomWord() {
        animalIndex = Math.floor(Math.random() * zooAnimals.length);
        console.log("animal index " + animalIndex);
//try to account for words already used
if (oldWords.length < zooAnimals.length) {
        while (oldWords.indexOf(animalIndex) !==-1 ) {
            animalIndex = Math.floor(Math.random() * zooAnimals.length);
            console.log(`animal index ${animalIndex} old index ${oldWords}`);
        }
        oldWords.push(animalIndex);
        console.log(`pushed wold words into animal index: ${oldWords}`)
    } else {
      console.log("pre-return");   
      return gameEnd = false;
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
            $(".try").css("display","block")
            $(".status").css("display","block")
            console.log("clear game");
        }

        if (gameEnd == true) {
            newGame();
        } else {
            $('.letterHolder').css("display","none");
            $('body').prepend(`<div id='gameOver'><h1>No more words</h1> <h2>Game Over</h2><p>Refresh page to play again</p></div`);
            return
        }

        $(`<div class="letterHolder"></div>`).insertAfter(".startBox");
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
                        $("div.try").html("<h2>Good Job!</h2>");
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
                                    $("div.try").html("<h2>Good Job, You Win!</h2>");
                                    $("#start").css("display", "inline-block");
                                    console.log("win line 110")
                                    return; // win = true;
                                }
                            }
                        }
                        //if letter is repeated output message to status div  

                    } else {
                        //confirm a good guess
                        $("div.try").html("<h2>Try Again!</h2> <p>" + tries + " out of 5 misses</p>");
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
                    $("div.try").html("<h2>Better luck next time!</h2>");
                    $("#start").css("display", "inline-block");

                }
            

        }

    });

});
