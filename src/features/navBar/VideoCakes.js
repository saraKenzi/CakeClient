
const VideoCakes = () => {
    let video = 'https://kenzisserver.onrender.com/BG/kenzisMoovie.mp4';

    return (<>
        <video loop width={"100%"} height={"350px"} autoPlay>
            <source src={video} type="video/mp4" />
        </video>
        
    </>

    );
}

export default VideoCakes;

