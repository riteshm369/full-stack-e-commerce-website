require('dotenv').config();
const mongoose = require('mongoose');

const Product = mongoose.model("Product", new mongoose.Schema({
    id:{ type:Number },
    name:{ type:String },
    image:{ type:String },
    category:{ type:String },
    new_price:{ type:Number },
    old_price:{ type:Number },
    date:{ type:Date },
    avilable:{ type:Boolean },
}));

async function fixUrls() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB...");

        const products = await Product.find({});
        console.log(`Found ${products.length} products to check...`);

        let updatedCount = 0;
        for (const product of products) {
            if (product.image && product.image.includes('http://localhost:4000')) {
                const newUrl = product.image.replace('http://localhost:4000', 'https://full-stack-e-commerce-website-ordn.onrender.com');
                product.image = newUrl;
                await product.save();
                updatedCount++;
            }
        }
        
        console.log(`Successfully updated image URLs for ${updatedCount} products!`);
    } catch (err) {
        console.error("Error updating URLs:", err);
    } finally {
        mongoose.connection.close();
    }
}

fixUrls();
