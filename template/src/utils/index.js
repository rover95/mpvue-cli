function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date,type) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  if(type == 'CN'){
    return `${formatNumber(year)}年${formatNumber(month)}月${formatNumber(day)}日 ${formatNumber(hour)}时${formatNumber(minute)}分${formatNumber(second)}秒`;
  }else{
    return `${t1} ${t2}`
  }
}

// 冒泡排序
export function bubbleSort(array, key){
  let arr = array.concat([])
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j][key] < arr[j + 1][key]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

export default {
  formatNumber,
  formatTime,
  bubbleSort
};
