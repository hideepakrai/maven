
import React from 'react'
import HomePage from '@/pages/HomePage'
import ProductPage from '@/pages/ProductPage'
import Header from '@/components/sections/Header'

import { Route, Routes } from 'react-router-dom';
import Footer from './components/sections/Footer';
import AboutUsPage from './components/sections/AboutUsPage';
import PortfolioPage from './pages/PortfolioPage';
import TestimonialsPage from './pages/TestimonialsPage';



export default function App(){
  const [view, setView] = React.useState<'home'|'product'>('home')
  const leftNav = [
    {
      label: "Noževi",
      children: [
        { label: "Petty", href: "/petty" },
        { label: "Gyuto", href: "/gyuto" },
        { label: "Santoku", href: "/santoku" },
        { label: "Nakiri", href: "/nakiri" },
      ],
    },
    { label: "O Noževima", href: "/o-nozevima" },
    { label: "O Karlo Banu", href: "/o-karlo-banu" },
    { label: "Što drugi kažu", href: "/recenzije" },
  ];
  return (
    <div className="text-brand-text">
      <Header
     
       
      />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        {/* <Route path='/product' element={<ProductPage/>}/> */}
        <Route path='/about' element={<AboutUsPage/>}/>
        <Route path='/portfolio' element={<PortfolioPage/>}/>
        <Route path='/testimonials' element={<TestimonialsPage/>}/>

        


       
      </Routes>
   
      <Footer children={''} />
    </div>
  )
}
