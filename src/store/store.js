import { reactive } from "vue";

const data = reactive([
    {id:1, name:'Spinneys Black Eyed Peas- 500 Gm', imgLink:'https://mcprod.spinneys-egypt.com/media/catalog/product/cache/36b410f085b47d6b5accd0d7fc6177ea/3/5/356385.jpg?width=250&format=webp',
     hasWeight:false, price:39.95, },

    {id:2, name:'Spinneys Grooved Sponge Scrubbers - 3 per pack', imgLink:'https://mcprod.spinneys-egypt.com/media/catalog/product/cache/36b410f085b47d6b5accd0d7fc6177ea/3/2/328462_1.jpg?width=250&format=webp',
     hasWeight:false, price:27.50, },

    {id:3, name:'SPINNEYS - SUPREME ALUMINUM FOIL - 45*40', imgLink:'https://mcprod.spinneys-egypt.com/media/catalog/product/cache/36b410f085b47d6b5accd0d7fc6177ea/3/2/328780.jpg?width=250&format=webp',
     hasWeight:false, price:123.5, },

    {id:4, name:'Spinneys Value Corn Oil - 900 ml', imgLink:'https://mcprod.spinneys-egypt.com/media/catalog/product/cache/36b410f085b47d6b5accd0d7fc6177ea/3/4/346360_1.jpg?width=250&format=webp',
     hasWeight:false, price:59.45, },

    {id:5, name:'Spinneys Green Olives - 600 gr', imgLink:'https://mcprod.spinneys-egypt.com/media/catalog/product/cache/36b410f085b47d6b5accd0d7fc6177ea/3/5/356485_1.jpg?width=250&format=webp',
     hasWeight:false, price:52.50, },

    {id:6, name:' Beef Entrecote Balady ', imgLink:'https://mcprod.spinneys-egypt.com/media/catalog/product/cache/36b410f085b47d6b5accd0d7fc6177ea/8/s/8spqvmzabjxpgxmvn1wqcu6k0afeuljm_1.jpg?width=250&format=webp',
     hasWeight:true, price:332, },
])

const functions = {
    addItemToCart (newItem) {
        this.totalPrice += newItem.totalPrice
        const existingTypeIndex = this.items.findIndex( item => {
            return item.id === newItem.id;
        });

        const existingType = this.items[existingTypeIndex];

        if (existingType) {
            if (newItem.hasWeight) {
                const itemThatHasSameWeightIndex = this.items.findIndex(item => {
                    return item.weight === newItem.weight
                })
                const itemThatHasSameWeight = this.items[itemThatHasSameWeightIndex]
                if(itemThatHasSameWeight) {
                    this.items[itemThatHasSameWeightIndex].amount += newItem.amount
                    this.items[itemThatHasSameWeightIndex].totalPrice = (this.items[itemThatHasSameWeightIndex].amount * this.items[itemThatHasSameWeightIndex].price).toFixed(2)
                }
                else {
                    this.items.push({name:newItem.name, id:newItem.id, amount:newItem.amount, weight:newItem.weight, hasWeight:true, itemId:this.items.length, totalPrice:newItem.totalPrice, price:newItem.price, imgLink:newItem.imgLink})
                }
            }
            else {
                this.items[existingTypeIndex].amount += newItem.amount
                this.items[existingTypeIndex].totalPrice = (this.items[existingTypeIndex].amount * this.items[existingTypeIndex].price).toFixed(2)
            }
        }
        else {
            if (newItem.hasWeight) {
                this.items.push({name:newItem.name, id:newItem.id, amount:newItem.amount, weight:newItem.weight, hasWeight:true, itemId:this.items.length, totalPrice:newItem.totalPrice, price:newItem.price, imgLink:newItem.imgLink})
            }
            else {
                this.items.push({name:newItem.name, id:newItem.id, amount:newItem.amount, weight:null, hasWeight:false, itemId:this.items.length, totalPrice:newItem.totalPrice, price:newItem.price, imgLink:newItem.imgLink})
            }
        }
    },
    removeItemFromCart (id, action) {
        /*  
        action : minus
            - check the amount
                - if amount = 1 then remove 
                - if amount > 1 then --
        action : remove 
            - remove     
        */
        const existingItemIndex = this.items.findIndex( item => {
            return item.itemId === id;
        });
        const existingItem = this.items[existingItemIndex]; 
        
        if (action === 'minus') {
            if (existingItem.amount === 1) {
                this.totalPrice -= this.items[existingItemIndex].totalPrice;
                this.items.splice(existingItemIndex,1);
            }
            else {
                this.items[existingItemIndex].amount --;
                this.totalPrice -= this.items[existingItemIndex].price;
                this.items[existingItemIndex].totalPrice -= this.items[existingItemIndex].price
            }
        }
        else {
            this.totalPrice -= this.items[existingItemIndex].totalPrice;
            this.items.splice(existingItemIndex,1);
        }
    }
    
}
const cart = reactive({
    items:[],
    totalPrice:0,
    addToCart:functions.addItemToCart,
    removeFromCart:functions.removeItemFromCart
})



const store = {
    data,
    cart
}
export default store;