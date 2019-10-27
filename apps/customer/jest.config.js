module.exports = {
  name: 'customer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/customer',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
