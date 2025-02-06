import TopNavbar from "@/components/TopNavbar"
import Footer from "@/components/Footer"
import MiddleNavbar from "@/components/MiddleNavbar"
import BottomNavbar from "@/components/BottomNavbar"
import Hero from "@/components/Hero"
import Brands from "@/components/Brands"
import FeaturedProducts from "@/components/Featured"
import Categories from "@/components/Topcategories"
import Popular from "@/components/Popularstyles"
import OurProducts from "@/components/HomeProducts"

export const dynamic = "force-dynamic";

export default function Home(){
    return (
        <>
        <TopNavbar/>
        <MiddleNavbar/>
        <BottomNavbar/>
        <Hero/>
        <Brands/>
        <FeaturedProducts/>
        <Categories/>
        <Popular/>
        <OurProducts/>
        <Footer/>   
        </>
    )
}