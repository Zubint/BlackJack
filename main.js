
function hello(){
	alert("hello!");
}

function Deck(){
	this.cards_left = 52;
	this.cards = this.newSet();
	this.dealCard = "";
	this.cardHTML = "";
	this.deckHTML = "";
		
	}
	
	Deck.prototype.newSet = function()
	{
		//build an array of cards
		//from 2 (low) A(high)
		var cardArray=[];
		var suit = "";
		var face = "";

		for(var i=0; i<4; i++)
		{
			// console.log(i);
			switch (i)
			{
				case 0: suit ="h"; break; //HEARTS
				case 1: suit = "d"; break; //DIAMONDS
				case 2: suit = "c"; break; //CLUBS
				case 3: suit = "s"; break; //SPADES
			}

			for (var j=2; j<=14; j++)
			{
				// console.log(suit);
				if (j<=10)
				{
					cardArray.push(suit + j);
				}
				else
				{
					switch (j)
					{
						case 11: face="j"; break;
						case 12: face ="q"; break ;
						case 13: face ="k"; break;
						case 14: face = "1"; break;
					}
					cardArray.push(suit + face);
				}
			}

		}
		// console.log(cardArray);
		return cardArray;
	}

	Deck.prototype.shuffle = function(numShuffles)
	{
		if (this.cards.length < 51)
		{
			this.cards = this.newSet();
		}
		if(numShuffles.constructor != Number || numShuffles<250)
		{
			numShuffles = 250;
		}
		for(var i=0; i<=numShuffles; i++)
		{
			var idx = 0;
			var swapIdx = 0;
			var temp = "";

			//start at a random place in the array
			idx = Math.floor(Math.random()*52); //just incase you deal a card before you shuffle!
			// console.log(idx);
			//swap it with the another locaton in the array
			swapIdx = Math.floor(Math.random()*52);
			// do this 
			temp = this.cards[idx];
			this.cards[idx] = this.cards[swapIdx];
			this.cards[swapIdx] = temp;
		}
		// console.log(this.cards);
		return this;
	}

	Deck.prototype.reset = function(){
		this.cards = this.newSet();
		return this;
	}

	Deck.prototype.deal = function (){

		this.dealCard = this.cards[this.cards.length-1];
		this.cards.pop();
		this.cards_left -=1;

		this.cardHTML = 
		"<div class='card'>" +
			"<img src='./cards-png/" + this.dealCard + ".png'>" +
		"</div>"
		return this;

	}

	Deck.prototype.showCards = function(){
		var strHTML = "";
			for (index in this.cards)
			{
				strHTML += 		
				"<div class='card'>" +
					"<img src='./cards-png/" + this.cards[index] + ".png'>" +
				"</div>"
			}
			this.deckHTML ="";
			this.deckHTML = strHTML;
		return this;
	}

function Player(strName){
	this.name=strName;
	this.hand=[];
	this.score=0;
	this.altScore=0;
	this.handHTML ="";
}

Player.prototype.getCard = function(strCard)
{
	this.hand.push(strCard);
	return this;
}

Player.prototype.showCards = function(strClass){
	var strHTML ="";
	for (index in this.hand)
	{
		strHTML += "<img class='" + strClass + "' src='./cards-png/" + this.hand[index] + ".png'>";
		this.handHTML = strHTML;
	}
	return this;
}

Player.prototype.getScore = function(){
	var cardValue =0;
	var totalValue =0;
	var altTotalValue=0;
	var altCardValue=0;

	for (index in this.hand)	
	{
		cardValue = (this.hand[index].substring(1,this.hand[index].length));
		console.log( "card value: " + cardValue);
		switch (cardValue)
		{
			case 'j':
				cardValue = 10;
				altCardValue =0;
				break;

			case 'q':
				cardValue = 10;
				altCardValue =0;
				break;
			case 'k':
				cardValue = 10;
				altCardValue =0;
				break;

			case '1':
				cardValue = 1;
				altCardValue=11;

			default:
				cardValue = +cardValue;
		}
		totalValue += cardValue;

		if(cardValue==1)
			{
				altTotalValue += altCardValue;
			}
			else
			{
				altTotalValue += cardValue;
			}
		this.score = totalValue;
		this.altScore = altTotalValue;
		console.log("totalValue: " + totalValue + " alt value " + altTotalValue);
	}
	return this;
}

Player.prototype.discardCard = function(strCard)
{
	var delIndex = 0;
	var temp ="";
	var arrayLength =0;

	for(index in this.hand)
	{
		if (this.hand[index]===strCard)
		{
			console.log (index);
			delIndex = +index;
		}
	}

		// console.log("array length: " + arrayLength);
	
		var i=0;
		i=delIndex;

		for (i; i<this.hand.length-1; i++)
		{
			// console.log("i" + i + " J " + j);
			nextIndex = +(i+1);
			console.log(nextIndex);

			nextValue = this.hand[nextIndex];
			console.log(nextValue);
			this.hand[i] = nextValue;
			console.log(this.hand[(i+1)]);
		}
		// this.hand[this.hand.length-2] = this.hand[this.hand.length-1]
	
		this.hand.pop()
		console.log(this.hand);
	
	return this;
}


