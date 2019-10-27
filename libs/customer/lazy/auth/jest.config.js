module.exports = {
  name: 'customer-lazy-auth',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/customer/lazy/auth',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
