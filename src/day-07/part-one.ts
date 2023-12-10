import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';
import { PriorityQueue } from '@datastructures-js/priority-queue';

type Type =
  | 'Five of a kind'
  | 'Four of a kind'
  | 'Full house'
  | 'Three of a kind'
  | 'Two pair'
  | 'One pair'
  | 'High card';

export class PartOne implements Solution<number> {
  private readonly input: string[];
  private readonly ranks: Ranks;
  private readonly groups: Record<Type, PriorityQueue<Hand>>;
  private readonly order: Type[];

  constructor(input: string) {
    this.input = input.split('\n');
    this.ranks = new Ranks();
    this.groups = {
      'Five of a kind': new PriorityQueue<Hand>((a, b) => a.beats(b)),
      'Four of a kind': new PriorityQueue<Hand>((a, b) => a.beats(b)),
      'Full house': new PriorityQueue<Hand>((a, b) => a.beats(b)),
      'Three of a kind': new PriorityQueue<Hand>((a, b) => a.beats(b)),
      'Two pair': new PriorityQueue<Hand>((a, b) => a.beats(b)),
      'One pair': new PriorityQueue<Hand>((a, b) => a.beats(b)),
      'High card': new PriorityQueue<Hand>((a, b) => a.beats(b)),
    };
    this.order = [
      'High card',
      'One pair',
      'Two pair',
      'Three of a kind',
      'Full house',
      'Four of a kind',
      'Five of a kind',
    ];
  }

  solve(): number {
    const hands = this.input.map(line => {
      const [cards, bid] = line.split(' ');

      return {
        cards: new Hand(cards.split(''), +bid, this.ranks),
        bid: +bid,
      };
    });

    for (const hand of hands) {
      this.groups[hand.cards.getType()].enqueue(hand.cards);
    }

    const rank = new Counter(0);
    const total = new Counter(0);
    for (const type of this.order) {
      const queue = this.groups[type];

      if (queue.isEmpty()) continue;

      for (const hand of queue) {
        total.add(hand.getBid() * rank.inc());
      }
    }

    return total.val;
  }
}

class Ranks {
  private readonly ranks: Record<string, number> = {
    2: 0,
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
    9: 7,
    T: 8,
    J: 9,
    Q: 10,
    K: 11,
    A: 12,
  };

  getRank(card: string): number {
    return this.ranks[card];
  }
}

class Hand {
  public readonly cards: string[];
  private readonly ranks: Ranks;
  private readonly bid: number;
  private readonly counted: Map<string, number>;

  constructor(cards: string[], bid: number, ranks: Ranks) {
    this.bid = bid;
    this.cards = cards;
    this.ranks = ranks;

    this.counted = new Map();
    for (const card of this.cards) {
      const count = this.counted.get(card) ?? 0;
      this.counted.set(card, count + 1);
    }
  }

  getBid() {
    return this.bid;
  }

  getHand() {
    return this.cards;
  }

  getType(): Type {
    if (this.isFiveOfAKind()) return 'Five of a kind';
    if (this.isFourOfAKind()) return 'Four of a kind';
    if (this.isFullHouse()) return 'Full house';
    if (this.isThreeOfAKind()) return 'Three of a kind';
    if (this.isTwoPair()) return 'Two pair';
    if (this.isOnePair()) return 'One pair';
    if (this.isHighCard()) return 'High card';

    throw new Error('Unknown hand type');
  }

  isFiveOfAKind() {
    return this.counted.size === 1;
  }

  isFourOfAKind() {
    const [one, two] = this.counted.values();

    return one === 4 || two === 4;
  }

  isFullHouse() {
    const [one, two] = this.counted.values();

    return (one === 3 && two === 2) || (one === 2 && two === 3);
  }

  isThreeOfAKind() {
    const [one, two, three] = this.counted.values();

    return (one === 3 || two === 3 || three === 3) && this.counted.size === 3;
  }

  isTwoPair() {
    const [one, two, three] = this.counted.values();

    return (one === 2 && two === 2) || (one === 2 && three === 2) || (two === 2 && three === 2);
  }

  isOnePair() {
    const [one, two, three, four] = this.counted.values();

    return (one === 2 || two === 2 || three === 2 || four === 2) && this.counted.size === 4;
  }

  isHighCard() {
    return this.counted.size === 5;
  }

  beats(other: Hand) {
    for (const idx of this.cards.keys()) {
      const thisCard = this.cards[idx];
      const otherCard = other.cards[idx];

      const thisRank = this.ranks.getRank(thisCard);
      const otherRank = this.ranks.getRank(otherCard);
      // Orders ascending, so the 1st card is the lowest
      if (thisRank > otherRank) return +1;
      if (thisRank < otherRank) return -1;
    }

    return 0;
  }
}
