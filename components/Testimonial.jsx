import Link from "next/link"
import Image from "next/image";

import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

//test 4
const Testimonial = () => {
    return (
        <section className=" relative min-h-screen h-auto w-screen border-b-2 border-zinc-100">
            <div className=' flex items-center justify-center text-center'>
                <h1 className='text-zinc-700 text-3xl pt-10 font-semibold'>Client Testimonials</h1>
            </div>
            <blockquote className='absolute  px-6 pt-10 md:px-18  flex md:flex-col flex-col h-full gap-4 sm:pt-2'>

                <h2 className=" text-lg md:text-[1.6rem] leading-loose tracking-wider md:mx-44 md:pt-12 md:pb-6 flex rounded  font-extralight">
                    {/* <div>
                        <FaQuoteLeft className="text-4xl" />
                    </div> */}
                    <p className="  from-zinc-600 to-zinc-400 bg-gradient-to-r bg-clip-text text-transparent px-2 flex text-center justify-center items-center leading-loose tracking-wider font-thin ">
                        {`"Emilio will pour his dedication, passion, and intelligence towards creating solutions with the client's best interests in mind. This was my experience. Emilio would be an incredible asset to any company, client, and/or organization."`}{" "}
                    </p>
                    {/* <div className="flex items-end">
                        <FaQuoteRight className="text-4xl" />
                    </div> */}
                </h2>

                <div className="flex flex-row justify-center gap-4 items-center sm:h-auto rounded ">
                    <div className="rounded-full w-20 h-20 bg-blue-300">
                        <Image
                            src="https://res.cloudinary.com/dcss55nem/image/upload/v1716989872/roykag2ycegmrtfh20sg.jpg"
                            // fill
                            alt="Picture of Adriana Schellhaas"
                            width={20}
                            height={20}
                            className="w-20 h-20 rounded-full"
                        />
                    </div>

                    <footer className="flex items-start text-sm">
                        <div className="flex flex-col justify-center items-start py-4">
                            <p className='text-zinc-700 font-bold text-sm'>Adriana Schellhaas</p>
                            <p className='text-zinc-800 text-xs '><i>Former Executive Director</i></p>
                            <Link href="https://casachirilagua.org/" className="text-blue-400 text-xs">Casa Chirilagua</Link>

                        </div>
                    </footer>
                </div>

            </blockquote>
        </section>
    )
}

export default Testimonial