require('dotenv').config()

module.exports = {
    mongodb: {
        url: process.env.MONGODB_URI || 'mongodb://studysprint:studysprint123@localhost:27017/studysprint',
        options: {}
    },

    migrationsDir: 'migrations',
    changelogCollectionName: 'changelog',
    migrationFileExtension: '.js',
    useFileHash: false,
    moduleSystem: 'esm',
}