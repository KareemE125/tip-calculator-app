import BillForm from '@/components/bill-form'
import ResultForm from '@/components/result-form'
import Image from 'next/image'
import { Result } from 'postcss'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-back">
      <section className='p-8'>
        <Image src='/logo.svg' alt='logo' width={100} height={100} />
      </section>
      <section className='flex mobile:flex-col items-stretch justify-center gap-8 rounded-xl shadow-lg p-8 w-3/4 lg:w-full bg-white '>

        <BillForm />

        <ResultForm />

      </section>
    </main>
  )
}
