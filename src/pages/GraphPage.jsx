// GraphPage.jsx
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

  // Gera curva de 0° a 360°
  const gerarDados = (tipo) => {
    const data = [];
    for (let i = 0; i <= 360; i++) {
      const rad = (i * Math.PI) / 180;
      let y;
      if (tipo === "seno") y = Math.sin(rad);
      else if (tipo === "cosseno") y = Math.cos(rad);
      else if (tipo === "tangente") {
        y = Math.tan(rad);
        if (Math.abs(y) > 5) y = NaN; // limita a tangente
      }
      data.push({ x: i, y });
    }
    return data;
  };

  // ===== Inversas =====
  const acharAngulosPeloSeno = (seno) => {
    if (seno < -1 || seno > 1) return [];
    const rad = Math.asin(seno);
    const graus = rad * (180 / Math.PI);
    // retorno com números e normalizando 0-360
    const a1 = ((graus % 360) + 360) % 360;
    const a2 = ((180 - graus) % 360 + 360) % 360;
    return [a1, a2];
  };

  const acharAngulosPeloCosseno = (cosseno) => {
    if (cosseno < -1 || cosseno > 1) return [];
    const rad = Math.acos(cosseno);
    const graus = rad * (180 / Math.PI);
    const a1 = ((graus % 360) + 360) % 360;
    const a2 = ((360 - graus) % 360 + 360) % 360;
    return [a1, a2];
  };

  const acharAngulosPelaTangente = (tan) => {
    const rad = Math.atan(tan);
    const graus = rad * (180 / Math.PI);
    const a1 = ((graus % 360) + 360) % 360;
    const a2 = ((graus + 180) % 360 + 360) % 360;
    return [a1, a2];
  };

  // Normalize input (substitui vírgula por ponto)
  const parseBrazilNumber = (str) => {
    if (typeof str !== "string") return NaN;
    const cleaned = str.replace(",", ".").trim();
    // evita strings vazias
    if (cleaned === "") return NaN;
    return parseFloat(cleaned);
  };

  // Atualiza estado com cópia profunda de angulos e tratando números
  const recalcular = (tipo, rawValue) => {
    const val = parseBrazilNumber(rawValue);

    // sempre cria novo objeto para forçar rerender
    const novoEstado = {
      ...values,
      [tipo]: rawValue,
      angulos: {
        ...values.angulos,
        [tipo]: [],
      },
    };

    if (!isNaN(val)) {
      let angs = [];
      if (tipo === "seno") angs = acharAngulosPeloSeno(val);
      if (tipo === "cosseno") angs = acharAngulosPeloCosseno(val);
      if (tipo === "tangente") angs = acharAngulosPelaTangente(val);

      // remove duplicatas próximas (por segurança) e arredonda pros pontos do gráfico
      const unique = [];
      angs.forEach((a) => {
        const rounded = Math.round((a + Number.EPSILON) * 1000000) / 1000000;
        if (!unique.some((u) => Math.abs(u - rounded) < 1e-8)) unique.push(rounded);
      });

      novoEstado.angulos[tipo] = unique;
    } else {
      novoEstado.angulos[tipo] = [];
    }

    setValues(novoEstado);
  };

  // Dados
  const dataSeno = gerarDados("seno");
  const dataCosseno = gerarDados("cosseno");
  const dataTangente = gerarDados("tangente");

  // Pontos de referência (assegura Number)
  const refDotsSeno = values.angulos.seno.map((ang, i) => {
    const angNum = Number(ang);
    return {
      x: angNum,
      y: parseFloat(Math.sin((angNum * Math.PI) / 180).toFixed(6)),
      color: i === 0 ? "#FF4081" : "#FFA726",
    };
  });

  const refDotsCosseno = values.angulos.cosseno.map((ang, i) => {
    const angNum = Number(ang);
    return {
      x: angNum,
      y: parseFloat(Math.cos((angNum * Math.PI) / 180).toFixed(6)),
      color: i === 0 ? "#29B6F6" : "#81D4FA",
    };
  });

  const refDotsTangente = values.angulos.tangente.map((ang, i) => {
    const angNum = Number(ang);
    const tanVal = Math.tan((angNum * Math.PI) / 180);
    return {
      x: angNum,
      y: Math.abs(tanVal) > 1e4 ? NaN : parseFloat(tanVal.toFixed(6)),
      color: i === 0 ? "#AB47BC" : "#CE93D8",
    };
  });

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#2e3f91] gap-y-8 pt-12">
      <h1 className="text-4xl text-white font-bold">Criação de Gráficos</h1>
      <h3 className="text-2xl text-white font-bold">Insira os valores das funções</h3>

      <div className="flex flex-row gap-6 mt-4">
        <TextField
          label="Seno"
          variant="outlined"
          value={values.seno}
          onChange={(e) => recalcular("seno", e.target.value)}
          sx={inputStyle}
          placeholder="ex: 0.1 ou 0,1"
        />
        <TextField
          label="Cosseno"
          variant="outlined"
          value={values.cosseno}
          onChange={(e) => recalcular("cosseno", e.target.value)}
          sx={inputStyle}
          placeholder="ex: 0.1 ou 0,1"
        />
        <TextField
          label="Tangente"
          variant="outlined"
          value={values.tangente}
          onChange={(e) => recalcular("tangente", e.target.value)}
          sx={inputStyle}
          placeholder="ex: 1 ou 0,5"
        />
      </div>

      <div className="flex flex-col items-center gap-10 mt-8">
        <Chart data={dataSeno} referenceDots={refDotsSeno} tipo="seno" />
        <Chart data={dataCosseno} referenceDots={refDotsCosseno} tipo="cosseno" />
        <Chart data={dataTangente} referenceDots={refDotsTangente} tipo="tangente" />
      </div>
    </div>
  );
}

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
