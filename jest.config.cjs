module.exports = {
  transform: {
    "^.+\\.vue$": "vue-jest", // Use "vue-jest" para Vue 3
    "^.+\\.tsx?$": "babel-jest", // Suporte a arquivos TypeScript/JavaScript
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "vue"],
  testEnvironment: "jest-environment-jsdom", // Certifique-se de usar o ambiente correto
};
