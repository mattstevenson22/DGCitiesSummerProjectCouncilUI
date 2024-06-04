import CountUp from "react-countup";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
ChartJS.register(Tooltip, Legend, ArcElement); 

export default function Dashboard() {

    const totalNoOfComplaints = 1485

    const categoryPieChartData = {
      labels: ["Category 1", "Category 2", "Category 3"],
      datasets: [
        {
          label: "Complaints by Category",
          data: [60,40,20],
          backgroundColor: [
            "rgba(255,99,132,1)",
            "rgba(54,162,235,1)",
            "rgba(153,102,255,1)"
          ],
          hoverOffset: 4,
        }
      ]
    };


    const areaPieChartData = {
      labels: ["Area 1", "Area 2", "Area 3"],
      datasets: [
        {
          label: "Complaints by Area",
          data: [100,10,52],
          backgroundColor: [
            "rgba(255,99,132,1)",
            "rgba(54,162,235,1)",
            "rgba(153,102,255,1)"
          ],
          hoverOffset: 4,
        }
      ]
    };

    const options = {
      maintainAspectRatio: false,
      responsive: true
    }








    return (
      <div className="dashboard-container">

        <div className="dashtile">
           <p className="totalComplaintsHeader"> Total Number of Complaints: </p>
           <CountUp className="totalComplaintsValue" end={totalNoOfComplaints} />
        </div>

        <div className="dashtile"> 
          <p> Complaints by Category: </p>
          <div className="piechart-container">
            <Pie data={categoryPieChartData} options={options} />
          </div>
        </div>

        <div className="dashtile"> 
          <p> Category with the <span className="bad"> most </span> complaints in prev. month: </p>
          <p> INSERT CATGEORY </p>
          <p> Category with the <span className="good"> least </span> complaints in prev. month: </p>
          <p> INSERT CATGEORY </p>
        </div>

        <div className="dashtile">
          <p> Complaints by Area: </p>
          <div className="piechart-container">
            <Pie data={areaPieChartData} options={options} />
          </div>
        </div>

        <div className="dashtile">
          <p> Area with the <span className="bad"> most </span> complaints in prev. month: </p>
          <p>  </p>
          <p> Area with the <span className="good"> least </span> complaints in prev. month: </p>
          <p> INSERT AREA </p>
        </div>

        <div className="dashtile">
           <p> Number of complaints resolved in prev. month, relative to past months: </p>
           <p> INSERT BAR CHART </p>
        </div>


      </div>
    );
  }
  