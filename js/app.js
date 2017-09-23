$(document).ready(function () {
    let cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
        "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

    let moveCount;
    let openCards = [];

    var Card = function (id, className) {
        this.id = id;
        this.className = className;
    };

    function initiateGame() {
        let container = $("#deck");
        container.empty();

        resetMoveCount(0);
        resetStars();

        cardList = shuffle(cardList);
        initiateCards(cardList);
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

                var card = new Card(li[0].id, li.find("i")[0].className);

                addCardToList(card);

                if (openCards.length % 2 === 1) {
                    return;
                }

                var card1 = openCards[openCards.length - 2];
                var card2 = openCards[openCards.length - 1];

                if ((card1.className === card2.className) && (card1.id === card2.id)) {
                    return;
                }

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
        card.addClass("show"); //show first
    }

    function addCardToList(card) {
        openCards.push(card);
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
            alert("The game ended with a score: " + moveCount);
        }
    }

    function checkGameScore() {
        if (moveCount === 15) {
            removeStar();
        }
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
            let i = $("<i>", { "class" : "fa fa-star" });
            
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
