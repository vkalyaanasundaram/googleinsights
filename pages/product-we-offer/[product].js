import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { contentBlockVariants } from "../../components/card/variants";
import lottie from "lottie-web";
import { FaChevronLeft } from 'react-icons/fa';

const AnimatedContentBlock = ({ children }) => (
  <motion.div variants={contentBlockVariants}>{children}</motion.div>
);

export default function Product() {

  const [showlearn, setShowLearn] = useState(true);
  const { query: { product }} = useRouter();
  const router = useRouter();
  const lottieRef = useRef(null)
  let product1 = product ? product : product
  const productname = product ? product.replaceAll('-', ' ') : ''

  let easing = [0.175, 0.85, 0.42, 0.96];
  const transition = { duration: 0.8, ease: easing, type: "spring", damping: 10, mass: 0.75, stiffness: 100 }

  const productOpen = (event) => {
    setShowLearn(false)
    setTimeout(function(){
      router.push(`/product-service/${product1}`);
    }, 1000)
  }

  const closeModal = () => {
    router.push("/products-offer");
  }

  const onDrag = (event, info) => {
    if (info.offset.y > 450){
      router.push("/products-offer")
      //router.push("/product-service/business-loans")
    } 
  }

  useEffect(() => {

    var animDuration = 7000;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: require('../../components/lottie-image/tick.json'),
      /*path: "https://assets2.lottiefiles.com/packages/lf20_txJcSM.json",*/
      initialSegment: [35, 200],
    });

    const animatebodymovin = (duration, scrollY) => {
      const scrollPosition = scrollY * 2.5;
      const maxFrames = anim.totalFrames;
      const frame = (maxFrames / 100) * (scrollPosition / (duration / 100));
      anim.goToAndStop(frame, true);
    }

    document.addEventListener('touchmove', function(e) {
      animatebodymovin(animDuration, e.changedTouches[0].pageY);
    }, false);

    document.addEventListener('touchcancel', function(e) {
      //animatebodymovin(animDuration, e.changedTouches[0].pageY);
      console.log(e.changedTouches[0].pageY)
    }, false);
    
    return () => {
      anim.destroy();
    }
  }, [])

  const buttonVariants = {
    ini: { y: 400, opacity: 0, transition: { delay: 0.3, duration: 0.3, ease: easing } },
    enter: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.9, ease: easing } }
  };

  const titleVariants = {
    initial: { y: -700, transition: { delay: 0.7, duration: 0.3, ease: easing } },
    animate: { y: 0, transition: { delay: 0.7, duration: 0.9, ease: easing } },
    //exit: { y: 700, transition: { duration: 0.5, ease: easing } }
  };

  return (<AnimatePresence>
    {showlearn && product1 && (<>
      <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: .5, duration: .5} }} className="grid grid-cols-3 gap-4 fixed w-full" style={{zIndex: -50}}>
      <div></div>
      <motion.div animate={{ x: 0, opacity: 1, transition: { delay: 0.1 }}} exit={{ opacity: 0, transition: {delay: 0.1, duration: 0.1} }}><div className="fixed w-1/3 float-right" ref={lottieRef}></div></motion.div>
      </motion.div>
      <motion.div drag="y" dragConstraints={{ top: 0, bottom:0 }}
       onDrag={onDrag} className="overlay" initial="initial" animate="animate">
      <motion.div className="grid fixed z-40 cursor-pointer text-white place-items-center w-full h-12 bg-kapitus capitalize text-lg" onClick={closeModal} initial={{ y: -350, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: .3, ...transition }}} exit={{ y: -350, opacity: 0, transition: { delay: 0.2, duration: .5 }}}>
      <div className="absolute left-0 pl-6"><FaChevronLeft size="20" /></div>
      <motion.div initial="initial" animate="animate" exit="exit" variants={titleVariants}>{productname}</motion.div>
      </motion.div>
    <motion.div className="flex-col justify-center items-center z-50" exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.5}}}>
      <Link href="/products-offer">
        <a>
          <motion.img
            layoutId={`${product1}`}
            className="w-full z-50 object-cover pt-12"
            src={"/images/"+product1 + ".jpg"}
          />
        </a>
      </Link>
      <div className="relative z-50">
      <motion.div className='h-32 w-32 rounded-lg absolute right-32'
          animate={{ opacity: 1, scale: 1 }}
          exit={{
              scale: [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9],
              borderRadius: "100%",
              delay: .5,
              duration: 2,
              ease: "easeInOut",
              backgroundColor: "rgb(115, 181, 100)"
          }}
        />
      </div>
      <div className="flex flex-wrap">
      <motion.p className="h-10 mt-10 mb-8 ml-4 text-base font-extrabold w-3/5 capitalize" layoutId={`header-${product1}`}>{productname}</motion.p>
        <motion.div className="w-1/3" initial="ini" animate="enter" exit="exit" variants={buttonVariants}>
          <button className="p-0 h-10 mt-8 mb-8 text-indigo-100 w-11/12 duration-150 bg-kapitusLiteGreen rounded-lg focus:shadow-outline hover:bg-kapitusLiteGreen" onClick={productOpen}>Learn More</button>
        </motion.div>
      </div>
    <motion.div /*exit={{   scale: [0.5, 1, 2, 3],
                          position: "absolute",
                          top: '20%',
                          borderRadius: "100%",
                          delay: .5,
                          duration: 1,
                          ease: "easeInOut",
                          backgroundColor: "rgb(115, 181, 100)",
                          color: "rgb(115, 181, 100)",
                          zIndex: 99
                        }}*/>
      <AnimatedContentBlock>
        <p className="px-4 py-3">
        Available for both short- and long-term needs. Our business loans provide you with an agreed upon sum of money that you will pay back over a specified amount of time, with interest. The amount of interest paid and the total overall cost will depend on whether you opt for a short-term loan, which typically has a higher interest rate but a lower overall cost or a long-term loan, which tends to have a lower interest rate but a higher overall cost.
        </p>
      </AnimatedContentBlock>
    </motion.div>
    </motion.div>
    </motion.div></>)}
    </AnimatePresence>
  );
}