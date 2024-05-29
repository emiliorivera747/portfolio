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
            <blockquote className=' pt-16 px-4 md:px-20  flex md:flex-row flex-col gap-4 h-screen sm:h-auto'>

                <h2 className="text-white text-lg md:text-2xl leading-loose tracking-wider md:p-16 flex rounded md:w-3/4 bg-white bg-opacity-10 ">
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

                <div className="flex flex-col gap-4 justify-center items-center md:w-1/4 sm:h-auto h-screen bg-white bg-opacity-10 rounded">
                    <div  className="h-3/4 w-full rounded-t relative overflow-hidden">
                        <Image
                            src="https://res.cloudinary.com/dcss55nem/image/upload/v1716989872/roykag2ycegmrtfh20sg.jpg"
                            fill
                            alt="Picture of Adriana Schellhaas"
                            className="object-fit"
                        />
                    </div>

                    <footer className="flex items-center h-1/4">
                        <div className="flex flex-col justify-center items-center py-4">
                            <h1 className='text-white uppercase font-bold text-base'>Adriana Schellhaas</h1>
                            <h2 className='text-white text-base'><i>Executive Director 2019-2024</i></h2>
                            <Link href="https://casachirilagua.org/" className="text-blue-400 text-base">Casa Chirilagua</Link>
                        </div>
                    </footer>
                </div>

            </blockquote>
        </section>
    )
}

export default Testimonial