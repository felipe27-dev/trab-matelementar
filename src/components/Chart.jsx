import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from "recharts";

export default function Chart({ data, referenceDots = [], tipo }) {
  const yDomain = tipo === "tangente" ? [-5, 5] : [-1.1, 1.1];

  return (
    <div className="w-[900px] h-[300px] bg-white rounded-lg p-4 shadow-lg ">
      <LineChart width={850} height={290} data={data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />

        <XAxis
          dataKey="x"
          type="number"
          domain={[0, 360]}
          label={{ value: "Ângulo (°)", position: "insideBottom", offset: -5 }}
        />

        <YAxis
          domain={yDomain}
          label={{
            value: tipo.charAt(0).toUpperCase() + tipo.slice(1),
            angle: -90,
            position: "insideLeft",
          }}
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="y"
          stroke={
            tipo === "seno"
              ? "#FF4081"
              : tipo === "cosseno"
              ? "#00BCD4"
              : "#FFA726"
          }
          strokeWidth={2}
          dot={false}
        />

        {referenceDots.map((dot, i) => (
          <ReferenceDot
            key={i}
            x={dot.x}
            y={dot.y}
            r={6}
            fill={dot.color}
            stroke="#fff"
            label={{
              value: `${dot.x.toFixed(2)}°`,
              position: "top",
            }}
          />
        ))}
      </LineChart>
    </div>
  );
}
