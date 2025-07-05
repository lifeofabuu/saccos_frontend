/* eslint-disable no-unused-vars */
import React from 'react'

const LoanTerms = () => {
    return (
        <div className="flex flex-col min-h-screen pb-0 text-black">
            <div className="container mx-auto px-4 py-8 flex-grow">
                <div className=" mb-8">
                    <h1 className="text-2xl font-bold">Bidhaa za Mikopo kutoka DIT SACCOS LTD</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border p-4 rounded-lg shadow-lg elevation-5 bg-white">
                        <h2 className="text-xl font-semibold">Mkopo wa Maendeleo</h2>
                        <ul className="list-disc list-inside mt-4 text-md">
                            <li><b>Kiwango cha Mkopo: </b>500,000 -&gt; 50,000,000 /=</li>
                            <li><b>Muda wa chini wa marejesho: </b>Mwaka 1</li>
                            <li><b>Muda wa juu wa marejesho</b>Miaka 5</li>
                            <li><b>Gharama(ada) ya Mkopo(%): </b>1%(Jumla)</li>
                            <li><b>Riba(%): </b>1% kwa mwezi</li>
                            <li><b>Adhabu(%) x Deni lililobaki: </b>1% ya deni kwa mwezi</li>
                        </ul>
                    </div>
                    <div className="border p-4 rounded-lg shadow-lg elevation-5 bg-white">
                        <h2 className="text-xl font-semibold">Mkopo wa Elimu / Dharura</h2>
                        <ul className="list-disc list-inside mt-4 text-md">
                            <li>
                                <b>Kiwango cha Mkopo: </b>
                                <ul className='ml-20 '>
                                    <li>- 100,000 -&gt; 600,000 /=</li>
                                    <li>- 700,000 -&gt; 2,000,000 /=</li>
                                </ul>
                            </li>
                            <li>
                                <b>Muda wa chini wa marejesho: </b>
                                <ul className='ml-20 '>
                                    <li>- Miezi 4</li>
                                    <li>- Miezi 4</li>
                                </ul>
                            </li>
                            <li>
                                <b>Muda wa juu wa marejesho</b>
                                <ul className='ml-20 '>
                                    <li>- Mwaka 1</li>
                                    <li>- Mwaka 1</li>
                                </ul>
                            </li>
                            <li>
                                <b>Gharama(ada) ya Mkopo(%): </b>
                                <ul className='ml-20 '>
                                    <li>- 0%</li>
                                    <li>- 1%(Jumla)</li>
                                </ul>
                            </li>
                            <li>
                                <b>Riba(%): </b>
                                <ul className='ml-20 '>
                                    <li>- 2.5% kwa mwezi</li>
                                    <li>- 1% kwa mwezi</li>
                                </ul>
                            </li>
                            <li>
                                <b>Adhabu(%) x Deni lililobaki: </b>
                                <ul className='ml-20 '>
                                    <li>- 1% ya deni kwa mwezi</li>
                                    <li>- 1% ya deni kwa mwezi</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="border p-4 rounded-lg shadow-lg elevation-5 bg-white">
                        <h2 className="text-xl font-semibold">Mkopo wa Likizo / Sikukuu</h2>
                        <ul className="list-disc list-inside mt-4 text-md">
                            <li><b>Kiwango cha Mkopo: </b>100,000 -&gt; 500,000 /=</li>
                            <li><b>Muda wa chini wa marejesho: </b>Miezi 4</li>
                            <li><b>Muda wa juu wa marejesho</b>Miezi 4</li>
                            <li><b>Gharama(ada) ya Mkopo(%): </b>0%</li>
                            <li><b>Riba(%): </b>2.5% kwa mwezi</li>
                            <li><b>Adhabu(%) x Deni lililobaki: </b>1% ya deni kwa mwezi</li>
                        </ul>
                    </div>
                    <div className="border p-4 rounded-lg shadow-lg elevation-5 bg-white">
                        <h2 className="text-xl font-semibold">Mkopo wa Nipige Tafu</h2>
                        <ul className="list-disc list-inside mt-4 text-md">
                            <li><b>Kiwango cha Mkopo: </b>100,000 -&gt; 500,000 /=</li>
                            <li><b>Muda wa chini wa marejesho: </b>Mwezi 1</li>
                            <li><b>Muda wa juu wa marejesho</b>Mwezi 1</li>
                            <li><b>Gharama(ada) ya Mkopo(%): </b>0%</li>
                            <li><b>Riba(%): </b>10% kwa mwezi</li>
                            <li><b>Adhabu(%) x Deni lililobaki: </b>1% ya deni kwa mwezi</li>
                        </ul>
                    </div>
                    <div className="border p-4 rounded-lg shadow-lg elevation-5 bg-white">
                        <h2 className="text-xl font-semibold">Mkopo wa CNG</h2>
                        <ul className="list-disc list-inside mt-4 text-md">
                            <li><b>Kiwango cha Mkopo: </b>2,700,000 -&gt; 3,500,000 /=</li>
                            <li><b>Muda wa chini wa marejesho: </b>Mwaka 1</li>
                            <li><b>Muda wa juu wa marejesho</b>Miaka 2</li>
                            <li><b>Gharama(ada) ya Mkopo(%): </b>1% (Jumla)</li>
                            <li><b>Riba(%): </b>1% kwa mwezi</li>
                            <li><b>Adhabu(%) x Deni lililobaki: </b>1% ya deni kwa mwezi</li>
                        </ul>
                    </div>
                    <div className="border p-4 rounded-lg shadow-lg elevation-5 bg-white">
                        <h2 className="text-xl font-semibold">Mkopo wa Kujikimu (Kwa Mwajiriwa mpya / Mwanachama Mpya)</h2>
                        <ul className="list-disc list-inside mt-4 text-md">
                            <li><b>Kiwango cha Mkopo: </b>1,000,000 -&gt; 1,500,000 /=</li>
                            <li><b>Muda wa chini wa marejesho: </b>Miezi 4</li>
                            <li><b>Muda wa juu wa marejesho</b>Mwaka 1</li>
                            <li><b>Gharama(ada) ya Mkopo(%): </b>1% (Jumla)</li>
                            <li><b>Riba(%): </b>1.5% kwa mwezi</li>
                            <li><b>Adhabu(%) x Deni lililobaki: </b>1% ya deni kwa mwezi</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoanTerms