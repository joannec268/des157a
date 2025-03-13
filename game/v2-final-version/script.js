(function(){
    'use strict';
    console.log('reading js');

    // html sections
    const gameMode = document.querySelector('#gameMode');
    const winMode = document.querySelector('#winMode');
    const tieMode = document.querySelector('#tieMode');
    const modalContainer = document.querySelector('.modal-container');
    const player1win = document.querySelector('#player1win');
    const player2win = document.querySelector('#player2win');
    const winh2 = document.querySelector('#winMode h2');
    const arrow1 = document.querySelector('#brownarrow');
    const arrow2 = document.querySelector('#yellowarrow');
    const cardContainer = document.querySelector('#cardContainer');
    const score1 = document.querySelector('#score1');
    const score2 = document.querySelector('#score2');
    const message1 = document.querySelector('#message1');
    const message2 = document.querySelector('#message2');

    // buttons
    const restartBtn = document.querySelector('#restart');
    const startBtn = document.querySelector('#start');
    const revealBtn = document.querySelector('#reveal');
    const finishBtn = document.querySelector('#finish');
    const passBtn = document.querySelector('#pass');
    const addBtn = document.querySelector('#add');
    const winPlayAgainBtn = document.querySelector('#winPlayAgain');
    const tiePlayAgainBtn = document.querySelector('#tiePlayAgain');
    const soundBtn = document.querySelector('#sound');
    const helpBtn = document.querySelector('#help');
    const closeBtn = document.querySelector('#close');

    // audios
    const flipAudio = new Audio("audios/flip.mp3");
    const clickAudio = new Audio("audios/click.mp3");
    const loseAudio = new Audio("audios/lose.mp3");
    const winAudio = new Audio("audios/win.mp3");

    // for crying animation
    const tear1 = document.querySelector('#tear1');
    const tear2 = document.querySelector('#tear2');

    // original visibility state
    tear1.className = 'hidden';
    tear2.className = 'hidden';

    gameMode.className = 'showing';
    winMode.className = 'hidden';
    tieMode.className = 'hidden';
    modalContainer.classList.add('hidden');

    restartBtn.className = 'hidden';
    startBtn.className = 'showing';
    revealBtn.className = 'hidden';
    finishBtn.className = 'hidden';
    passBtn.className = 'hidden';
    addBtn.className = 'hidden';
    arrow1.className = 'hidden';
    arrow2.className = 'hidden';

    // keeps track of score, player's turn, cards
    const gameData = {
        cards: ['card1.png', 'card2.png', 'card3.png', 'card4.png', 'card5.png', 'card6.png', 'card7.png', 'card8.png', 'card9.png', 'card10.png', 'card11.png', 'card12.png', 'card13.png'],
        players: ['player 1', 'player 2'],
        cardValue: 0,
        cardSum: [0, 0],
        index: 0,
        turnCount: 0
    };

    
    soundBtn.addEventListener('click', function() {
        const audios = [flipAudio, clickAudio, loseAudio, winAudio];
        
        // checks if the first audio is muted to toggle all
        const isMuted = audios[0].muted;
        
        // loops through all the audios to mute or unmute
        for (let i = 0; i < audios.length; i++) {
            audios[i].muted = !isMuted;
        }
    
        // changes the icon to mute or unmute depending on the audio state
        if (isMuted) {
            soundBtn.classList.replace("fa-volume-xmark", "fa-volume-high"); 
        } else {
            soundBtn.classList.replace("fa-volume-high", "fa-volume-xmark"); 
        }
    });
    
    // turns on the instruction modal
    helpBtn.addEventListener('click', function(){
        modalContainer.classList.add('showing');
        modalContainer.classList.remove('hidden');
        clickAudio.play();
    });

    // exits the instruction modal
    closeBtn.addEventListener('click', function(){
        modalContainer.classList.add('hidden');
        modalContainer.classList.remove('showing');
        clickAudio.play();
    });

    // starts the game
    startBtn.addEventListener('click', function(){
        clickAudio.play();
        
        document.querySelector('#bottom').style.marginTop = '-5%';

        restartBtn.className = 'showing';
        startBtn.className = 'hidden';
        revealBtn.className = 'showing';

        // randomly chooses 0 or 1 to select the player
        gameData.index = Math.round(Math.random()); 
        if (gameData.index == 0) {
            arrow1.className = 'showing';
        }
        else {
            arrow2.className = 'showing';
        }        
    })

    // reloads
    restartBtn.addEventListener('click', function(){
        clickAudio.play().then(() => {
            setTimeout(() => {
                location.reload();
            }, 200);
        });
    });

    // after starting the game, first player reveals the first card
    revealBtn.addEventListener('click', function(){
        revealBtn.className = 'hidden';
        passBtn.className = 'showing';
        addBtn.className = 'showing';
        // reveals the first card
        addCard();

        // adds a card
        addBtn.addEventListener('click', function(){
            addCard();
        })

        // passes the turn onto the other player and checks winning condition
        passBtn.addEventListener('click', function(){
            clickAudio.play();
            changeTurns();
            passBtn.className = 'hidden';
            finishBtn.className = 'showing';
            finishBtn.addEventListener('click', function(){
                clickAudio.play();
                checkWin();
            })
        })
    })

    // changes turns
    function changeTurns(){
        // reset image
        cardContainer.innerHTML = '' + '<img src="images/cardback.png">';
        
        // switch player index
        if (gameData.index === 0) {
            gameData.index = 1;
        }
        else {
            gameData.index = 0;
        }

        if (arrow1.className == 'showing') {
            arrow1.className = 'hidden';
            arrow2.className = 'showing';
        }
        else {
            arrow1.className = 'showing';
            arrow2.className = 'hidden';

        }
    }

    // adds a card
    function addCard() {
        flipAudio.play(); 

        if (!cardContainer) return;
        
        // randomly picks a card from ace to king
        gameData.cardValue = Math.floor(Math.random() * 13) + 1;

        // all face cards = 10
        if (gameData.cardValue > 10) {
            gameData.cardValue = 10;
        // ace can be 1 or 11
        } else if (gameData.cardValue === 1) {
            if (gameData.cardSum[gameData.index] + 11 <= 21) {
                gameData.cardValue = 11;
            }
            else {
                gameData.cardValue = 1;
            }
        }

        // sums up card values
        gameData.cardSum[gameData.index] += gameData.cardValue; 
        if (gameData.index === 0) {
            score1.innerHTML = `<p>Player 1's Score: ${gameData.cardSum[gameData.index]}</p>`;
        } else {
            score2.innerHTML = `<p>Player 2's Score: ${gameData.cardSum[gameData.index]}</p>`;
        }
        
        // Display card image
        cardContainer.innerHTML += `<img src="images/${gameData.cards[gameData.cardValue - 1]}">`;

        // shrinks card size when more cards are added to fit the container
        adjustCardSizes();

        // checks for busting condition
        check21();
    }

    function adjustCardSizes() {
        const cards = document.querySelectorAll("#cardContainer img");
        const numCards = cards.length;
        const containerWidth = cardContainer.clientWidth;

        let cardWidth = containerWidth / numCards;

        cards.forEach(card => {
            card.style.width = `${cardWidth}px`;
        });
    }

    function check21() {
        if (gameData.cardSum[gameData.index] > 21) {
            passBtn.className = 'hidden';
            addBtn.className = 'hidden';
            finishBtn.className = 'hidden';
            restartBtn.className = 'hidden';

            // if there's an Ace counted as 11 before > 21 but eventually busts, will reduce it to 1
            if (gameData.cardSum[gameData.index] > 21 && gameData.cardValue === 11) {
                gameData.cardSum[gameData.index] -= 10;
            }
    
            if (gameData.cardSum[gameData.index] > 21) {
                busted(); 
                setTimeout(function() {
                    if (gameData.index === 0) {
                        player2Wins();
                    } else {
                        player1Wins();
                    }
                }, 3000);
            }
        }
    }

    function checkWin() {
        if (gameData.cardSum[0] > gameData.cardSum[1]) {
            player1Wins();

        } else if (gameData.cardSum[1] > gameData.cardSum[0]) {
            player2Wins();
        // tie
        } else {
            gameMode.className = 'hidden';
            winMode.className = 'hidden';
            tieMode.className = 'showing';
            winAudio.play();
            winAnimation();
        }
    }

    // confetti animation
    function winAnimation() {
        const colors = ['#A864FD0', '#29CDFF', '#4BCA19', '#F8828D', '#FFC156'];
        const duration = 5000; 
        const startTime = Date.now();
        
        function frame() {
            // from the left
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            // from the right
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });
    
            if (Date.now() - startTime < duration) {
                requestAnimationFrame(frame);
            }
        }
    
        frame(); 
    }
    
    // displayes winMode with player 1
    function player1Wins() {
        gameMode.className = 'hidden';
        tieMode.className = 'hidden';
        winMode.className = 'showing';
        winAnimation();
        player1win.className = 'showing';
        player2win.className = 'hidden';
        winh2.innerHTML = 'Player 1 Wins!';
        winAudio.play();
    }

    // displayes winMode with player 2
    function player2Wins() {
        gameMode.className = 'hidden';
        tieMode.className = 'hidden';
        winMode.className = 'showing';
        winAnimation();
        player2win.className = 'showing';
        player1win.className = 'hidden';
        winh2.innerHTML = 'Player 2 Wins!';
        winAudio.play();
    }

    // busted condition
    function busted(){
        if (gameData.index === 0) {
            arrow1.className = 'hidden';
            arrow2.className = 'hidden';
            document.querySelector('#bottom').style.marginTop = '-1%';
            setTimeout(function() {
                message1.innerHTML = '';
                document.querySelector('#bottom').style.marginTop = '6%';
            }, 3000);
            message1.innerHTML = '<p>BUST!</p>';
            tear1.className = 'crying';
            loseAudio.play();
        } else {
            arrow1.className = 'hidden';
            arrow2.className = 'hidden';
            document.querySelector('#bottom').style.marginTop = '-1%';
            setTimeout(function() {
                message2.innerHTML = '';
                document.querySelector('#bottom').style.marginTop = '6%';
            }, 3000);
            message2.innerHTML = '<p>BUST!</p>';
            tear2.className = 'crying';
            loseAudio.play();
        }
    }

    // reloads when play again is clicked
    winPlayAgainBtn.addEventListener('click', function(){
        clickAudio.play().then(() => {
            setTimeout(() => {
                location.reload();
            }, 200);
        });
    })
    
    // reloads when play again is clicked
    tiePlayAgainBtn.addEventListener('click', function(){
        clickAudio.play().then(() => {
            setTimeout(() => {
                location.reload();
            }, 200);
        });
    })


})();