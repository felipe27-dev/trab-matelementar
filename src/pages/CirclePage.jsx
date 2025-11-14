import { useState, useRef } from "react";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

function CirclePage() {
  const [mousePosition, setMousePosition] = useState({ x: 185, y: 185 });
  const [ratios, setRatios] = useState({ seno: true, cosseno: true, tangente: true });
  const [pointStop, setPointStop] = useState(false);
  const [quadrant, setQuadrant] = useState(0);
  const [anglePoint, setAnglePoint] = useState(0);
  const circleRef = useRef(null);

  const pointSize = 12;

  function handleMoveMouse(e) {
    e.preventDefault();
    if (!circleRef.current) return;

    const rect = circleRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = rect.width / 2 - 4;

    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);

    const xAbs = cx + radius * Math.cos(angle);
    const yAbs = cy + radius * Math.sin(angle);

    const leftRelative = xAbs - rect.left - pointSize / 2;
    const topRelative = yAbs - rect.top - pointSize / 2;

    if (!pointStop) {
      setMousePosition({ x: leftRelative, y: topRelative });
      calculateAnglePoint(e, angle);
    }
  }

  function calculateRadius() {
    if (!circleRef.current) return;
    const rect = circleRef.current.getBoundingClientRect();
    return rect.width / 2 - 4;
  }

  function updateAngleFromInput(value) {
    const angleDeg = Number(value);
    setAnglePoint(angleDeg);

    if (!circleRef.current) return;

    const rect = circleRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radius = rect.width / 2 - 4;

    const angleRad = ((360 - angleDeg) * Math.PI) / 180;
    const x = cx + radius * Math.cos(angleRad) - pointSize / 2;
    const y = cy + radius * Math.sin(angleRad) - pointSize / 2;

    setMousePosition({ x, y });
    calculateQuadrant(angleDeg);
  }

  function calculateQuadrant(angle) {
    if (!angle) angle = anglePoint;
    if (angle >= 0 && angle <= 90) setQuadrant(1);
    else if (angle >= 90 && angle <= 180) setQuadrant(2);
    else if (angle >= 180 && angle <= 270) setQuadrant(3);
    else if (angle >= 270 && angle <= 360) setQuadrant(4);
  }

  function calculateAnglePoint(e, angle) {
    const angleDegrees = angle * (180 / Math.PI);
    const angleAdjusted = angleDegrees >= 0 ? angleDegrees : angleDegrees + 360;
    const correctedAngle = (360 - angleAdjusted) % 360;
    setAnglePoint(correctedAngle);
    calculateQuadrant(correctedAngle);
  }

  function handleStopFollowingMouse(e) {
    e.preventDefault();
    setPointStop(!pointStop);
    const rect = circleRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = rect.width / 2 - 4;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);

    const xAbs = cx + radius * Math.cos(angle);
    const yAbs = cy + radius * Math.sin(angle);
    const leftRelative = xAbs - rect.left - pointSize / 2;
    const topRelative = yAbs - rect.top - pointSize / 2;

    setMousePosition({ x: leftRelative, y: topRelative });
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-start gap-5  flex-col items-center bg-[#2e3f91] ">
        <h1 className="text-4xl text-white font-bold mt-10">Círculo Trigonométrico</h1>
        <h3 className="text-lg text-white font-bold">Clique para fixar o ponto</h3>
        <div className="relative">
          <div
            ref={circleRef}
            className={`w-96 h-96 flex border-white border-8 rounded-full justify-center items-center ${pointStop ? '' : 'cursor-pointer'}`}
            onMouseMove={handleMoveMouse}
            onClick={handleStopFollowingMouse}
          >

            {/* Quadrantes coloridos */}
                   {quadrant === 1 && <div className="w-full h-full mt-4 flex rounded-[100%] justify-center items-center  bg-red-500 " style={{ clipPath: 'inset(0 0 50% 50%)' }}><h1 className="text-8xl text-white font-bold relative -top-[75px] left-[75px]">1</h1> </div>}
                    {quadrant === 2 && <div className="w-full h-full mt-4 flex rounded-[100%] bg-yellow-500 justify-center items-center" style={{ clipPath: 'inset(0 50% 50% 0)' }}><h1 className="text-8xl text-white font-bold relative -top-[75px] right-[75px]">2</h1></div>}
                    {quadrant === 3 && <div className="w-full h-full mt-4 flex rounded-[100%] bg-green-500 justify-center items-center" style={{ clipPath: 'inset(50% 50% 0 0)' }}> <h1 className="text-8xl text-white font-bold relative -bottom-[75px] right-[75px]">3</h1></div>}
                    {quadrant === 4 && <div className="w-full h-full mt-4 flex rounded-[100%] bg-blue-500 justify-center items-center" style={{ clipPath: 'inset(50% 0 0 50%)' }}><h1 className="text-8xl text-white font-bold relative -bottom-[75px] left-[75px]">4</h1></div>}
            {/* === LINHAS DO SENO, COSSENO, RAIO E TANGENTE === */}
            {(() => {
            const r = calculateRadius();
            const rad = (anglePoint * Math.PI) / 180;
            const cx = 190;
            const cy = 190;
            const x = cx + Math.cos(rad) * r;
            const y = cy - Math.sin(rad) * r;
            const senY = Math.sin(rad) * r;
            const cosX = Math.cos(rad) * r;

            // Posição base da tangente (reta vertical no ponto x = cx + r)
            const tanLength = Math.tan(rad) * r;
            const tanVisible = Math.abs(tanLength) > 300 ? 300 * Math.sign(tanLength) : tanLength; // limita visualmente

            return (
                <>
                {/* Raio */}
                <div
                    className="absolute border-[1.5px] border-gray-300"
                    style={{
                    left: cx,
                    top: cy,
                    width: Math.sqrt((x - cx) ** 2 + (y - cy) ** 2),
                    transformOrigin: "left center",
                    transform: `rotate(${-anglePoint}deg)`,
                    }}
                />

                {/* Seno */}
                {ratios.seno && (
                <>
                <div
                    className="absolute border-2 border-black"
                    style={{
                    left: x,
                    top: cy,
                    height: Math.abs(senY),
                    transform: senY < 0 ? "translateY(0)" : "translateY(-100%)",
                    }}
                />
                <span
                    className="absolute text-black text-sm font-semibold"
                    style={{
                    left: x + 10,
                    top: cy - senY / 2,
                    }}
                >
                    sen(θ)
                </span>
                </>
                )
                }

                {/* Cosseno */}
                {ratios.cosseno && (
                    <>
                    <div
                    className="absolute border-2 border-white"
                    style={{
                    top: cy,
                    left: cx,
                    width: Math.abs(cosX),
                    transform: cosX < 0 ? "translateX(-100%)" : "translateX(0)",
                    }}
                />
                <span
                    className="absolute text-white text-sm font-semibold"
                    style={{
                    top: cy + 10,
                    left: cx + cosX / 2 - 10,
                    }}
                >
                    cos(θ)
                </span>
                </>
                )}

                {/* Tangente — reta e linha visível */}
                {ratios.tangente && (
                <>
                <div
                    className="absolute border-l-2 border-orange-400"
                    style={{
                    left: cx + (cosX >= 0 ? r : -r),
                    top: cy - 150,
                    height: 300,
                    opacity: 0.5,
                    }}
                />
                <div
                    className="absolute border-2 border-orange-500"
                    style={{
                    left: cx + (cosX >= 0 ? r : -r),
                    top: cy,
                    height: Math.abs(tanVisible),
                    transform: tanVisible < 0 ? "translateY(0)" : "translateY(-100%)",
                    }}
                />
                <span
                    className="absolute text-orange-400 text-sm font-semibold"
                    style={{
                    left: cx + (cosX >= 0 ? r + 20 : -r - 60),
                    top: cy - tanVisible / 2 - 10,
                    }}
                >
                    tan(θ)
                </span>
                </>
            )}
                </>
            );
        
            })()}




            {/* Ponto móvel */}
            <div
              className={`w-3 h-3 rounded-full absolute ${pointStop ? 'bg-black' : 'bg-green-500'}`}
              style={{ left: mousePosition.x, top: mousePosition.y }}
            />
          </div>
        </div>
        
        {/* Input e Quadrante */}
        <div className="flex flex-row justify-center items-center gap-10">
          <TextField
            id="outlined-basic"
            label="Ângulo"
            variant="outlined"
            value={anglePoint.toFixed(2)}
            onChange={(e) => updateAngleFromInput(e.target.value)}
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              width: '150px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: '#aaa' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
            }}
          />
        </div>

        {/* Resultados */}
        <h1 className="text-4xl text-white font-bold mt-4">Resultados</h1>
        <div className="flex flex-row justify-center items-center flex-rows-3 gap-2">
          <h3 className="text-xl text-white font-bold">
            <Checkbox checked={ratios.tangente} onChange={() =>{setRatios({...ratios, tangente: !ratios.tangente})}}
            sx={{
            color: '#fff', // cor quando está desmarcada
            '&.Mui-checked': {
            color: '#00000', // cor quando está marcada
            }}}/>
            Tangente: {Number(Math.tan((anglePoint * Math.PI) / 180)).toPrecision(3) || '0'}
            </h3>
          <h3 className="text-xl text-white font-bold">
            <Checkbox checked={ratios.seno} onChange={() =>{setRatios({...ratios, seno: !ratios.seno})}}   
            sx={{
            color: '#fff', // cor quando está desmarcada
            '&.Mui-checked': {
            color: '#00000', // cor quando está marcada
            }}} />
            Seno: {Number(Math.sin((anglePoint * Math.PI) / 180)).toPrecision(3) || '0'}
          </h3>
          <h3 className="text-xl text-white font-bold">
            <Checkbox checked={ratios.cosseno} onChange={() =>{setRatios({...ratios, cosseno: !ratios.cosseno})}}
            sx={{
            color: '#fff', // cor quando está desmarcada
            '&.Mui-checked': {
            color: '#00000', // cor quando está marcada
            }}}/>
            Cosseno: {Number(Math.cos((anglePoint * Math.PI) / 180)).toPrecision(3) || '0'}
            </h3>
        </div>
      </div>
    </>
  );
}

export default CirclePage;
