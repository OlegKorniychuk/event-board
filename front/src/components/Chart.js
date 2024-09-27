import CanvasJSReact from '@canvasjs/react-charts'

let CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
export function Chart(props) {
  const dataPoints = props.dataPoints
  console.log("chart data")
  console.log(dataPoints)
  const options = {
    theme: 'light2',
    animationEnabled: true,
    title: {
      text: 'Registrations per day',
    },
    axisX: {
      valueFormatString: "DD MMM",
    },
    axisY: {
      title: "Registrations"
    },
    data: [
      {
        type: 'column',
        dataPoints: dataPoints,
      },
    ],
  };	

  return (
  <div>
    <CanvasJSChart options = {options}/>
  </div>
  );
}                             