require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Product = mongoose.model("Product", new mongoose.Schema({
    id:{ type:Number, required:true },
    name:{ type:String, required:true },
    image:{ type:String, required:true },
    category:{ type:String, required:true },
    new_price:{ type:Number, required:true },
    old_price:{ type:Number, required:true },
    date:{ type:Date, default:Date.now },
    avilable:{ type:Boolean, default:true },
}));

const categories = ["women", "men", "kid"];
const adjectives = ["Awesome", "Stylish", "Trendy", "Classic", "Modern", "Casual", "Elegant"];
const nouns = ["Jacket", "Shirt", "Dress", "T-Shirt", "Hoodie", "Sweater", "Jeans"];

function generateRandomProduct(id, filename) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const name = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${category} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
    const new_price = Math.floor(Math.random() * 50) + 20;
    const old_price = new_price + Math.floor(Math.random() * 30) + 10;
    
    return new Product({
        id: id,
        name: name,
        image: `http://localhost:${process.env.PORT || 4000}/images/${filename}`,
        category: category,
        new_price: new_price,
        old_price: old_price,
    });
}

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB for seeding...");

        // Clear existing just in case
        await Product.deleteMany({});
        console.log("Cleared existing products.");

        const imagesDir = path.join(__dirname, 'upload', 'images');
        const files = fs.readdirSync(imagesDir).filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'));
        
        let count = 1;
        for (const file of files) {
            const product = generateRandomProduct(count, file);
            await product.save();
            count++;
        }
        
        console.log(`Successfully seeded ${files.length} products to the database!`);
    } catch (err) {
        console.error("Seeding error:", err);
    } finally {
        mongoose.connection.close();
    }
}

seed();
