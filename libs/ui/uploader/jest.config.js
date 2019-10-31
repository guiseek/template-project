module.exports = {
  name: 'ui-uploader',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/uploader',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
