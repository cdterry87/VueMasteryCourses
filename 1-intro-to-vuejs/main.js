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
                variantColor: "green",
                variantImage: './assets/greensocks.jpeg'
            },
            {
                variantId: 5678,
                variantColor: "blue",
                variantImage: './assets/bluesocks.jpeg'
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
        ],
        cart: 0
    },
    methods: {
        addToCart: function () {
            this.cart++;
        },
        removeFromCart: function () {
            if (this.cart > 0) {
                this.cart--;
            }
        },
        updateProduct: function (variantImage) {
            this.image = variantImage
        }
    }
});