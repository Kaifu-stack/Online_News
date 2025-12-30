import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const trafficData = [
    { name: "Mon", users: 120 },
    { name: "Tue", users: 210 },
    { name: "Wed", users: 320 },
    { name: "Thu", users: 280 },
    { name: "Fri", users: 250 },
    { name: "Sat", users: 360 },
    { name: "Sun", users: 420 },
];

const TrafficChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TrafficChart;
