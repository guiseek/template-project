module.exports = {
  name: 'ui-shared',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/shared',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
