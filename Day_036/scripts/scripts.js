const cardValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const cardCounts = {};

const cardClicked = (event) => {
  document.querySelectorAll('.highlight').forEach((card) => {
    card.classList.remove('highlight');
    card.classList.add('fade');
  })
  event.target.classList.add("highlight");
  cardCounts[cardValues[event.target.dataset.rank]] -= 1;
  const totals = getRankCounts(event.target.dataset.rank);
  // totals.equal excluded from calculation, since this would lead to a re-draw
//   const cardTotals = totals.higher + totals.equal + totals.lower;
  const cardTotals = totals.higher + totals.lower;
  document.querySelector(".higher").textContent = `${(totals.higher / cardTotals * 100).toFixed(2)}%`;
  document.querySelector(".lower").textContent = `${((totals.lower / cardTotals) * 100).toFixed(2)}%`;
};

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", cardClicked);
});


/**
 * @description Initialise the card counts object to contain the count of each rank of card
 */
const initialiseCardCounts = () => {
  document.querySelectorAll(".card").forEach((card) => {
    const rank = cardValues[card.dataset.rank];
    if (cardCounts.hasOwnProperty(rank)) {
      cardCounts[rank] += 1;
    } else {
      cardCounts[rank] = 1;
    }
  });
};


/**
 * @description counts the number of cards greater than, equal to and less than the passed rank
 * @param {string} clickedCardRank rank of the card - 2-10, J, Q, K or A
 * @return {{ higher: number, lower: number, equal: number}, }}
 */
const getRankCounts = (clickedCardRank) => {
  // initialise total counts
  const totals = { higher: 0, lower: 0, equal: 0, };

  // for each entry in the cardsCounts object (2-14), add the counts for the value to the appropriate totals object,
  // depending on whether the entry is higher, lower or equal to the passed rank
  for (const [key, count] of Object.entries(cardCounts)) {
    // cardValues converts the cards (including J, Q, K, A to numeric) equivalents
    if (key > cardValues[clickedCardRank]) {
      totals.higher += count;
    } else if (key < cardValues[clickedCardRank]) {
      totals.lower += count;
    } else {
      totals.equal += count;
    }
  }
  return totals;
};

initialiseCardCounts();
