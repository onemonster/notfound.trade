import { Inter } from 'next/font/google';
import { useContractRead } from 'wagmi'
import { PANDORA_ABI, PANDORA_ADDRESS } from '@/abi/pandora'
import { getPandoraBoxTraits } from '@/utils/pandora'
import { useEffect, useMemo } from 'react'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: minted, fetchStatus } = useContractRead({
    abi: PANDORA_ABI,
    address: PANDORA_ADDRESS,
    functionName: 'minted',
    cacheTime: 1000,
  })

  const boxes = useMemo(() => {
    if (!minted) return []
    return Array.from({ length: 256 }).map((_, index) => getPandoraBoxTraits(BigInt(index + 1 - 256) + minted))
  }, [minted])
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24 gap-2"
    >
      <div className="self-start items-center justify-between font-mono text-sm flex">
        <p
          className="flex justify-center rounded-xl border border-gray-300 bg-gray-200 p-4">
          Welcome to&nbsp;
          <code className="font-mono font-bold">notfound.trade</code>
        </p>
      </div>
      <div className="flex w-full gap-2">
        <div className="items-center justify-between font-mono text-sm lg:flex">
          <p
            className="flex justify-center rounded-xl border border-gray-300 bg-gray-200 p-4">
            Pandora last minted: {minted ? minted.toString() : '...'}
          </p>
        </div>
        <div className="items-center justify-between font-mono text-sm lg:flex">
          <p
            className="flex justify-center rounded-xl border border-gray-300 bg-gray-200 p-4">
            mints until next <span className="text-red-500">&nbsp;RED&nbsp;</span> box: {boxes.findIndex((box) => box.color === 'Red') + 1}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-1">
        {boxes.map((box) =>
          <div key={box.id}
               className={`font-mono flex flex-col items-center border text-white bg-black p-1 rounded ${box.color === 'Red' ? 'text-red-500' : ''}`}>
            {box.id.toString()}
            <img src={box.image}/>
            {box.color}
          </div>)}
      </div>
    </main>
  );
}
