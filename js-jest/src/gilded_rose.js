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
    if (item.sellIn < 5) inflationSpeed = 3;

    item.quality = item.quality + inflationSpeed;

    return item;
  }

  decreaseQuality(item) {
    //degradationSpeed was define with scalability in mind, if future items degrade in a faster or slower ratio
    //We can adjust the degradationSpeed and add another conditional rule
    let degradationSpeed;
    if (item.quality > 0 && item.sellIn >= 0) {
      degradationSpeed = 1;
    } else if (
      (item.quality > 0 && item.sellIn === 0) ||
      (item.quality > 0 && item.name.includes("Conjured"))
    ) {
      degradationSpeed = 2;
    } else degradationSpeed = 0;

    item.quality = degradationSpeed * (item.quality - 1);

    return item;
  }

  legendaryItemsQuality(item) {
    item.quality = 80;

    return item;
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
      });
    }

    // for (let i = 0; i < this.items.length; i++) {
    //   if (
    //     this.items[i].name != "Aged Brie" &&
    //     this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
    //   ) {
    //     if (this.items[i].quality > 0) {
    //       if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
    //         this.items[i].quality = this.items[i].quality - 1;
    //       }
    //     }
    //   } else {
    //     if (this.items[i].quality < 50) {
    //       this.items[i].quality = this.items[i].quality + 1;
    //       if (
    //         this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
    //       ) {
    //         if (this.items[i].sellIn < 11) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1;
    //           }
    //         }
    //         if (this.items[i].sellIn < 6) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1;
    //           }
    //         }
    //       }
    //     }
    //   }
    //   if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
    //     this.items[i].sellIn = this.items[i].sellIn - 1;
    //   }
    //   if (this.items[i].sellIn < 0) {
    //     if (this.items[i].name != "Aged Brie") {
    //       if (
    //         this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
    //       ) {
    //         if (this.items[i].quality > 0) {
    //           if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
    //             this.items[i].quality = this.items[i].quality - 1;
    //           }
    //         }
    //       } else {
    //         this.items[i].quality =
    //           this.items[i].quality - this.items[i].quality;
    //       }
    //     } else {
    //       if (this.items[i].quality < 50) {
    //         this.items[i].quality = this.items[i].quality + 1;
    //       }
    //     }
    //   }
    //   }
    //
    // }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
