import MonthlyWeightOption from './MonthlyWeight'


export default function(chartName){
  const options = {
    MonthlyWeight:MonthlyWeightOption
  }
  return options[chartName]
}
