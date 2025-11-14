import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot } from 'recharts';

export default function Chart({ data, referenceDots = [], tipo }) {
  // Domínio vertical depende do tipo
  const yDomain = tipo === 'tangente' ? [-5, 5] : [-1.1, 1.1];

  // 🔧 Arredonda e garante que todos os pontos válidos fiquem visíveis
  const safeDots = referenceDots
    .map(dot => ({
      ...dot,
      y: parseFloat(dot.y.toFixed(6)), // arredonda valores flutuantes
    }))
    .filter(dot => !isNaN(dot.y)); // remove apenas os impossíveis (ex: tangente infinita)

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid stroke="#ffffff55" strokeDasharray="3 3" />
      <XAxis
        dataKey="x"
        tick={{ fill: '#fff' }}
        stroke="#fff"
        domain={[0, 360]}
        label={{
          value: 'Ângulo (°)',
          position: 'insideBottom',
          offset: -5,
          fill: '#fff',
        }}
      />
      <YAxis
        domain={yDomain}
        tick={{ fill: '#fff' }}
        stroke="#fff"
        label={{
          value: tipo.charAt(0).toUpperCase() + tipo.slice(1),
          angle: -90,
          position: 'insideLeft',
          fill: '#fff',
        }}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: '#222',
          border: '1px solid #fff',
          color: '#fff',
        }}
        cursor={{ stroke: '#fff', strokeWidth: 2 }}
      />

      {/* Linha principal */}
      <Line
        type="monotone"
        dataKey="y"
        stroke={
          tipo === 'seno'
            ? '#FF4081'
            : tipo === 'cosseno'
            ? '#00BCD4'
            : '#FFA726'
        }
        strokeWidth={2}
        dot={false}
      />

      {/* Pontos de referência */}
      {safeDots.map((dot, i) => (
        <ReferenceDot
          key={i}
          x={dot.x}
          y={dot.y}
          r={6}
          fill={dot.color}
          stroke="#fff"
          label={{
            position: 'top',
            value: `${dot.x.toFixed(0)}°`,
            fill: '#fff',
          }}
          isFront={true}
        />
      ))}
    </LineChart>
  );
}
