Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img :src="image">
        </div>
        
        <div class="product-info">
            <h1>{{ title }}</h1>
            <h2>{{ description }}</h2>
            <p v-if="onSale">This item is on sale!</p>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
            <hr>
            <ul>
                <li v-for="detail in details">{{ detail }} </li>
            </ul>
            <hr>
            <div v-for="(variant, index) in variants" 
                :key="variant.variantId" 
                class="color-box" 
                :style="{ backgroundColor: variant.variantColor }" 
                @mouseover="updateProduct(index)">
            </div>
            <hr>
            <ul>
                <li v-for="size in sizes" :key="size.sizeId">{{ size.sizeDescription }}</li>
            </ul>

            <button @click="addToCart" 
                :disabled="!inStock" 
                :class="{ disabledButton: !inStock}">
                Add to Cart
            </button>
            <button @click="removeFromCart">
                Remove from Cart
            </button>
        </div>
    </div>`,
    data() {
        return {
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
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart: function () {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct: function(index) {
            this.selectedVariant = index
        },
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
        },
        shipping() {
            if (this.premium) {
                return "Free";
            }
            return "$2.99";
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
});