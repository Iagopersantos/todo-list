module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        modules: false, // Não converte módulos para CommonJS
      },
    ],
    '@babel/preset-typescript',
  ],
};
