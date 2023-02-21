import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { wrapRelayx } from "stag-relayx"
import { toast } from 'react-hot-toast'
import { useRelay } from '../context/RelayContext'

const FindOrCreate = () => {
    const [url, setUrl] = useState<string>("")
    const router = useRouter()
    const { relayOne } = useRelay()

    const stag = wrapRelayx(relayOne)

    const handleChangeUrl = (e:any) => {
        e.preventDefault()
        setUrl(e.target.value)
    }

    const findOrCreate = async (url: string) => {

        const BITCOIN_TXN_REGEX = /^[0-9a-fA-F]{64}$/;
        const TWETCH_TXN_REGEX = /^https:\/\/(twetch\.(com|app))\/t\/[a-fA-F0-9]{64}$/;
        const RELAY_CLUB_TXN_REGEX = /^https:\/\/club\.relayx\.com\/p\/[a-fA-F0-9]{64}$/;


        
        const matchBitcoin = BITCOIN_TXN_REGEX.test(url)
        const matchTwetch = TWETCH_TXN_REGEX.test(url)
        const matchRelay = RELAY_CLUB_TXN_REGEX.test(url)
        console.log(matchTwetch, matchRelay, matchBitcoin)


        if (matchBitcoin){
            router.prefetch(`/${url}`)
            router.push(`/${url}`)
            return
        }
        if(matchTwetch || matchRelay){
            let txid = url.split('/')[4]
            router.prefetch(`/${txid}`)
            router.push(`/${txid}`)
        } else {
            const [result, isNew] = await stag.onchain.findOrCreate({
                where: {
                    app: 'pow.co',
                    type: 'url',
                    content: {
                        url: url
                    }
                },
                defaults: {
                    app: 'pow.co',
                    type: 'url',
                    content: {
                        url: url
                    }
                }
            })

            console.log(result, isNew)
            router.prefetch(`/${result.txid}`)
            router.push(`/${result.txid}`)
            
        }
      };

    const handleKeyUp = (e: any) => {
        e.preventDefault()
        const enterKey = 13
        if (e.keyCode === enterKey){
            console.log("typed enter", url)
            toast('Loading data...', {
                icon: '⛏️',
                style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                },
              });
            findOrCreate(url)
        }   
    }
  return (
    <form onSubmit={(e:any)=>e.preventDefault()} className='w-full px-4'>   
        <label htmlFor="search-txid" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 dark:text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>

            </div>
            <input autoComplete="off" type="search" id="search-txid" value={url} onChange={handleChangeUrl} onKeyUp={handleKeyUp} className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Share any URL or BitCoin transaction" />
            <button type="submit" className="invisible text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
    </form>
  )
}

export default FindOrCreate