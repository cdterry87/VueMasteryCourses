var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'These are the most comfortable socks!',
        image: './assets/greensocks.jpeg',
        inventory: 100,
        onSale: false,
        details: [
            "80% cotton",
            "20% polyester",
            "Gender-neutral"
        ],
        variants: [
            {
                variantId: 1234,
                variantColor: "green"
            },
            {
                variantId: 5678,
                variantColor: "blue"
            }
        ],
        sizes: [
            {
                sizeId: 123,
                sizeDescription: "Small",
            },
            {
                sizeId: 456,
                sizeDescription: "Medium",
            },
            {
                sizeId: 789,
                sizeDescription: "Large",
            }
        ]
    }
});