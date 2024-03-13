function calculateDiscount(totalPurchaseAmount) {
  let discount;
  switch (true) {
    case totalPurchaseAmount < 500:
      discount = 3;
      break;
    case totalPurchaseAmount >= 501 && totalPurchaseAmount <= 1000:
      discount = 5;
      break;
    case totalPurchaseAmount >= 1001 && totalPurchaseAmount <= 1500:
      discount = 7;
      break;
    case totalPurchaseAmount >= 1501 && totalPurchaseAmount <= 2500:
      discount = 10;
      break;
    case totalPurchaseAmount >= 2501 && totalPurchaseAmount <= 5000:
      discount = 12;
      break;
    case totalPurchaseAmount >= 5001 && totalPurchaseAmount <= 7000:
      discount = 15;
      break;
    default:
      discount = 20;
      break;
  }
  return discount;
}
module.exports = calculateDiscount;
