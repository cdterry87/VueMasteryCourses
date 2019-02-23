var eventBus = new Vue();

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

        <product-tabs :reviews="reviews"/>

    </div>`,
    data() {
        return {
            brand: 'VueMastery',
            product: 'Socks',
            description: 'These are the most comfortable socks!',
            selectedVariant: 0,
            onSale: false,
            reviews: [],
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
        },
        shipping() {
            if (this.premium) {
                return "Free";
            }
            return "$2.99";
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview);
        })
    }
});

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
        </p>
        <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>
            <input type="submit" value="Submit">  
        </p>    
    </form>`,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
            } else {
                if (!this.name) this.errors.push("Name required!");
                if (!this.review) this.errors.push("Review required!");
                if (!this.rating) this.errors.push("Rating required!");
            }
        }
    }
});

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
    <div>
        <span class="tab" 
        :class="{ activeTab: selectedTab === tab }" 
        v-for="(tab, index) in tabs" 
        :key="index" 
        @click="selectedTab = tab">{{ tab }}</span>

        <div v-show="selectedTab==='Reviews'">
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>
        
        <product-review v-show="selectedTab==='Make a Review'"/>
    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }

});

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