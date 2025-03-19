import ActorInfo from "../../Components/actors"
import Carousel from "../../Components/carousel"
import FeatureCarousel from "../../Components/featureCarousel"
import TopNews from "../../Components/topNews"
import TopPick from "../../Components/topPicks"


const Home=()=>{

    return(
        <div>
         <Carousel/>
         <FeatureCarousel/>
         <ActorInfo/>
        <TopPick/>
        <TopNews/>  
        </div>
    )
}
export default Home;

