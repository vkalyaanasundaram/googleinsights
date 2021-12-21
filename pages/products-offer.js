import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useViewportScroll, useTransform, useSpring } from 'framer-motion';
import Link from "next/link";

export default function ProductOffer() {

    const [elementTop, setElementTop] = useState(0)
    const [clientHeight, setClientHeight] = useState(0)
    const [fadeTitle, setFadeTitle] = useState(true)
    const ref = useRef(null)
    
    let offset = 70
    const { scrollY } = useViewportScroll()  
    const initial = elementTop - clientHeight
    const final = elementTop + offset
    const yRange = useTransform(scrollY, [initial, final], [offset, -offset])
    const y = useSpring(yRange, { stiffness: 700, damping: 300 })
   
    useEffect(() => {
        const element = ref.current
        const onResize = () => {
          //setElementTop(element.getBoundingClientRect().top + window.scrollY || window.pageYOffset)
          //setClientHeight(window.innerHeight)
        }

        const onScroll = () => {
          window.scrollY > 25 ? setFadeTitle(true) : setFadeTitle(false)
        };
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
      }, [ref])

    return (

      <motion.div className="flex-col justify-center items-center z-50" initial="initial" animate="animate">
			<div className="min-w-screen bg-gray-200 flex items-center justify-center">
			<div className="bg-white text-gray-800 shadow-lg overflow-hidden relative flex" style={{ width:"100%" }}>
			<motion.div className="bg-white h-full w-full px-5 pt-6 pb-20 overflow-y-auto cover" style={{background: "linear-gradient(rgba(135, 80, 156, 0.3), rgba(135, 80, 156, 0.3)), url(/images/offer-background.jpg)", backgroundSize:'cover' }}>
      <div className="h-64 text-white items-center justify-center flex">
      <AnimatePresence>
        { fadeTitle && (
          <motion.div className="text-xl font-bold" initial={{ opacity: 0, transition:{delay: 0.5, duration: 0.5 } }} animate={{ opacity: 1, transition:{delay: 0.5, duration: 0.5 }}} exit={{ opacity: 0,transition:{delay: 0.5, duration: 0.5 }}}>Products We Offer</motion.div>
        )}
      </AnimatePresence>
      </div>
				<motion.div className="grid grid-cols-2 gap-4">
				{["business-loans", "equipment-financing", "helix-healthcare-financing", "invoice-factoring", "line-of-credit", "purchase-order-financing", "revenue-based-financing", "sba-loan"].map((product, index) => (
				  <Link href={`product-we-offer/${product}`} as={`product-we-offer/${product}`} key={index}>
              <motion.div className="relative">
              <motion.img
              layoutId={product}
              className="margin-auto w-80 h-40 rounded-lg object-cover"
              src={`images/${product}.jpg`}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              />
              <motion.h3 className="text-lg font-bold absolute -mt-24 text-white leading-tight p-5 z-10 capitalize"	layoutId={`header-${product}`}>{product.replace('-', ' ')}</motion.h3>
              </motion.div>
				  </Link>
				))}
				</motion.div>
			</motion.div>
			</div>
			</div>
      </motion.div>
        )
}