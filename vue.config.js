module.exports = {
    outputDir: process.env.outputDir,
    publicPath: process.env.NODE_ENV === 'development'? './': '/hybrid-message/',
    devServer: {
        open: true,
    }
}
