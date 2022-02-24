const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const rulesForStyles = {
   test: /\.css$/,
   use: ['style-loader', 'css-loader']
}

const rulesForJavscript = {
   test: /\.js$/,
   loader: 'babel-loader',
   options: {
      presets: [
         [
            '@babel/preset-react',
            {
               runtime: 'automatic' // cuando babel detecta que necesita React lo importa directamente  
               // 'classic' => es necesario importar react en los modulos. 
            }
         ]
      ]
   }
}

const rules = [ rulesForJavscript, rulesForStyles ]

module.exports = ( env, argv ) => {
   const {mode} = argv;
   const isProduction = mode === 'production';
   return {
      // entry: './src/index.js'
      output: {
         filename: isProduction ? '[name].[contenthash].js' : 'main.js',
         path: path.resolve(__dirname, 'build') 
      },
      plugins: [
         new HtmlWebpackPlugin({template: 'src/index.html'})
      ],
      module: { rules },
      devServer: {
         open: true,
         port: 3000, 
         compress: true
   
      },
      devtool: 'source-map'
   }
}