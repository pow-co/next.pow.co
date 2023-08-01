import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { BoostPowJob } from 'boostpow';

import { bsv } from 'scrypt-ts';
import { useHandCash } from '../context/HandCashContext';

import ThreeColumnLayout from '../components/ThreeColumnLayout';

import HandcashWallet from '../wallets/handcash';

export default function Home() {
  const { handCashAuthToken: authToken } = useHandCash();
  const [txId, setTxid] = useState<string | null>();
  const [txHex, setTxhex] = useState<string | null>();
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const router = useRouter();

  if (!authToken) {
    router.push('/settings');
  }

  const wallet = new HandcashWallet({ authToken: String(authToken) });

  useEffect(() => {
    if (isPosting) { return; }

    setIsPosting(true);

    wallet.createBoostTransaction([{
      job: BoostPowJob.fromObject({
        content: '88c9b1254c8a63aa006df09750128ae80457cc85251c31f585666066d4dfc052',
        diff: 1,
        tag: Buffer.from('music.house', 'utf8').toString('hex'),
      }),
      value: BigInt(1000),
    }, {
      job: BoostPowJob.fromObject({
        content: '88c9b1254c8a63aa006df09750128ae80457cc85251c31f585666066d4dfc052',
        diff: 1,
        tag: Buffer.from('fun', 'utf8').toString('hex'),
      }),
      value: BigInt(1000),
    }])
      .then((tx: bsv.Transaction) => {
        setTxid(tx.hash);

        setTxhex(tx.toString());

        setIsPosting(false);
      })
      .catch(console.error);
  });

  return (

      <ThreeColumnLayout>
        <h1>Test Handcash Boostpow</h1>
    
        {isPosting ? (

          <p>Posting Boost of 1000 sats</p>

        ) : (

          <div>

            <p>txid: {txId}</p>
            <p>txhex: {txHex}</p>

          </div>

        )}

      </ThreeColumnLayout>
      
  );
}
