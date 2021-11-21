import React from 'react'
import { Bar } from "react-chartjs-2";
export default function AdminShowRoomBar() {
    return (
        <div>
            <div style={{ maxWidth: "650px", maxHeight:"280px" }}>
              <Bar
                data={{
                  // Name of the variables on x-axies for each bar
                  labels: [ "Approved", "Reject", "Disbursed","Pending"],
                  datasets: [
                    {
                      // Label for bars
                      label: "Total Application : 240",
                      // Data or value of your each variable
                      data: [190, 50, 100,40],
                      // Color of each bar
                      backgroundColor: ["aqua", "Yellow", "red", "green"],
                      // Border color of each bar
                      borderColor: ["", "", "", ""],
                      borderWidth: 0.5,
                    },
                  ],
                }}
                // Height of graph
                height={300}
                options={{
                  maintainAspectRatio: false,
                  legend: {
                    labels: {
                      fontSize: 15,
                    },
                  },
                }}
              />
            </div>
        </div>
    )
}
