export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  increaseQuality(item: Item): void {
    //inflationSpeed was define with scalability in mind, if future items inflate  faster or slower
    //We can adjust the inflationSpeed and add another conditional rule
    let inflationSpeed: number;

    if (item.sellIn >= 5 && item.sellIn <= 10) inflationSpeed = 2;
    if (item.sellIn < 5 && item.sellIn > 0) inflationSpeed = 3;
    if (item.sellIn > 10) inflationSpeed = 1;

    if (item.sellIn <= 0) {
      item.quality = 0;
    } else {
      item.quality = item.quality + inflationSpeed;
    }
  }

  decreaseQuality(item: Item): void {
    //degradationSpeed was define with scalability in mind, if future items degrade in a faster or slower ratio
    //We can adjust the degradationSpeed and add another conditional rule
    let degradationSpeed: number;
    const isConjured = item.name.toLowerCase().includes("conjured");

    if (item.quality > 1 && item.sellIn >= 0 && !isConjured)
      degradationSpeed = 1;
    if (item.quality > 1 && isConjured) degradationSpeed = 2;
    if (item.quality > 1 && item.sellIn < 0) degradationSpeed = 2;

    if (item.quality <= 1) {
      item.quality = 0;
    } else {
      item.quality = Math.abs(item.quality - degradationSpeed);
    }
  }

  legendaryItemsQuality(item: Item): void {
    item.quality = 80;
  }

  updateSellIn(item: Item): void {
    if (item.name !== "Sulfuras, Hand of Ragnaros")
      item.sellIn = item.sellIn - 1;
  }

  updateQuality(): Item[] {
    if (this.items.length > 0) {
      this.items.forEach((item) => {
        switch (item.name) {
          case "Aged Brie":
            this.increaseQuality(item);
            break;
          case "Backstage passes to a TAFKAL80ETC concert":
            this.increaseQuality(item);
            break;
          case "Sulfuras, Hand of Ragnaros":
            this.legendaryItemsQuality(item);
            break;
          default:
            this.decreaseQuality(item);
        }
        this.updateSellIn(item);
      });
    }
    return this.items;
  }
}
