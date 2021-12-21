import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from "react-visibility-sensor";
import { useInView } from 'react-intersection-observer';
import lottie from "lottie-web";
import { tabs } from '../../components/card/tabdata'
import Sheet, { SheetRef } from 'react-modal-sheet';
import { FaChevronLeft } from 'react-icons/fa';
import Shortform from "./short-form"
const tabs1 = {requirement: 1, 'how-to-apply': 2, 'who-is-this-for': 3 }
const FadeInDirection = ({ isVisible, children }) => {

  const props = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(300px)"
  });
  return <animated.div style={props} key={i}>{children}</animated.div>;
};

export const FadeInContainer = ({ children }) => {

  const [isVisible, setVisibility] = useState(false);
  const onChange = visiblity => {
    visiblity && setVisibility(visiblity);
  };

  return (
    <VisibilitySensor onChange={onChange}>
      <FadeInDirection isVisible={isVisible}>{children}</FadeInDirection>
    </VisibilitySensor>
  );
};

const Productservices = (props) => {

  const [isOpen, setOpen] = useState(false);
  const [back, setBack] = useState(true)
  const lottieRef = useRef(null)
  const lottieRef1 = useRef(null)
  const lottieRef2 = useRef(null)
  const [lottieimage, setLottieImage] = useState(lottieRef);
  const ref3 = useRef(null);
  const [opacity, setOpacity] = useState(1);
  const [snapPoint, setSnapPoint] = useState(0);
  let [initial, setInitial] = useState(0);

  let easing = [0.175, 0.85, 0.42, 0.96];
  const transition = { duration: 0.5, ease: easing, type: "spring", damping: 10, mass: 0.75, stiffness: 100 };
  const textVariants = {
    exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easing
      }
    }
  };

  const [current, setCurrent] = useState(tabs[0].tab)
  const [firsttab, setFirsttab] = useState(true)
  const [secondtab, setSecondtab] = useState(false)
  const [thirdtab, setThirdtab] = useState(false)
  const previous = usePrevious(current)
  const dir = current < previous
  const router = useRouter();
  const [ref, inView ] = useInView({threshold: 0});
  //const { ref, inView, entry } = useInView();
  const [ref1, inView1 ] = useInView();
  const animation = useAnimation();
  const animation1 = useAnimation();
  const productname = Object.keys(router.query).length >=1 ? router.query.slug.replaceAll('-', ' ') : ''

  useEffect(() => {
    localStorage.removeItem('gfshortform')
  }, [])

  useEffect(() => {

    setTimeout(function(){
      if(typeof document.getElementsByClassName("react-modal-sheet-container")[0] == 'undefined'){
        setOpacity(1)
        setBack(true)
        setInitial(0)
        //router.push(window.location.pathname + window.location.search )
        router.push(window.location.pathname)
      }
    }, 1500)
    
    if(typeof document.getElementsByClassName("react-modal-sheet-container")[0] !== 'undefined'){
      let transform = document.querySelector('.react-modal-sheet-container').style.transform
      transform = transform.split(" ");
      if(typeof transform[0] !== 'undefined'){
        
        if(transform){
          transform = transform[0].match(/\(([^)]+)\)/) ? parseInt(transform[0].match(/\(([^)]+)\)/)[1]): ''
        }
        else {
          transform = ''
        }
        if(transform < 210){
          setOpacity(0)
          setBack(false)
        }
        if(transform >= 210 && transform <= 350){
          setOpacity(0.25)
          setBack(true)
        }
        if(transform > 350 && transform <= 900){
          setOpacity(0.45)
          setBack(true)
        }
      }
    }
  }, [snapPoint, router]);

   useEffect(() => {
    const route = router.query
    if(typeof route.tab !== 'undefined'){
      setCurrent(tabs1[route.tab])
      setTab(tabs1[route.tab])
    }

    if(inView){
      animation.start({
        x:0,
        transition:{
          type:'spring', delay: 0.5, duration: 0.9, bounce: 0.3
        }
      });
    }
    if(!inView) {
      animation.start({ x: '-100vw' });
    }

    if(inView1) {

      animation1.start({
        x:0,
        transition:{
          type: 'spring', delay: 0.5, duration: 0.9, bounce: 0.3
        }
      });

    }
    if(!inView1){
      animation1.start({x:'-100vw'});
    }

    var animDuration = 10000;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      type: 'seek',
      animationData: require('../../components/lottie-image/parachute.json')
    });

    const anim1 = lottie.loadAnimation({
      container: lottieRef1.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      initialSegment: [25, 200],
      animationData: require('../../components/lottie-image/ball.json')
    });

    const anim2 = lottie.loadAnimation({
      container: lottieRef2.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      type: 'seek',
      initialSegment: [25, 200],
      animationData: require('../../components/lottie-image/dede.json')
    });

    const animatebodymovin = (duration, scrollY) => {
      const scrollPosition = scrollY;
      const maxFrames = anim.totalFrames;
      const maxFrames1 = anim1.totalFrames;
      const maxFrames2 = anim2.totalFrames;
      const frame = (maxFrames / 100) * (scrollPosition / (duration / 100));
      const frame1 = (maxFrames1 / 100) * ((scrollPosition * 0.7) / (duration / 100));
      const frame2 = (maxFrames2 / 100) * (scrollPosition / (duration / 100));
      
      anim.goToAndStop(frame, true);
      anim1.goToAndStop(frame1, true);
      anim2.goToAndStop(frame2, true);
    }

    const onScroll = (scrollY) => {
      animatebodymovin(animDuration, scrollY);
    };
    
    if(typeof document.getElementsByClassName("content")[0] !== 'undefined'){
      document.getElementsByClassName("content")[0].onscroll = function(){
        onScroll(this.scrollTop);
      }
    }
    return () => {
      anim.destroy();
      anim1.destroy();
      anim2.destroy();
      if(typeof document.getElementsByClassName("content")[0] !== 'undefined'){
        document.getElementsByClassName("content")[0].onscroll = function(){
          onScroll(this.scrollTop);
        }
      }
    }
  }, [router, inView, inView1, animation, animation1]);

  const setTab = (tab) => {
    if(tab == 1){
      setLottieImage(lottieRef)
      setFirsttab(true)
      setSecondtab(false)
      setThirdtab(false)
    }
    else if(tab == 2){
      setLottieImage(lottieRef1)
      setFirsttab(false)
      setSecondtab(true)
      setThirdtab(false)
    }
    else if(tab == 3){
      setLottieImage(lottieRef2)
      setFirsttab(false)
      setSecondtab(false)
      setThirdtab(true)
    }
  }

  const setUrl = (tab) => {
    if(tab == 1){
      router.push(`/product-service/${router.query.slug}?tab=requirement`);
      setTab(tab)
    }
    else if(tab == 2){
      setTab(tab)
      router.push(`/product-service/${router.query.slug}?tab=how-to-apply`);
    }
    else if(tab == 3){
      setTab(tab)
      router.push(`/product-service/${router.query.slug}?tab=who-is-this-for`);
    }
  }

  const closeModal = (event) => {
    setBack(false)
    setTimeout(function(){
      router.push("/products-offer")
    }, 1000)
  }

  const handleClick = (tab) => {
    setUrl(tab)
    setCurrent(tab)
  }

  const shortForm = (event) => {
    setTimeout(function(){
      setBack(false)
      setOpen(true)
      setInitial(0)
      console.log(router.asPath)
      /*router.push(`${router.asPath}#short-form`)*/
    }, 700)
  }

  const onDrag = (event, info) => {

    if (info.offset.y > 500) {
      setTimeout(function(){
          setBack(false)
          router.push("/products-offer")
      }, 1000)
    }
  }

  const onSwipeEnd = (event, info) => {
    
    if (info.offset.x > 300) {
      setCurrent((current+1))
      setUrl((current+1))
    }
    else if (info.offset.x < -300) {
      setCurrent((current-1))
      setUrl((current-1))
    }
    /*if(info.offset.x > 350 && current > 1){
      setCurrent((current-1))
      setUrl((current-1))
    }
    else if(info.offset.x < -350 && current <= 2){
      setCurrent((current+1))
      setUrl((current+1))
    }*/
  }

  const onDragUp = (event, info) => {
    if (Math.abs(info.offset.y) > 250) {
      setBack(false)
      setOpen(true)
      setInitial(0)
      router.push(`${router.query.slug}#short-form`)
    }
  }

  const close = () => {
    setBack(true)
    setOpen(false);
  }

  const closeSheet = () => {
    setBack(true)
    setOpen(false)
    setInitial(0)
  }

  return (
    <>
    <AnimatePresence>
    {back && (
      <div className="inset-0 pointer-events-auto" style={{opacity: opacity}}>
      <motion.div className="fixed" drag="y" dragConstraints={{ top: 0, bottom:0 }}
      onDrag={onDrag}>
        <header className="fixed z-50">
        <motion.div className="grid fixed z-50 cursor-pointer text-white place-items-center w-full h-12 bg-kapitus text-lg capitalize" onClick={closeModal} initial={{ y: -350, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: .3, ...transition }}} exit={{ y: -350, opacity: 0, transition: { delay: 0.5, duration: 0.5 }}}><div className="absolute left-0 pl-6"><FaChevronLeft size="20" /></div>{productname}
        </motion.div>
        <ul className="w-full grid grid-cols-3 md:gap-4 bg-white pt-14 pb-4 fixed z-10 place-items-center h-28 list-none htitle">
          <li className={ `text-sm ${current == 1 ? `underline1` : ``}` } onClick={() => handleClick(1)}>REQUIREMENT</li>
          <li className={ `text-sm ${current == 2 ? `underline1` : ``}` } onClick={() => handleClick(2)}>HOW TO APPLY</li>
          <li className={ `text-sm ${current == 3 ? `underline1` : ``}` } onClick={() => handleClick(3)}>WHO IS THIS FOR</li>
          <li className="grid place-items-center bg-white fixed w-full h-28 mt-36">
            <div key="lottie3" className="float-right w-1/3 xs:w-1/6 md:w-1/6 lottie" ref={lottieimage}></div>
          </li>
        </ul>
        </header>
  
      <div className="pt-40 px-6 mb-24 overflow-y-auto content" style={{ height: '727px'}}>
        <motion.div drag="x" dragConstraints={{ right: 0, left:0 }} onDrag={onSwipeEnd} className="relative mt-10" initial="enter" animate="in" exit="exit"
          transition={{ type: 'spring', stiffness: 100, damping: 10, opacity: { duration: 0.3 }}}
          variants={{
            enter: { x: dir ? 300 : -300, opacity: 0, scale: 0.3 },
            in: { x: 0, opacity: 1, scale: 1 },
            exit: (_current) => ({
              x: _current > current ? -300 : 300,
              opacity: 0,
              scale: 0.3
            })
          }}>
          <div key="11" className={`${firsttab == true ? `block` :`hidden`}`}>
            <h3 className="text-kapitus font-bold ">{tabs[0]?.header}</h3>
            <p className="text-xl mb-5">{tabs[0]?.desc1}</p>
            <ul className="py-4 list-disc htitle">
              {firsttab == true && tabs[0]?.li?.map(( list, index ) => (
                  <li key={`${index}list`} className="text-lg" >{list}</li>
              ))}
            </ul>
            <p className="text-xl">{tabs[0]?.desc2}</p>
          </div>
          <div key="12" className={`${secondtab == true ? `block` :`hidden`}`}>
            <h2 className="text-kapitus font-bold">{tabs[1]?.header}</h2>
            <p className="text-xl">{tabs[1]?.desc1}</p>
            {secondtab == true && (
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">APPLY NOW</button>
            )}
          </div>
          <div key="13" className={`htitle ${thirdtab == true ? `block` :`hidden`}`}>
            <h2 className="text-kapitus font-bold">{tabs[2]?.header}</h2>
            <p className="text-xl">{tabs[2]?.desc1}</p>
            {thirdtab == true && tabs[2]?.li?.map(( list, index ) => (
              <li key={index} className="text-lg" >{list}</li>
            ))}
          </div>
        </motion.div>

        <motion.div ref={ref}>
          <h2 className="text-kapitus">Why Consider A Business Loan?</h2>
          <div key="loan" className="text-kapitus">Business loans are one of the most versatile forms of business financing available to owners on the market today.  They are available in a large range of sizes, come with an array of payment options and there is no limit on the way you can use the funds for your business. Whether you’re looking to grow, maintain daily operations, or build yourself a cash flow safety net to manage the unexpected, Kapitus can help you build the right loan product for your unique business needs.</div>
          </motion.div>
          <motion.div ref={ref1}>
          <h2 className="text-kapitus">Business Flexibility</h2>
          <div key="flexi" className="text-kapitus">Kapitus business loans can be used for any business purpose, unlike business loans provided by traditional lenders and the SBA which often have restrictions on use associated with them.</div>
          <div key="needs" className="text-kapitus">With competitive rates and a variety of terms and payment plans available, you have the ability to build out a loan product that is created specifically for your business needs.</div>
          </motion.div>
          <div key="2">
          <h2 className="text-kapitus">Wallet-Friendly</h2>
          <div key="wallet" className="text-kapitus">Competitive rates mean you might end up paying less than a traditional bank loan, keeping more of your hard-earned revenue in your business account, not ours.</div>
          <div key="wallet1" className="text-kapitus">With a range of payment terms available, we will work with you to build a payment plan that works with the ebb and flow of your business revenue.</div>
          </div>
          <div key="3">
          <h2 className="text-kapitus">Time Sensitive</h2>
          <div key="band" className="text-kapitus">Additional bandwidth and free time are not a perk that comes with running a small business; so we established an underwriting process that requires minimal documentation for approval.</div>
          <div key="terms" className="text-kapitus">With a range of payment terms available, we will work with you to build a payment plan that works with the ebb and flow of your business revenue.</div>
          </div>
          <div key="4">
          <h2 className="text-kapitus">Small Business Loan Application Checklist | Updated for 2021</h2>
          <div key="mgmt" className="text-kapitus">Building and running a small business is hard. It takes conviction, leadership, sound management and, every so often, a much-needed injection of financing. In both good and lean times businesses are often faced with the decision to pursue some type of financing.</div>
          </div>
          <div key="5">
          <h2 className="text-kapitus">Business Loans – What You Need To Know</h2>
          <div key="work" className="text-kapitus">Business loans are a great working capital resource, regardless of the current priorities of your business.  Whether your focus is expanding your business, ensuring you have cash reserves for slow periods or unanticipated disruptions, or you’re looking for additional cash flow to help maintain daily operations, you’ll be able to find exactly what you need with a Kapitus Small Business Loan.</div>
          </div>
          </div>
          </motion.div>
          <motion.nav key="1" className="fixed bottom-0 inset-x-0 z-10 w-full transition-colors bg-kapitus" drag="y" dragConstraints={{top: 0, bottom:0 }} onDrag={onDragUp}>
              <div className="flex items-center m-auto px-6 py-3">
                <div className="text-white text-sm">Own a Small Business?</div>
                <div className="ml-auto"><motion.button className="inline-flex text-kapitus items-center bg-white text-blue-700 font-semibold py-2 px-6 pb-3 mt-3 border border-blue-500 h rounded" onClick={shortForm}>APPLY NOW</motion.button></div>
              </div>
          </motion.nav>
          </div>)}
    </AnimatePresence>
    <Sheet
        ref={ref3}
        isOpen={isOpen}
        onClose={close}
        snapPoints = {[-1, 0.7, 200, 0]}
        initialSnap={0}
        //onSnap={setSnapPoint}
        onSnap={(snapIndex) => {
          //console.log(window.getElementsByClassName("react-modal-sheet-container")[0])
          setSnapPoint(snapIndex+initial)
          //console.log('> Current snap point index:', initial)
          setInitial(initial + 1)
        }
        }
      >
        <Sheet.Container>
          <Sheet.Content>
          <motion.div className="grid fixed z-50 cursor-pointer text-white place-items-center w-full h-12 bg-kapitus text-lg capitalize" initial={{ y: -350, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: .3, ...transition }}} exit={{ y: -350, opacity: 0, transition: { delay: 0.5, duration: 0.5 }}}>
          <div className="absolute left-0 pl-6" onClick={closeSheet}><FaChevronLeft size="20" /></div>
          Get A Free Quote Today
          </motion.div>
            <Shortform entry_id={props.entry_id} credentials={props.credentials} product={router.query.slug} />
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  )
}

function usePrevious(state) {
  const ref = useRef()
  useEffect(() => {
    ref.current = state
  })
  return ref.current
}

export async function getServerSideProps(context) {
  const entryId = context.query.gf_token || ''
  return {
    props:{
      entry_id: entryId, credentials: { user: process.env.PRIVATE_USER, password: process.env.PASSWORD }
    }
  }
}

export default Productservices;