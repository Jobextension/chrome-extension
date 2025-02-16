// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production', // 또는 'development'
  entry: './scripts/service-worker.js', // 여러분의 엔트리 포인트 (예: 기존에 작성한 순수 JS 파일)
  output: {
    filename: 'bundle.js', // 번들링된 파일 이름
    path: path.resolve(__dirname, 'dist'), // 출력 폴더
  },
};