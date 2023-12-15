import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const variants = {
  initial: {
    y: 500,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

function Contact({ textEnter, textLeave }) {
  const form = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_d5ckpya",
        "template_dy3465k",
        form.current,
        "KREG4OVfIOrUuqIh3"
      )
      .then(
        (result) => {
          toast.success("Thank You! I will be in touch with you shortly.", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setSuccess(true);
        },
        (error) => {
          toast.error("An Error occurred on Submission" + error, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setError(true);
        }
      );
  };



  return (
    <section className="h-screen w-screen bg-black overflow-auto">
      <motion.div
        className="flex flex-col sm:flex-row items-start gap-50 p-12 md:p-24 max-w-full w-full"
        initial="initial"
        whileInView="animate"
      >
        <motion.div variants={variants} className="flex-1 flex flex-col gap-4">
          <motion.h1
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            variants={variants}
            className="text-white text-5xl md:text-7xl font-bold leading-none w-full"
          >
            {"Let's Work Together"}
          </motion.h1>
          <motion.div variants={variants} className="w-full">
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-white font-bold"
            >
              Mail
            </h1>
            <span
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-white text-sm"
            >
              emiliorivera174@gmail.com
            </span>
          </motion.div>
          <motion.div variants={variants} className="w-full">
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-white font-bold "
            >
              Phone
            </h1>
            <span
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-white text-sm"
            >
              (571) 970-8057
            </span>
          </motion.div>
        </motion.div>
        <motion.div className="flex-1">
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col gap-4 pt-6 md:p-10"
          >
            <input
              type="text"
              name="from_name"
              className="bg-transparent border-white p-2 text-white rounded-sm border"
              placeholder="Name"
            />
            <input
              name="email"
              type="email"
              className="bg-transparent border-white p-2 text-white rounded-sm border"
              placeholder="Email"
            />
            <textarea
              className="bg-transparent border-white p-2 text-white rounded-sm border"
              name="message"
              id=""
              cols="30"
              rows="4"
              placeholder="Message"
            ></textarea>
            <button className="text-white bg-black hover:bg-white hover:text-black border-4 border-white p-3 rounded-md">
              Submit
            </button>
            {error && "Error"}
            {success && "Success"}
          </motion.form>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;
