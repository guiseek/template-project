module.exports = {
  name: 'ui-nav',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/nav',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
