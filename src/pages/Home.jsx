import TiltedCard from "../components/TiltedCard";


function Home() {
    return (
        <>
            <div className="w-full h-screen flex justify-center flex-col flex-col-1 items-center bg-[#2e3f91]">
                <h1 className="text-4xl text-white font-bold">Selecione a opção desejada</h1>
                <div className="w-1/2 h-1/2 flex flex-row flex-rows-4  justify-center items-center">
                    <TiltedCard
                    overlayContent={
                        <p className="text-center justify-center align-middle font-bold text-2xl">
                            Círculo Trigonométrico
                        </p>
                    }
                    navigateTo={'/circulo-trigonometrico'}
                    backgroundColor={"white"}
                    altText="Circulo Trigonométrico"
                    captionText="Clique para ver mais"
                    containerHeight="150px"
                    containerWidth="150px"
                    imageHeight="150px"
                    imageWidth="200px"
                    rotateAmplitude={12}
                    scaleOnHover={1.2}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    />
                    <TiltedCard
                    overlayContent={
                        <p className="text-center justify-center align-middle font-bold text-2xl">
                            Criação de Gráficos
                        </p>
                    }
                    backgroundColor={"white"}
                    navigateTo={'/criacao-graficos'}
                    altText="Criação de Gráficos"
                    captionText="Clique para ver mais"
                    containerHeight="150px"
                    containerWidth="150px"
                    imageHeight="150px"
                    imageWidth="200px"
                    rotateAmplitude={12}
                    scaleOnHover={1.2}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    />
                </div>
                <h3 className="text-2xl text-white font-medium">Criado por: <span className="font-bold">Felipe de Souza Rosa</span></h3>
            </div>
        </>
    )
}

export default Home;