module.exports = {
  name: 'core-shared-security',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/core/shared/security',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
