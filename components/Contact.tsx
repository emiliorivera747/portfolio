'use client'
import React, { useRef, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Link from "next/link";

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

interface ContactProps {
  textEnter?: () => void;
  textLeave?: () => void;
}

/**
 * Displays the contact section where users can reach out via email or phone.
 * 
 * 
 * @param {*} param0 
 * @returns 
 */
const Contact: React.FC<ContactProps> = ({ textEnter, textLeave }) => {
  const form = useRef<HTMLFormElement | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_d5ckpya",
        "template_dy3465k",
        form.current as HTMLFormElement,
        "KREG4OVfIOrUuqIh3"
      )
      .then(
        (result) => {
          setSuccess(true);
        },
        (error) => {
          setError(true);
        }
      );
  };


  return (
    <section className="h-screen w-screen bg-white overflow-auto">
      <motion.div
        {...({
          className: "flex flex-col sm:flex-row items-start gap-50 p-12 md:p-24 max-w-full w-full h-full ",
          initial: "initial",
          whileInView: "animate",
        } as any)}
      >
        <motion.div
          {...({ variants: variants, className: "flex-1 flex flex-col gap-4 h-full" } as any)}
        >
          <motion.h1
            {...({
              onMouseEnter: textEnter,
              onMouseLeave: textLeave,
              variants: variants,
              className: "text-primary-1000 text-5xl md:text-6xl font-bold leading-none  w-full",
            } as any)}
          >
            {"Let's Work Together"}
          </motion.h1>
          <motion.div {...({ variants: variants, className: "w-full" } as any)}>
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-zinc-800 font-bold"
            >
              Mail
            </h1>
            <Link
              href="mailto:emiliorivera174@gmail.com"
              className="text-zinc-800 text-sm"
              aria-label="Email"
            >
              emiliorivera174@gmail.com
            </Link>
          </motion.div>
          <motion.div {...({ variants: variants, className: "w-full" } as any)}>
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-zinc-800 font-bold "
            >
              Phone
            </h1>
            <span
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-zinc-800 text-sm"
            >
              +1 (571) 970-8057
            </span>
          </motion.div>
          <motion.div {...({ variants: variants, className: "w-full h-full pt-10" } as any)}>
            <div className="flex flex-row gap-6 items-center ">
              <Link
                href="https://github.com/emiliorivera747"
                className="border rounded-[12px] p-6 border-primary-200 hover:bg-primary-200"
                aria-label="Emilio's GitHub"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="currentColor"
                  style={{ color: "#333" }}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/in/emilio-rivera-3a1912167"
                className="border rounded-[12px] p-6 border-primary-200 hover:bg-primary-200"
                aria-label="Emilio's LinkedIn"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="currentColor"
                  style={{ color: "#0077b5" }}
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/@emiliorivera2270"
                className="border rounded-[12px] p-6 border-primary-200 hover:bg-primary-200"
                aria-label="Emilio's YouTube"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="currentColor"
                  style={{ color: "#ff0000" }}
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>
        <motion.div {...({ className: "flex-1 w-full" } as any)}>
          <motion.form
            {...({
              ref: form,
              onSubmit: sendEmail,
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              transition: { delay: 1, duration: 1 },
              className: "flex flex-col gap-4 pt-6 w-full ",
            } as any)}
          >
            <input
              type="text"
              name="from_name"
              className="bg-transparent border-primary-400 px-4 py-4 text-primary-800 rounded-[12px] border "
              placeholder="Name"
            />
            <input
              name="email"
              type="email"
              className="bg-transparent border-primary-400 px-4 py-4 text-primary-800 rounded-[12px] border "
              placeholder="Email"
            />
            <textarea
              className="bg-transparent border-primary-400 px-4 py-4 text-primary-800 rounded-[12px] border "
              name="message"
              id=""
              cols={20}
              rows={10}
              placeholder="Message"
            ></textarea>
            <button className="text-zinc-800 bg-white hover:bg-zinc-800 hover:text-white border-2 border-zinc-800 p-3 rounded-md">
              Submit
            </button>
            {error && "Error"}
            {success && "Success"}
          </motion.form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
