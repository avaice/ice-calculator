const path = require('path');

module.exports = {
    mode: "production",
    entry: './src/webEmbed.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [
            '.ts', '.js',
        ],
    },
};