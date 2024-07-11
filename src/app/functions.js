function calcFinalPrice(basketArr) {
    let sum = 0
    basketArr.forEach(product => {
        sum+=product.qty*product.price
    });
    return sum;

}
export {calcFinalPrice}