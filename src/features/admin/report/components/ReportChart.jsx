import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function ReportChart({ list }) {
    const [reports, setRepost] = React.useState({});
    const handleTotalFP = () => {
        if (list.length === 0) return '(Tổng PAKD: 0 / Tổng giá bán: 0 / Tổng lợi nhuận: 0)';
        let totalSelling = 0;
        let totalMargin = 0;
        let totalFP = 0;
        list.map((item) => {
            totalSelling += parseInt(item.selling);
            totalMargin += parseInt(item.margin);
            totalFP++;
            return item;
        })

        return `(Tổng PAKD: ${totalFP} / Tổng giá bán: ${totalSelling.toLocaleString()} / Tổng lợi nhuận: ${totalMargin.toLocaleString()})`
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                //text: handleTotalFP(),
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 2',
                data: [15, 25, 35, 45, 55, 65, 75],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    React.useEffect(() => {
        if (list.length !== 0) {
            let labels = []
            let selling = []
            list.map((item) => {
                labels.push(item.code);
                selling.push(item.selling);
                return item;
            })
            setRepost({
                labels: labels,
                datasets: [
                    {
                        label: 'Dataset 2',
                        data: selling,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            })
        }


    }, [list]);

    console.log(list)
    return <Bar options={options} data={reports} />;

}

export default ReportChart;