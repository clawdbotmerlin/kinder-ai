module.exports = function (api) {
  api.cache.invalidate(() => process.env.NODE_ENV);
  const isTest = process.env.NODE_ENV === 'test';
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ...(isTest ? [] : ['nativewind/babel']),
      'react-native-reanimated/plugin',
    ],
  };
};
