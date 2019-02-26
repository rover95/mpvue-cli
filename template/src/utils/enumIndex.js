// 枚举索引
export const selectSourceDataMap = [
  {
    text: '审核意见',
    value: 'auditPass'
  },
  {
    text: '处理部门',
    value: 'wlcnIssueDepartment'
  }
];
export const selectSourceData = {
  auditPass: [{
    value: true,
    text: '同意'
  }, {
    value: false,
    text: '不同意'
  }],
  wlcnIssueDepartment: [{
    value: "ROAD",
    text: '道路交通处理'
  }, {
    value: "CITY",
    text: '城市管理处理'
  }, {
    value: "DEFALUT",
    text: '安全生产处理'
  }]
}