$(document).ready(function () {
    let cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
        "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

    let moveCount;
    let openCards = [];
    let timeCount = 0;
    let timer;
    let isGameStarted = false;

    // card object definition
    var Card = function (id, className) {
        this.id = id;
        this.className = className;
    };

    $( "#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,        
        autoOpen: false,        
        buttons: {
          "Restart": function() {                 
            initiateGame();            
            $( this ).dialog( "close" );
          },
          Cancel: function() {
            $( this ).dialog( "close" );
          }
        }
      });  

    // dialog that is shown at the end of the game
    var showDialog = function () {
        let starCount =  $("#stars")[0].children.length;
        $("#msgTimer").text(timeCount);
        $("#msgStars").text(starCount);

        $( "#dialog-confirm" ).dialog("open");     
    }

    // initiate game with initial values/state
    function initiateGame() {        
        let container = $("#deck");
        container.empty();        
        openCards = [];     
        isGameStarted = false;   

        resetMoveCount();
        resetStars();
        resetTimeCount();

        cardList = shuffle(cardList);
        initiateCards(cardList);

        clearInterval(timer);        
    }

    // add cards to dom and subscribe to its click event
    function initiateCards(array) {
        let container = $("#deck");
        for (var index = 0; index < array.length; index++) {

            let li = $("<li>", { "class": "card", "id": "li" + index });

            let className = "fa " + array[index];
            let i = $("<i>", { "class": className });
            li.append(i);

            li.click(function () {

                // check for the first move in the game to start timer
                if (!isGameStarted)
                {
                    isGameStarted = true;
                    timer = setInterval(function () {
                        timeCount = timeCount + 1;
                        $("#timer").text(timeCount);
                    }, 1000);
                }

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

                // if card's classes are the same that means they are the same card with same state. eg: "fa fa-diamond show" for both card
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

    // add cart to open card list if it is not already opened
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

    // close cards if it is not matched.
    function setCardsNotMatched(card1, card2) {        
        setTimeout(function () {
            // remove show class to close the card
            $("#" + card1.id).removeClass("show");
            // remove from the open card list. The last two items in the array are the cards(card1,card2) 
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
                showDialog();                
            },200);
        }
    }

    function checkGameScore() {
        // star rating implementation logic
        // remove the stars in each five move.
        if (moveCount === 10) {
            removeStar();
        }
        else if (moveCount === 5) {
            removeStar();
        }
    }

    // reset stars to old state (3 stars is the initial state of the game)
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

    function resetMoveCount() {
        moveCount = 0;
        $("#moveCounter").text(0);
    }

    function resetTimeCount() {
        timeCount = 0;        
        $("#timer").text(0);
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
