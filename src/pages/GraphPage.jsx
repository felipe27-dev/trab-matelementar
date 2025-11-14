import { TextField } from "@mui/material";
import Chart from "../components/Chart";
import { useState } from "react";

function GraphPage() {
  const [values, setValues] = useState({
    seno: "",
    cosseno: "",
    tangente: "",
    angulos: { seno: [], cosseno: [], tangente: [] },
  });

  // Gera curva completa de 0° a 360°
  const gerarDados = (tipo) => {
    const data = [];
    for (let i = 0; i <= 360; i += 1) {
      const rad = (i * Math.PI) / 180;
      let y;
      if (tipo === "seno") y = Math.sin(rad);
      else if (tipo === "cosseno") y = Math.cos(rad);
      else if (tipo === "tangente") y = Math.tan(rad);

      // Evita tangente infinita
      if (Math.abs(y) > 5) y = NaN;

      data.push({ x: i, y });
    }
    return data;
  };

  // ===== Funções trigonométricas inversas =====
  const acharAngulosPeloSeno = (seno) => {
    if (seno < -1 || seno > 1) return [];
    const rad = Math.asin(seno);
    const graus = rad * (180 / Math.PI);
    return [
      (graus + 360) % 360,
      (180 - graus + 360) % 360,
    ];
  };

  const acharAngulosPeloCosseno = (cosseno) => {
    if (cosseno < -1 || cosseno > 1) return [];
    const rad = Math.acos(cosseno);
    const graus = rad * (180 / Math.PI);
    return [
      (graus + 360) % 360,
      (360 - graus + 360) % 360,
    ];
  };

  const acharAngulosPelaTangente = (tan) => {
    const rad = Math.atan(tan);
    const graus = rad * (180 / Math.PI);
    return [
      (graus + 360) % 360,
      (graus + 180) % 360,
    ];
  };

  // ===== Atualização dos valores =====
  const recalcular = (tipo, value) => {
    const val = parseFloat(value);
    const novoEstado = { ...values, [tipo]: value };

    if (isNaN(val)) {
      novoEstado.angulos[tipo] = [];
      setValues(novoEstado);
      return;
    }

    let angs = [];
    if (tipo === "seno") angs = acharAngulosPeloSeno(val);
    if (tipo === "cosseno") angs = acharAngulosPeloCosseno(val);
    if (tipo === "tangente") angs = acharAngulosPelaTangente(val);

    novoEstado.angulos[tipo] = angs;
    setValues(novoEstado);
  };

  // ===== Dados =====
  const dataSeno = gerarDados("seno");
  const dataCosseno = gerarDados("cosseno");
  const dataTangente = gerarDados("tangente");

  // ===== Pontos de referência =====
const refDotsSeno = values.angulos.seno.map((ang, i) => ({
  x: ang,
  y: parseFloat(Math.sin((ang * Math.PI) / 180).toFixed(6)),
  color: i === 0 ? "#FF4081" : "#FFA726",
}));

const refDotsCosseno = values.angulos.cosseno.map((ang, i) => ({
  x: ang,
  y: parseFloat(Math.cos((ang * Math.PI) / 180).toFixed(6)),
  color: i === 0 ? "#29B6F6" : "#81D4FA",
}));

const refDotsTangente = values.angulos.tangente.map((ang, i) => ({
  x: ang,
  y: parseFloat(Math.tan((ang * Math.PI) / 180).toFixed(6)),
  color: i === 0 ? "#AB47BC" : "#CE93D8",
}));


  return (
    <div className="w-full h-full flex flex-col items-center bg-[#2e3f91] gap-y-8" style={{ paddingTop: "50px" }}>
      <h1 className="text-4xl text-white font-bold">Criação de Gráficos</h1>
      <h3 className="text-2xl text-white font-bold">Insira os valores das funções</h3>

      <div className="flex flex-row gap-6 mt-4">
        <TextField
          label="Seno"
          variant="outlined"
          value={values.seno}
          onChange={(e) => recalcular("seno", e.target.value)}
          sx={inputStyle}
        />
        <TextField
          label="Cosseno"
          variant="outlined"
          value={values.cosseno}
          onChange={(e) => recalcular("cosseno", e.target.value)}
          sx={inputStyle}
        />
        <TextField
          label="Tangente"
          variant="outlined"
          value={values.tangente}
          onChange={(e) => recalcular("tangente", e.target.value)}
          sx={inputStyle}
        />
      </div>

      {/* Gráficos */}
      <div className="flex flex-col items-center gap-10 mt-8">
        <Chart data={dataSeno} referenceDots={refDotsSeno} tipo="seno" />
        <Chart data={dataCosseno} referenceDots={refDotsCosseno} tipo="cosseno" />
        <Chart data={dataTangente} referenceDots={refDotsTangente} tipo="tangente" />
      </div>
    </div>
  );
}

// ===== Estilo dos inputs =====
const inputStyle = {
  input: { color: "white" },
  label: { color: "white" },
  width: "180px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "white" },
    "&:hover fieldset": { borderColor: "#FFF558" },
    "&.Mui-focused fieldset": { borderColor: "#fff" },
  },
};

export default GraphPage;
