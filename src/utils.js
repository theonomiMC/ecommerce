export const filterPrice = (item, currency) => {
    return item.prices.filter(el => el.currency.symbol === currency)[0]['amount']
}