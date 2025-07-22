import Link from "next/link";
import { CldImage } from 'next-cloudinary';

const Testimonial = () => {
  return (
    <section className="relative min-h-[80vh] w-screen border-b-2 border-[#dee2e6] overflow-y-scroll flex flex-col items-center justify-center gap-10">
      <div className="flex items-center justify-center text-center">
        <h1 className="text-primary-1000 text-3xl pt-10 font-semibold">
          Client Testimonials
        </h1>
      </div>
      <blockquote className="px-6 pt-10 md:px-18  flex md:flex-col flex-col h-auto gap-4 sm:pt-2">
        <h2 className=" text-lg md:text-[1.6rem] leading-loose tracking-wider md:mx-44 md:pt-12 md:pb-12 flex rounded  font-extralight">
          <p className="  from-primary-900 to-primary-700 bg-gradient-to-r bg-clip-text text-transparent px-2 flex text-center justify-center items-center leading-loose tracking-wider font-thin ">
            Emilio will pour his dedication, passion, and intelligence towards creating solutions with the client&apos;s best interests in mind. This was my experience. Emilio would be an incredible asset to any company, client, and/or organization.
          </p>
        </h2>

        <div className="flex flex-row justify-center gap-4 items-center sm:h-auto rounded p-6">
          <div className="rounded-full w-16 h-16">
            <CldImage
              src="https://res.cloudinary.com/dcss55nem/image/upload/v1716989872/roykag2ycegmrtfh20sg.jpg"
              // fill
              alt="Picture of Adriana Schellhaas"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>

          <footer className="flex items-start text-sm">
            <div className="flex flex-col justify-center items-start py-4">
              <p className="text-zinc-700 font-bold text-sm">
                Adriana Schellhaas
              </p>
              <p className="text-zinc-800 text-xs ">
                <i>Former Executive Director</i>
              </p>
              <Link
                href="https://casachirilagua.org/"
                className="text-blue-400 text-xs"
                aria-label="Casa Chirilagua Website"
              >
                Casa Chirilagua
              </Link>
            </div>
          </footer>
        </div>
      </blockquote>
    </section>
  );
};

export default Testimonial;
