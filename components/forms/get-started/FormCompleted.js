import motion from 'framer-motion'

export default function FormCompleted() {

  let localdata = ['gfproduct', 'gffund', 'gfindustry', 'gfmonth', 'gfyear', 'gfcheckbox', 'gfrevenue', 'gfrepayment', 'gfbusiness', 'gfloan', 'gflender', 'gfcreditscore', 'gfpersonalinfo']
  localStorage.removeItem('formstep')
  localdata.map((item, i) => localStorage.removeItem(item))
  return <h2 className="text-white">Thank you for telling us about your business! If you are not directed to our Solutions page, click here.</h2>;
}
