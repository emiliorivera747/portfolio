"use client";
import React, { useRef, useState, FormEvent, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

// Floating-label field styling, kept in one place so the two inputs and the
// textarea stay identical. The extra top padding is what leaves room for the
// label to sit inside the field once it floats up.
const inputClass =
  "peer w-full border border-gray-300 bg-[#FBFBFB] rounded-[12px] px-[1rem] pt-[1.5rem] h-[4.2rem] " +
  "leading-[1.23536] text-sm text-primary-900 placeholder-transparent align-text-bottom " +
  "focus:outline-none transition-all duration-500";

const textareaClass =
  "peer w-full border border-gray-300 bg-[#FBFBFB] rounded-[12px] px-[1rem] pt-8 pb-3 " +
  "leading-[1.23536] text-sm text-primary-900 placeholder-transparent resize-none " +
  "focus:outline-none transition-all duration-500";

// Floated state (focused, filled, or autofilled) is identical for every field;
// only the resting position differs, since that has to line up with where the
// text actually sits in each kind of field.
const labelBase =
  "absolute text-sm left-4 top-2 pb-4 text-primary-700 transition-all " +
  "peer-focus:top-2 peer-focus:left-4 peer-focus:text-sm peer-focus:text-primary-700 " +
  "peer-placeholder-shown:text-base peer-placeholder-shown:text-primary-700 peer-placeholder-shown:font-normal " +
  "peer-autofill:top-2 peer-autofill:left-4 peer-autofill:text-sm";

// Centres the resting label in the 4.2rem input: (4.2rem - 1.5rem line) / 2.
// It was a flat top-4, which happened to centre the old 3.4rem field and went
// off-centre the moment the fields got taller.
const labelClass = `${labelBase} peer-placeholder-shown:top-[1.35rem]`;

// A textarea fills from the top, so its resting label sits at the text's first
// line — matching the textarea's own pt-8 — rather than centred.
const textareaLabelClass = `${labelBase} peer-placeholder-shown:top-8`;

/**
 * Displays the contact section where users can reach out via email or phone.
 *
 *
 * @param {*} param0
 * @returns
 */
const Contact: React.FC<ContactProps> = ({ textEnter, textLeave }) => {
  const form = useRef<HTMLFormElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const sendEmail = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/utils/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("from_name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? "Failed to send email.");
      }

      setSuccess(true);
      form.current?.reset();
    } catch {
      setError("Failed to send email. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section id='contact' className="min-h-screen w-screen bg-white h-auto">
      <motion.div
        {...({
          className:
            "flex flex-col sm:flex-row items-start gap-50 p-12 md:p-24 max-w-full w-full h-full ",
          initial: "initial",
          whileInView: "animate",
        } as any)}
      >
        <motion.div
          {...({
            variants: variants,
            className: "flex-1 flex flex-col gap-4 h-full",
          } as any)}
        >
          <motion.h2
            {...({
              onMouseEnter: textEnter,
              onMouseLeave: textLeave,
              variants: variants,
              className:
                "text-primary-1000 text-5xl md:text-6xl font-bold leading-none  w-full mb-4",
            } as any)}
          >
            {"Contact"}
          </motion.h2>
          <motion.div {...({ variants: variants, className: "w-full" } as any)}>
            <h3
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-zinc-800 font-bold"
            >
              Mail
            </h3>
            <Link
              href="mailto:emiliorivera747@gmail.com"
              className="text-zinc-800 text-sm"
              aria-label="Email"
            >
              emiliorivera747@gmail.com
            </Link>
          </motion.div>
          <motion.div {...({ variants: variants, className: "w-full" } as any)}>
            <h3
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-zinc-800 font-bold "
            >
              Phone
            </h3>
            <span
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-zinc-800 text-sm"
            >
              +1 (571) 970-8057
            </span>
          </motion.div>
          <motion.div
            {...({
              variants: variants,
              className: "w-full h-full pt-10",
            } as any)}
          >
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
        <motion.div {...({ className: "flex-1 w-full h-full" } as any)}>
          <motion.form
            {...({
              ref: form,
              onSubmit: sendEmail,
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              transition: { delay: 1, duration: 1 },
              className: "flex flex-col gap-4 pt-6 w-full  ",
            } as any)}
          >
            {/* Each label sits *after* its field in the DOM so Tailwind's
                peer-* variants can react to it, and the placeholder is
                transparent — it exists only so peer-placeholder-shown can tell
                an empty field from a filled one, which is what drops the label
                down into the field and floats it back up. */}
            <div className="relative">
              <input
                id="from_name"
                type="text"
                name="from_name"
                required
                placeholder="Name"
                className={inputClass}
              />
              <label htmlFor="from_name" className={labelClass}>
                Name
              </label>
            </div>
            <div className="relative">
              <input
                id="contact_email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className={inputClass}
              />
              <label htmlFor="contact_email" className={labelClass}>
                Email
              </label>
            </div>
            <div className="relative">
              <textarea
                id="contact_message"
                name="message"
                required
                rows={13}
                placeholder="Message"
                className={textareaClass}
              />
              <label htmlFor="contact_message" className={textareaLabelClass}>
                Message
              </label>
            </div>
            <Button
              type="submit"
              variant="outline"
              disabled={loading}
              className="h-[3.5rem] px-[4rem] rounded-[12px] font-semibold text-primary-900 border-primary-300 hover:bg-primary-100 transition delay-150 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                boxShadow:
                  "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px",
              }}
            >
              {loading ? "Sending..." : "Submit"}
            </Button>
            {error && (
              <div className="bg-red-100 rounded-[12px] flex items-center justify-center py-10 border-red-600 border">
                <p className="text-red-600 text-md">{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-[#ebfbee] rounded-[12px] flex items-center justify-center py-10 border-[#2b8a3e] border">
                <p className="text-[#2b8a3e] text-md">Email successfully sent!</p>
              </div>
            )}
          </motion.form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(Contact);
