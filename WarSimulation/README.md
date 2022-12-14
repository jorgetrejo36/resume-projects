# Simulation of the card game "War"

Description: This program is a simulation, made with Python, of the famous card game of war. The rules for the game as used in the program are as follows.

## Rules in War

War can be played in many different ways and there needed to be a repeatable playing style in the game of war I was to code. First off comes the deck being used and the associated values with the cards. The deck used in the simulations was a standard 52-card deck. In this game aces are high meaning an ace can beat any other card (except an ace). The rules were then as follows.

## Preparation
1.	Shuffle the 52-card deck
2.	Assign half the deck to player one and the other half to player two
	Gameplay begins
	With each turn there are two possibilities:
1.	One player’s card is greater than the other.
a.	The losing card is then placed on the bottom of the winning player’s deck followed by the winning card.
      2.  The cards are the same value.
a.	Each player takes the top three cards from their deck and places them down in front of them facedown.
b.	The following card is then used to determine who wins this round of war. The person who wins the round of war then takes all the cards at stake and places them on the bottom of their pile in the order described in the first possibility (losing player card, winning player card, etc. until the card that determined who won war).

## Winning
If a player has all 52 cards in their deck they win.
**Unique situations and how to play them**
-	If war is currently in progress and the two players have the same value card again the war process is just repeated (placing three cards down and competing with the card thereafter).
-	If war is in progress and one player does not have any more cards to do war with (either they don’t have three cards to place down or they don’t have the fourth card to compete with) they automatically lose.
-	If extended war (a situation where the same value card continues to come up in war causing each player to place another three cards down until someone wins) is going on and both players’ do not have any more cards to play with the player with the most cards in their deck automatically wins.
-	There is also a very small possibility that each player has the same number of cards in their deck (which is always half the deck, 26) when the situation directly above happens which means the players will go into something I call, reverse war.
-	In reverse war, each player takes the last card they can use and compares it with the other player. This continues (taking the next last card and then the next, so on and so forth) until one player has a higher valued card than the other signifying a win for the one with the higher valued card.
-	In an even smaller chance, (something that never happened in any of this project’s simulations and is extremely improbable) if every single card compared in the reverse war is of the same value, then there is a draw. This is the only way to get a draw.

## Important notes:
-	During a sequence of war that is all considered one turn. For example, if war begins on turn 15 and the cards being compared are the same value yet again then the placing down of another three cards and battling again is still a part of turn 15.
-	A deck’s strength is a summation of each card’s value (with ace being high) within a given deck. Numerically this means an ace was valued at 13, a two at 1, three at 2, and so and so forth. 

## Statistics displayed in program
The default amount of simulations run for the program is 10,000. The decks are also made randomly for each player. Given those factors this program will print out a breakdown of the percentage of times player one wins compared to player two, the percentage of games the player with the stronger deck won, and a breakdown of how many turns ended up being in the game. There is also a graphic that shows all of these turns. This is all printed onto the terminal at execution along with the graphic

## Requirements
To be able to run this program on your computer you will need the following:

- Python 3.9.2 or higher

## Installation Steps
1. Copy repository onto computer.
2. Go into the folder titled, WarSimulation

## Running the program
1. Run the following command: $ python war_simulation.py

## Screenshots

![alt text](https://github.com/jorgetrejo36/resume-projects/blob/main/WarSimulation/app-screenshots/terminalStats.png?raw=true)
![alt text](https://github.com/jorgetrejo36/resume-projects/blob/main/WarSimulation/app-screenshots/statsDisplay.png?raw=true)
