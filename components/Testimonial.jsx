import Link from "next/link"
import Image from "next/image";

import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
const Testimonial = () => {
    return (
        <section className="bg-black relative min-h-screen h-auto w-screen">
            <div className=' flex items-center justify-center text-center p-2'>
                <h1 className='text-white text-4xl pt-10 font-semibold'>Client Testimonials</h1>
            </div>
            <blockquote className=' pt-16 px-4 md:px-20  flex md:flex-col flex-col gap-10 min-h-screen h-auto'>

                <h2 className="text-white text-lg md:text-2xl leading-loose tracking-wider md:p-16 flex rounded ">
                    <div>
                        <FaQuoteLeft className="text-4xl" />
                    </div>
                    <p className="px-2 flex text-center justify-center items-center italic leading-loose tracking-wider">
                        {`Emilio will pour his dedication, passion, and intelligence towards creating solutions with the client's best interests in mind. This was my experience. Emilio would be an incredible asset to any company, client, and/or organization.`}{" "}
                    </p>
                    <div className="flex items-end">
                        <FaQuoteRight className="text-4xl" />
                    </div>
                </h2>

                <div className="flex flex-row justify-center gap-6 items-center sm:h-auto rounded ">
                    <div  className="rounded-full w-20 h-20 bg-blue-300">
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
                            <p className='text-white uppercase font-bold text-sm'>Adriana Schellhaas</p>
                            <p className='text-white text-xs'><i>Executive Director 2019-2024</i></p>
                            <Link href="https://casachirilagua.org/" className="text-blue-400 text-xs">Casa Chirilagua</Link>
                        </div>
                    </footer>
                </div>

            </blockquote>
        </section>
    )
}

export default Testimonial