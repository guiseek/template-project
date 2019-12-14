module.exports = {
  name: 'core-shared-fire',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/core/shared/fire',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
