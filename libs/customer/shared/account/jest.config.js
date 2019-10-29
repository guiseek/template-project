module.exports = {
  name: 'customer-shared-account',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/customer/shared/account',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
