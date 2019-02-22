var app = new Vue({
    el: '#app',
    data: {
        brand: 'VueMastery',
        product: 'Socks',
        description: 'These are the most comfortable socks!',
        selectedVariant: 0,
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
                variantImage: './assets/greensocks.jpeg',
                variantQuantity: 10
            },
            {
                variantId: 5678,
                variantColor: "blue",
                variantImage: './assets/bluesocks.jpeg',
                variantQuantity: 0
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
        updateProduct: function(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    }
});