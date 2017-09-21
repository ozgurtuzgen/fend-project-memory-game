$(document).ready(function () {
    let cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
        "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

    let lastOpenedCard;
    let foundCardCount;
    let moveCount;


    function initiateGame() {
        let container = $("#deck");        
        container.empty();        

        moveCount = 0;
        lastOpenedCard = null;
        foundCardCount = 0;
        cardList = shuffle(cardList);    
        initiateCards(cardList);
    }

    initiateGame();    

    $("#restartButton").click(function () {
        initiateGame();        
    });

    function initiateCards(array) {
        let container = $("#deck");
        for (var index = 0; index < array.length; index++) {

            let li = $("<li>", { "class": "card", "id": "li" + index });

            let className = "fa " + array[index];
            let i = $("<i>", { "class": className });
            li.append(i);

            li.click(function () {
                li.addClass("show"); //show first

                if (lastOpenedCard === null) {
                    lastOpenedCard = li[0];
                }
                else {
                    let foundI = li.find("i")[0];
                    let lastI = lastOpenedCard.children[0];

                    //compare for match
                    if (foundI.className == lastI.className) {
                        // same item is clicked
                        if (li[0].id == lastOpenedCard.id) {
                            return;
                        }

                        li.removeClass("show");
                        li.addClass("match");
                        $("#" + lastOpenedCard.id).removeClass("show");
                        $("#" + lastOpenedCard.id).addClass("match");
                        lastOpenedCard = null;
                        foundCardCount = foundCardCount + 2;
                        checkGameEnding();
                    }
                    else {
                        setTimeout(function () {
                            $("#" + lastOpenedCard.id).removeClass("show");
                            li.removeClass("show");
                            lastOpenedCard = null;
                        }, 200);
                        incrementMove();
                        checkGameScore();
                    }
                }
            });
            container.append(li);
        }
    }

    function incrementMove() {
        let oldCount = $("#moveCounter").text();
        moveCount = parseInt(oldCount) + 1;
        $("#moveCounter").text(moveCount);
    }

    function checkGameEnding() {
        if (foundCardCount == cardList.length) {
            alert("The game ended with a score: " + moveCount);
        }
    }

    function checkGameScore() {        
        if (moveCount===15){
            removeStar();
        }
        if (moveCount===10){
            removeStar();
        }
        else if (moveCount===5){
            removeStar();
        }
    }

    function removeStar() {
        $('#stars li:last').remove();
    }

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /*
     * set up the event listener for a card. If a card is clicked:
     *  - display the card's symbol (put this functionality in another function that you call from this one)
     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     *  - if the list already has another card, check to see if the two cards match
     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
     */

});
