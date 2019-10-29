module.exports = {
  name: 'customer-lazy-account',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/customer/lazy/account',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
