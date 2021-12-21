    import { useEffect, useState } from "react";
    import { motion, AnimatePresence } from 'framer-motion';
    import { useRouter } from "next/router";
    import Commonshortform from "../../components/forms/Commonshortform"
    import InvoiceFactor from "../../components/forms/InvoiceFactor"
    import EquipmentFinancing from "../../components/forms/EquipmentFinancing"
    import { invoiceId, equipmentId, formId } from '../../components/variables/data'

    const Shortform = ({entry_id, credentials, product}) =>  {
    const router = useRouter();
    const [show, setShow] = useState(true);
    const [refill, setRefill] = useState(null);

    useEffect(() => {
      let refillData = {}
      async function fetchMyAPI() {

        if(typeof entry_id !== 'undefined'){
          let iterateId = product == 'invoice-factoring' ? invoiceId : (product == 'equipment-financing' ? equipmentId : formId)
          let id = new Date().getTime();
          let url = `https://stagingdev-kap.com/gravityform_fetch.php?entry_id=${entry_id}&id=${id}`
          let response = await fetch(url)
          .then(function(res) {
            return res.json();
          });

          if(Object.entries(response).length > 0){
            Object.keys(response).forEach(function(item, key) {
              if(response[item] !== '' && !isNaN(item)) {
                if(item == 6){
                  let dateevent = response[item].split('/')
                  dateevent.forEach(function(item1, index) {
                    refillData[iterateId[6+"."+(index+1)]] = item1
                  })
                }
                else {
                  refillData[iterateId[item]] = response[item];
                }
              }
            });
          }
        }

        setRefill(refillData)
        }
        fetchMyAPI()
   		}, [entry_id, product])

    return (
        <AnimatePresence>
        {show && (
          <div className="bg-gray-100 m-auto w-full">
          <div className="text-center">
            <div className="py-52 relative h-full md:h-20 bg-cover bg-no-repeat bg-mobileform md:bg-desktopform">
            </div>
          </div>
            {(router.query.slug == 'business-loans' && refill) && (
              <Commonshortform refill={refill} credentials={credentials} />
            )}
            {(router.query.slug == 'invoice-factoring' && refill) && (
              <InvoiceFactor refill={refill} credentials={credentials} />
            )}
            {(router.query.slug == 'equipment-financing' && refill) && (
              <EquipmentFinancing refill={refill} credentials={credentials} />
            )}
          </div>)}
    </AnimatePresence>
    )
}

export default Shortform;