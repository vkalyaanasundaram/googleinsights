import { useEffect, useState } from "react";
import axios from 'axios';
import Image from 'next/image'
import { formVariants } from "../components/card/variants";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/router";
import Contactform from "../components/forms/Contactform"
//import { FormContext } from "../components/FormContext";

const formId = {1: 'first', 8: 'last', 2: 'email', 14: 'state', 4: 'company', 9: 'connect', 6: 'message'}

const Contactus = (props) =>  {

    const router = useRouter();
    //const [data, setData] = useState(null);
    const [show, setShow] = useState(true);
    const [refill, setRefill] = useState(null);
    //const [error2, setError2] = useState(null);

    useEffect(() => {
      //  let refData = {}
        let refillData = {}
        if(Object.entries(props.gfentrydata).length > 0){
            //console.log(props.gfentrydata)
            Object.keys(props.gfentrydata).forEach(function(item, key) {
                if(props.gfentrydata[item] !== '' && !isNaN(item)) {
                    if(item == 6){
                        let dateevent = props.gfentrydata[item].split('/')
                        dateevent.forEach(function(item1, index) {
                            refillData[formId[6+"."+(index+1)]] = item1
                        })
                    }
                    else {
                        refillData[formId[item]] = props.gfentrydata[item];
                    }
                   // refData[item] = props.gfentrydata[item];
                }
            });
        }
        //refData['form_id'] = '33'
        //setData(refData);
        setRefill(refillData)
    }, [props.gfentrydata])

    const onDragEnd = (event, info) => {
      const shouldClose = info.velocity.y >= 225 && info.point.y > 225
      if (shouldClose) {
          setShow(false)
          router.push("/product-service/business-loans")
      }
  }

    return (
        <AnimatePresence>
        {show && (
        <motion.div className="bg-gray-100" drag="y" dragConstraints={{top: 0, bottom:0 }} onDragEnd={onDragEnd}>
        <motion.div className="mx-auto rounded-lg overflow-hidden" exit={{ y: 700, opacity: 0, transition: { delay: 0.31, duration: 0.5, ease: "easeInOut" }}}>
            <motion.div className="md:flex" style={{backgroundColor:'#e6ebef'}} initial="initial" animate="animate" variants={formVariants} >
            <div className="relative w-full overflow-hidden">
                <Image alt="comtact-us" width="700" height="570" src="/images/contact-us.jpg" className="w-full h-full" />
                <div className="absolute w-full py-24 bottom-0 inset-x-0  text-kapitus text-xl font-bold text-center leading-4">Contact Us</div>
            </div>
            <motion.div className="w-full p-5 px-10" id="form1">
              <Contactform entryId={props.entry_id} refill={refill} credentials={props.credentials} />                
            </motion.div>
            </motion.div>
        </motion.div>
    </motion.div>)}
    </AnimatePresence>
    )
}

export default Contactus;

export async function getServerSideProps(context) {

    const entryId = context.query.gf_token || ''
  
    let gfdata = []
    if(entryId !== ''){
      const res  = await axios.post(`https://stagingdev-kap.com/gravityform_fetch.php?entry_id=${entryId}`)
      gfdata = await res.data;
    }
    return {
        props:{
            gfentrydata : gfdata, entry_id: entryId, credentials: {user: process.env.PRIVATE_USER, password: process.env.PASSWORD }
        }
    }
}