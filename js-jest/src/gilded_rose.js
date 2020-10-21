class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  increaseQuality(item) {
    //inflationSpeed was define with scalability in mind, if future items inflate  faster or slower
    //We can adjust the inflationSpeed and add another conditional rule
    let inflationSpeed;

    if (item.sellIn >= 5 && item.sellIn <= 10) inflationSpeed = 2;
    if (item.sellIn < 5 && item.sellIn > 0) inflationSpeed = 3;
    if (item.sellIn > 10) inflationSpeed = 1;

    if (item.sellIn <= 0) {
      item.quality = 0;
    } else {
      item.quality = item.quality + inflationSpeed;
    }

    return item;
  }

  decreaseQuality(item) {
    //degradationSpeed was define with scalability in mind, if future items degrade in a faster or slower ratio
    //We can adjust the degradationSpeed and add another conditional rule
    let degradationSpeed;
    const isConjured = item.name.toLowerCase().includes("conjured");

    if (item.quality > 0 && item.sellIn >= 0 && !isConjured)
      degradationSpeed = 1;
    if (item.quality > 0 && isConjured) degradationSpeed = 2;

    if (item.sellIn <= 0) {
      item.quality = 0;
    } else {
      item.quality = Math.abs(item.quality - degradationSpeed);
    }

    return item;
  }

  legendaryItemsQuality(item) {
    item.quality = 80;

    return item;
  }

  updateSellIn(item) {
    if (item.name !== "Sulfuras, Hand of Ragnaros")
      item.sellIn = item.sellIn - 1;
  }

  updateQuality() {
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

module.exports = {
  Item,
  Shop,
};
