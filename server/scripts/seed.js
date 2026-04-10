import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import User from '../src/models/User.js'
import Blog from '../src/models/Blog.js'
import Comment from '../src/models/Comment.js'
import dbLogger from '../src/utils/dbLogger.js'
import { users } from '../fixtures/users.js'
import { blogs } from '../fixtures/blogs.js'
import { comments } from '../fixtures/comments.js'
import { v2 as cloudinary } from 'cloudinary'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Paths for seed images
const seedImagesDir = path.join(__dirname, '../seed-images')
const uploadsDir = path.join(__dirname, '../uploads/blogs')

// Ensure uploads directory exists
const ensureUploadsDir = () => {
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
    }
}

// Upload seed image to Cloudinary and return the URL
const uploadSeedImage = async (seedImageName) => {
    const sourcePath = path.join(seedImagesDir, seedImageName)

    if (!fs.existsSync(sourcePath)) {
        console.warn(`⚠️  Seed image not found: ${seedImageName}`)
        return null
    }

    try {
        const result = await cloudinary.uploader.upload(sourcePath, {
            folder: 'blogs'
        })
        return result.secure_url
    } catch (error) {
        console.error(`❌ Error uploading image to Cloudinary: ${error.message}`)
        return null
    }
}

// Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ Connected to MongoDB')
    } catch (error) {
        console.error('❌ MongoDB connection error:', error)
        process.exit(1)
    }
}

// Clear existing uploaded images
const clearUploadedImages = () => {
    if (fs.existsSync(uploadsDir)) {
        const files = fs.readdirSync(uploadsDir)
        for (const file of files) {
            fs.unlinkSync(path.join(uploadsDir, file))
        }
        console.log('🗑️  Cleared existing uploaded images')
    }
}

// Seed database
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seed...\n')

        // Ensure uploads directory exists
        ensureUploadsDir()

        // Clear existing data and images
        await User.deleteMany({})
        await Blog.deleteMany({})
        await Comment.deleteMany({})
        clearUploadedImages()
        console.log('🗑️  Cleared existing data\n')

        // Create users
        const createdUsers = await User.create(users)
        console.log(`✅ Created ${createdUsers.length} users`)
        dbLogger.logEvent('SEED_USERS', `Created ${createdUsers.length} users`)

        // Display credentials
        console.log('\n📝 Test Credentials:')
        users.forEach(user => {
            console.log(`   ${user.role.toUpperCase()}: ${user.email} / ${user.password}`)
        })
        console.log()

        // Create blogs with alternating authors and staggered creation dates
        const createdBlogs = []
        const baseDate = new Date()

        console.log('📷 Uploading seed images to Cloudinary...')

        for (let i = 0; i < blogs.length; i++) {
            const author = createdUsers[i % createdUsers.length]
            const blogData = blogs[i]

            // Upload seed image and get the URL
            const imagePath = await uploadSeedImage(blogData.seedImage)

            if (!imagePath) {
                console.error(`❌ Could not upload image for blog: ${blogData.title}`)
                continue
            }

            // Calculate creation date: each article is 1 day apart, starting from today going backwards
            // Also add different hours to make times more realistic
            const createdAt = new Date(baseDate)
            createdAt.setDate(createdAt.getDate() - i)
            createdAt.setHours(9 + (i * 2) % 12, (i * 17) % 60, 0, 0) // Vary hours and minutes

            const blog = await Blog.create({
                title: blogData.title,
                subTitle: blogData.subTitle,
                description: blogData.description,
                category: blogData.category,
                image: imagePath,
                author: author._id,
                authorName: author.name,
                isPublished: i !== 0, // First article is draft, rest are published
                createdAt,
                updatedAt: createdAt
            })
            createdBlogs.push(blog)
            dbLogger.logCreate('blogs', blog)
        }
        console.log(`✅ Created ${createdBlogs.length} blog posts\n`)

        // Create comments distributed across all blogs
        let commentCount = 0
        for (let i = 0; i < comments.length; i++) {
            const blogIndex = i % createdBlogs.length
            const comment = await Comment.create({
                ...comments[i],
                blog: createdBlogs[blogIndex]._id
            })
            dbLogger.logCreate('comments', comment)
            commentCount++
        }
        console.log(`✅ Created ${commentCount} comments\n`)

        dbLogger.logEvent('SEED_COMPLETE', 'Database seeded successfully')
        console.log('🎉 Database seeded successfully!\n')

    } catch (error) {
        console.error('❌ Seed error:', error)
        dbLogger.logError('SEED_ERROR', error)
        process.exit(1)
    }
}

// Run seed
const runSeed = async () => {
    await connectDB()
    await seedDatabase()
    await mongoose.connection.close()
    console.log('👋 Database connection closed\n')
    process.exit(0)
}

// Execute if run directly
if (process.argv[1] === __filename) {
    runSeed()
}

export default runSeed