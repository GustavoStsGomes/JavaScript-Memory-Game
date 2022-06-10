const CARDS = document.querySelectorAll('.card')
let hasFlippendCard = false
let firstCard, secondCard
let lockBoard = false

CARDS.forEach((card) => {
    card.addEventListener('click', flipCard)
})

function flipCard(){
    if(lockBoard) return
    if(this === firstCard) return

    this.classList.add('flip')
    if(!hasFlippendCard){
        hasFlippendCard = true
        firstCard = this
        return
    }

    secondCard = this
    hasFlippendCard = false
    checkForMath()
}

function checkForMath(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards()
        return
    }
    unflipCards()
}

function disableCards(){
    firstCard.removeEventListener('click',flipCard)
    secondCard.removeEventListener('click',flipCard)

    resetBoard()
}

function unflipCards(){
    lockBoard = true
    setTimeout(() =>{
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()   
    }, 1500)
}

function resetBoard(){
    [hasFlippendCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle(){
    CARDS.forEach((card) =>{
        let randomPosition = Math.floor(Math.random() * 12)
        card.style.order = randomPosition
    })
})()