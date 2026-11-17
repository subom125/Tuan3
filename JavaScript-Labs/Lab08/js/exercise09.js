var isCanadian = true;
function calculateTax(amount, taxRate) {
    return amount * taxRate();
}
function calculateTotal(price, quantity) {
    var amount = price * quantity;
    return amount + calculateTax(amount, function() {
        if (isCanadian) return 0.05;
        return 0;
    });
}
