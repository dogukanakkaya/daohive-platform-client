import Image from 'next/image'

export default function ZeroRecord() {
  return (
    <div className="flex-center flex-col gap-2">
      <div className="opacity-50 -z-10">
        <Image src="/images/zero-record-icon.svg" width={200} height={200} alt="No record" />
      </div>
      <div className="flex-center flex-col text-center md:max-w-[500px]">
        <h1 className="text-2xl font-semibold uppercase tracking-widest">No record found</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quisquam unde fugit.</p>
      </div>
    </div>
  )
}
