module.exports = {
  displayName: 'voting-dapp',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
      astTransformers: {
        before: [
          'jest-preset-angular/build_old/InlineFilesTransformer',
          'jest-preset-angular/build_old/StripStylesTransformer',
        ],
      },
    },
  },
  coverageDirectory: '../../coverage/apps/voting-dapp',
  snapshotSerializers: [
    'jest-preset-angular/build_old/serializers/no-ng-attributes',
    'jest-preset-angular/build_old/serializers/ng-snapshot',
    'jest-preset-angular/build_old/serializers/html-comment',
  ],
};
