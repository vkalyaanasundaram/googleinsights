import { useState } from "react";
import { formVariants } from "../components/card/variants";
import { motion, AnimatePresence } from 'framer-motion';
import Blogsubscribe from "../components/forms/Subscribeblog"

const Subscribeblog = (props) =>  {
    const [show, setShow] = useState(true);

    return (
        <AnimatePresence>
        {show && (
        <motion.div className="bg-gray-100" drag="y" dragConstraints={{top: 0, bottom:0 }}>
        <motion.div className="mx-auto rounded-lg overflow-hidden" exit={{ y: 700, opacity: 0, transition: { delay: 0.31, duration: 0.5, ease: "easeInOut" }}}>
            <motion.div className="md:flex" style={{backgroundColor:'#e6ebef'}} initial="initial" animate="animate" variants={formVariants} >
            <motion.div className="w-full p-5 px-10" id="news-letter">
              <Blogsubscribe credentials={props.credentials} />                
            </motion.div>
            </motion.div>
        </motion.div>
    </motion.div>)}
    </AnimatePresence>
    )
}

export default Subscribeblog;

export async function getServerSideProps() {
    return {
        props:{
            credentials: {user: process.env.PRIVATE_USER, password: process.env.PASSWORD}
        }
    }
}