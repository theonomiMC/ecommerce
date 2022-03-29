export const filterPrice = (item, currency) => {
    return item.prices.filter(el => el.currency.symbol === currency)[0]['amount']
}

export const uniqueID=(item)=>{
    let sorted = Object.keys(item).sort().reduce((obj, key)=>{
        obj[key]=item[key]
        return obj
    },{})
    return Object.values(sorted).join('-')
}