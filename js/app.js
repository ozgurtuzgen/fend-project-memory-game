$(document).ready(function () {
    let cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
        "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

    let moveCount;
    let openCards = [];
    let timeCount = 0;
    let timer;

    var Card = function (id, className) {
        this.id = id;
        this.className = className;
    };
    

    function initiateGame() {
        let container = $("#deck");
        container.empty();
        timeCount = 0;
        openCards = [];

        resetMoveCount(0);
        resetStars();

        cardList = shuffle(cardList);
        initiateCards(cardList);

        clearInterval(timer);

        timer = setInterval(function () {
            timeCount = timeCount + 1;
            $("#timer").text(timeCount);
        }, 1000);
    }

    function initiateCards(array) {
        let container = $("#deck");
        for (var index = 0; index < array.length; index++) {

            let li = $("<li>", { "class": "card", "id": "li" + index });

            let className = "fa " + array[index];
            let i = $("<i>", { "class": className });
            li.append(i);

            li.click(function () {

                displayCard(li);

                let lastCard = openCards[openCards.length - 1];

                var card = new Card(li[0].id, li.find("i")[0].className);

                let isAdded = addCardToList(card, lastCard);

                // do not add the same card and dont make comparision if there is not newly two clicked cards
                if (isAdded === false || openCards.length % 2 === 1) {
                    return;
                }

                var card1 = openCards[openCards.length - 2];
                var card2 = openCards[openCards.length - 1];

                if (card1.className === card2.className) {
                    setCardsAsMatch(card1, card2);
                }
                else {
                    setCardsNotMatched(card1, card2);

                    incrementMove();
                    checkGameScore();
                }

            });
            container.append(li);
        }
    }

    function displayCard(card) {
        card.addClass("show");
    }

    function addCardToList(card, lastCard) {
        if (openCards.length > 0 &&
            (lastCard.className === card.className) &&
            (lastCard.id === card.id)) {
            return false;
        }

        openCards.push(card);

        return true;
    }

    function setCardsAsMatch(card1, card2) {
        $("#" + card1.id).removeClass("show");
        $("#" + card1.id).addClass("match");
        $("#" + card2.id).removeClass("show");
        $("#" + card2.id).addClass("match");

        checkGameEnding();
    }

    function setCardsNotMatched(card1, card2) {        
        setTimeout(function () {
            $("#" + card1.id).removeClass("show");
            openCards.splice(-1, 1)
            $("#" + card2.id).removeClass("show");
            openCards.splice(-1, 1)
        }, 200);
    }

    function incrementMove() {
        let oldCount = $("#moveCounter").text();
        moveCount = parseInt(oldCount) + 1;
        $("#moveCounter").text(moveCount);
    }

    function checkGameEnding() {
        if (openCards.length == cardList.length) {
            let startCount = $("#stars")[0].children.length;
            clearInterval(timer);
            setTimeout(function () {
                if (confirm("Congrats! Duration: " + timeCount + " sec. Star Rating: " + startCount + ".\n Do you wanna play again?")) {
                    initiateGame();
                }    
            },200);
        }
    }

    function checkGameScore() {
        // star rating implementation logic
        if (moveCount === 10) {
            removeStar();
        }
        else if (moveCount === 5) {
            removeStar();
        }
    }

    function resetStars() {
        var stars = $("#stars");
        while (stars[0].children.length < 3) {
            let li = $("<li>");
            let i = $("<i>", { "class": "fa fa-star" });

            li.append(i);
            stars.append(li);
        }
    }

    function removeStar() {
        $('#stars li:last').remove();
    }

    function resetMoveCount(count) {
        moveCount = count;
        $("#moveCounter").text(count);
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

    initiateGame();

    $("#restartButton").click(function () {
        initiateGame();
    });
});
